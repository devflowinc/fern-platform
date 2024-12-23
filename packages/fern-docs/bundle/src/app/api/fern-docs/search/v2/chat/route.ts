import { track } from "@/server/analytics/posthog";
import { safeVerifyFernJWTConfig } from "@/server/auth/FernJWT";
import { getOrgMetadataForDomain } from "@/server/auth/metadata-for-url";
import {
  anthropicApiKey,
  openaiApiKey,
  turbopufferApiKey,
} from "@/server/env-variables";
import { getDocsDomainEdge } from "@/server/xfernhost/edge";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import { getAuthEdgeConfig, getFeatureFlags } from "@fern-docs/edge-config";
import { createDefaultSystemPrompt } from "@fern-docs/search-server";
import {
  queryTurbopuffer,
  toDocuments,
} from "@fern-docs/search-server/turbopuffer";
import { COOKIE_FERN_TOKEN, withoutStaging } from "@fern-docs/utils";
import { embed, EmbeddingModel, streamText, tool } from "ai";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  const anthropic = createAnthropic({ apiKey: anthropicApiKey() });
  const languageModel = anthropic.languageModel("claude-3-5-sonnet-latest");

  const openai = createOpenAI({ apiKey: openaiApiKey() });
  const embeddingModel = openai.embedding("text-embedding-3-small");

  const domain = getDocsDomainEdge(req);
  const namespace = `${withoutStaging(domain)}_${embeddingModel.modelId}`;
  const { messages } = await req.json();

  const orgMetadata = await getOrgMetadataForDomain(withoutStaging(domain));
  if (orgMetadata == null) {
    return NextResponse.json("Not found", { status: 404 });
  }

  if (orgMetadata.isPreviewUrl) {
    return NextResponse.json({
      added: 0,
      updated: 0,
      deleted: 0,
      unindexable: 0,
    });
  }

  const start = Date.now();
  const [authEdgeConfig, featureFlags] = await Promise.all([
    getAuthEdgeConfig(domain),
    getFeatureFlags(domain),
  ]);

  if (!featureFlags.isAskAiEnabled) {
    throw new Error(`Ask AI is not enabled for ${domain}`);
  }

  const fern_token = cookies().get(COOKIE_FERN_TOKEN)?.value;
  const user = await safeVerifyFernJWTConfig(fern_token, authEdgeConfig);

  const lastUserMessage: string | undefined = messages.findLast(
    (message: any) => message.role === "user"
  )?.content;

  const searchResults = await runQueryTurbopuffer(lastUserMessage, {
    embeddingModel,
    namespace,
    authed: user != null,
    roles: user?.roles ?? [],
  });
  const documents = toDocuments(searchResults).join("\n\n");
  const system = createDefaultSystemPrompt({
    domain,
    date: new Date().toDateString(),
    documents,
  });

  const result = streamText({
    model: languageModel,
    system,
    messages,
    maxSteps: 10,
    maxRetries: 3,
    tools: {
      search: tool({
        description:
          "Search the knowledge base for the user's query. Semantic search is enabled.",
        parameters: z.object({
          query: z.string(),
        }),
        async execute({ query }) {
          const response = await runQueryTurbopuffer(query, {
            embeddingModel,
            namespace,
            authed: user != null,
            roles: user?.roles ?? [],
          });
          return response.map((hit) => {
            const { domain, pathname, hash } = hit.attributes;
            const url = `https://${domain}${pathname}${hash ?? ""}`;
            return { url, ...hit.attributes };
          });
        },
      }),
    },
    experimental_telemetry: {
      isEnabled: true,
      recordInputs: true,
      recordOutputs: true,
      functionId: "ask_ai_chat",
      metadata: {
        domain,
        languageModel: languageModel.modelId,
        embeddingModel: embeddingModel.modelId,
        db: "turbopuffer",
        namespace,
      },
    },
    onFinish: async (e) => {
      const end = Date.now();
      await track("ask_ai", {
        languageModel: languageModel.modelId,
        embeddingModel: embeddingModel.modelId,
        durationMs: end - start,
        domain,
        namespace,
        numToolCalls: e.toolCalls.length,
        finishReason: e.finishReason,
        ...e.usage,
      });
      e.warnings?.forEach((warning) => {
        console.warn(warning);
      });
    },
  });

  return result.toDataStreamResponse();
}

async function runQueryTurbopuffer(
  query: string | null | undefined,
  opts: {
    embeddingModel: EmbeddingModel<string>;
    namespace: string;
    topK?: number;
    authed?: boolean;
    roles?: string[];
  }
) {
  return query == null || query.trimStart().length === 0
    ? []
    : await queryTurbopuffer(query, {
        namespace: opts.namespace,
        apiKey: turbopufferApiKey(),
        topK: opts.topK ?? 20,
        vectorizer: async (text) => {
          const embedding = await embed({
            model: opts.embeddingModel,
            value: text,
          });
          return embedding.embedding;
        },
        authed: opts.authed,
        roles: opts.roles,
      });
}