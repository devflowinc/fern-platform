/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../..";
export interface RegisterSnippetTemplateBatchRequest {
    orgId: FernRegistry.OrgId;
    apiId: FernRegistry.ApiId;
    apiDefinitionId: FernRegistry.ApiDefinitionId;
    snippets: FernRegistry.SnippetRegistryEntry[];
}