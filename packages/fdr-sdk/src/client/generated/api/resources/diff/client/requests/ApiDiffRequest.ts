/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../..";

export interface ApiDiffRequest {
    /**
     * The id of the previous version of the api definition
     */
    previousApiDefinitionId: FernRegistry.ApiDefinitionId;
    /**
     * The id of the current version of the api definition
     */
    currentApiDefinitionId: FernRegistry.ApiDefinitionId;
}