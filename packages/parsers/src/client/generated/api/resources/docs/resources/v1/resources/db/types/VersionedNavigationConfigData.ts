/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../index";

export interface VersionedNavigationConfigData {
    version: FernRegistry.VersionId;
    urlSlug: string | undefined;
    availability: FernRegistry.Availability | undefined;
    config: FernRegistry.docs.v1.db.UnversionedNavigationConfig;
}