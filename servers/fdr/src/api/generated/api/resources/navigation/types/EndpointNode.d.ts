/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../..";
export interface EndpointNode extends FernRegistry.navigation.WithNodeMetadata, FernRegistry.navigation.WithApiDefinitionId {
    type: "endpoint";
    method: FernRegistry.navigation.HttpMethod;
    endpointId: FernRegistry.navigation.EndpointId;
    isResponseStream?: boolean;
}