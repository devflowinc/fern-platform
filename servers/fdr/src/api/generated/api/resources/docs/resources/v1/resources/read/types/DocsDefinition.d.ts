/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../..";
export interface DocsDefinition {
    algoliaSearchIndex?: FernRegistry.docs.v1.read.AlgoliaSearchIndex;
    pages: Record<FernRegistry.docs.v1.read.PageId, FernRegistry.docs.v1.read.PageContent>;
    apis: Record<FernRegistry.ApiDefinitionId, FernRegistry.api.v1.read.ApiDefinition>;
    files: Record<FernRegistry.docs.v1.read.FileId, FernRegistry.docs.v1.read.Url>;
    filesV2: Record<FernRegistry.docs.v1.read.FileId, FernRegistry.docs.v1.read.File_>;
    id?: FernRegistry.DocsConfigId;
    config: FernRegistry.docs.v1.read.DocsConfig;
    search: FernRegistry.docs.v1.read.SearchInfo;
}