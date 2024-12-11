/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../index";

export interface DocsDefinitionDbV1 {
    pages: Record<FernRegistry.PageId, FernRegistry.docs.v1.read.PageContent>;
    referencedApis: FernRegistry.ApiDefinitionId[];
    files: Record<FernRegistry.FileId, FernRegistry.docs.v1.db.DbFileInfo>;
    config: FernRegistry.docs.v1.db.DocsDbConfig;
    colors: FernRegistry.docs.v1.commons.ColorsConfig | undefined;
}