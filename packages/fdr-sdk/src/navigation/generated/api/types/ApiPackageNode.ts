/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernNavigation from "../index";

export interface ApiPackageNode
    extends FernNavigation.WithNodeMetadata,
        FernNavigation.WithOverviewPage,
        FernNavigation.WithApiDefinitionId,
        FernNavigation.WithRedirect {
    type: "apiPackage";
    children: FernNavigation.ApiPackageChild[];
}