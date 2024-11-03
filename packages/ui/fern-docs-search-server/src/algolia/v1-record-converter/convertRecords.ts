import { Algolia } from "@fern-api/fdr-sdk";
import { EndpointDefinition, TypeDefinition } from "@fern-api/fdr-sdk/api-definition";
import { generateEndpointContent, generatePageContent } from "./generateEndpointContent.js";

export function convertEndpointV4ToV3(
    endpoint: Algolia.AlgoliaRecord.EndpointV4,
    endpointDefinition: EndpointDefinition,
    types: Record<string, TypeDefinition>,
): Algolia.AlgoliaRecord.EndpointV3 {
    return {
        type: "endpoint-v3",
        method: endpoint.method,
        endpointPath: endpoint.endpointPath,
        isResponseStream: endpoint.isResponseStream,
        title: endpoint.title,
        content: generateEndpointContent(endpointDefinition, types),
        breadcrumbs: endpoint.breadcrumbs.map((breadcrumb) => breadcrumb.title),
        slug: endpoint.slug,
        version: endpoint.version,
        indexSegmentId: endpoint.indexSegmentId,
    };
}

export function convertPageV4ToV3(
    page: Algolia.AlgoliaRecord.PageV4,
    rawMarkdown: string,
): Algolia.AlgoliaRecord.PageV3 {
    return {
        type: "page-v3",
        title: page.title,
        content: generatePageContent(rawMarkdown),
        breadcrumbs: page.breadcrumbs.map((breadcrumb) => breadcrumb.title),
        slug: page.slug,
        version: page.version,
        indexSegmentId: page.indexSegmentId,
    };
}