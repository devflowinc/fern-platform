import { DocsKVCache } from "@/server/DocsCache";
import { DocsLoader } from "@/server/DocsLoader";
import { Revalidator } from "@/server/revalidator";
import { getDocsDomainNode } from "@/server/xfernhost/node";
import { NodeCollector } from "@fern-api/fdr-sdk/navigation";
import type { FernDocs } from "@fern-fern/fern-docs-sdk";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const config = {
    maxDuration: 300,
};

const MAX_BATCH_SIZE = 100;
const DEFAULT_BATCH_SIZE = 10;

const handler: NextApiHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<FernDocs.RevalidateAllV4Response>,
): Promise<unknown> => {
    /**
     * Limit the number of paths to revalidate to max of 100.
     */
    let limit = req.query.limit == null ? DEFAULT_BATCH_SIZE : parseInt(req.query.limit as string, 10);
    if (isNaN(limit) || limit < 0) {
        // eslint-disable-next-line no-console
        console.error("Invalid limit:", req.query.limit);
        return res.status(400).json({ total: 0, results: [] });
    }
    limit = Math.min(limit, MAX_BATCH_SIZE);

    /**
     * Offset is the number of paths to skip before starting to revalidate.
     */
    const offset = req.query.offset == null ? 0 : parseInt(req.query.offset as string, 10);
    if (isNaN(offset) || offset < 0) {
        // eslint-disable-next-line no-console
        console.error("Invalid offset:", req.query.offset);
        return res.status(400).json({ total: 0, results: [] });
    }

    const xFernHost = getDocsDomainNode(req, true);

    // never proivde a token here because revalidation should only be done on public routes (for now)
    const loader = DocsLoader.for(xFernHost, undefined);
    const root = await loader.root();

    if (!root) {
        /**
         * If the error is UnauthorizedError, we don't need to revalidate, since all the routes require SSR.
         */
        return res.status(loader.error?.error === "UnauthorizedError" ? 200 : 404).json({ total: 0, results: [] });
    }

    const slugs = NodeCollector.collect(root).pageSlugs;
    const revalidate = new Revalidator(res, xFernHost);

    if (offset === 0) {
        const cache = DocsKVCache.getInstance(xFernHost);
        const previouslyVisitedSlugs = (await cache.getVisitedSlugs()).filter((slug) => !slugs.includes(slug));

        // Revalidate previously visited slugs
        await revalidate.batch(previouslyVisitedSlugs);
    }

    const total = slugs.length;
    const start = offset * limit;
    const batch = slugs.slice(start, start + limit);

    const results = await revalidate.batch(batch);

    return res.status(200).json({ total, results });
};

export default handler;
