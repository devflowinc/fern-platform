import type * as FernRegistryDocsRead from "@fern-api/fdr-sdk/dist/generated/api/resources/docs/resources/v1/resources/read";
import { type SerializedMdxContent } from "./mdx";

export declare namespace ResolvedPath {
    interface CustomMarkdownPage {
        type: "custom-markdown-page";
        fullSlug: string;
        page: FernRegistryDocsRead.PageMetadata;
        sectionTitle: string | null;
        serializedMdxContent: SerializedMdxContent;
    }

    interface ApiPage {
        type: "api-page";
        fullSlug: string;
        apiSection: FernRegistryDocsRead.ApiSection;
    }
}

export type ResolvedPath = ResolvedPath.CustomMarkdownPage | ResolvedPath.ApiPage;