/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernNavigation from "../index";

export interface EndpointNode extends FernNavigation.WithNodeMetadata, FernNavigation.WithApiDefinitionId {
    type: "endpoint";
    method: FernNavigation.HttpMethod;
    endpointId: FernNavigation.EndpointId;
    isResponseStream: boolean | undefined;
}