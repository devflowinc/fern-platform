/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../..";

export interface ApiSection {
    title: string;
    icon?: string;
    hidden?: boolean;
    api: FernRegistry.ApiDefinitionId;
    urlSlug: string;
    skipUrlSlug: boolean;
    artifacts?: FernRegistry.docs.v1.read.ApiArtifacts;
    showErrors: boolean;
    changelog?: FernRegistry.docs.v1.read.ChangelogSection;
    fullSlug?: string[];
    navigation?: FernRegistry.docs.v1.read.ApiNavigationConfigRoot;
}
