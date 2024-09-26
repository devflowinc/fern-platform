/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../index";
export interface DbApiDefinitionPackage {
    endpoints: FernRegistry.api.v1.db.DbEndpointDefinition[];
    websockets: FernRegistry.api.v1.read.WebSocketChannel[] | undefined;
    webhooks: FernRegistry.api.v1.read.WebhookDefinition[] | undefined;
    types: FernRegistry.TypeId[];
    subpackages: FernRegistry.api.v1.SubpackageId[];
    /**
     * if present, this package should be replaced with the provided subpackage
     * in the docs navigation.
     */
    pointsTo: FernRegistry.api.v1.SubpackageId | undefined;
}
