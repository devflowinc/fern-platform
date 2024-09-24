/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../index";
export interface AlgoliaPageRecordV4 {
    title: string;
    description: string | undefined;
    breadcrumbs: FernRegistry.BreadcrumbsV2;
    slug: FernRegistry.navigation.Slug;
    version: FernRegistry.AlgoliaRecordVersionV3 | undefined;
    indexSegmentId: FernRegistry.IndexSegmentId;
}