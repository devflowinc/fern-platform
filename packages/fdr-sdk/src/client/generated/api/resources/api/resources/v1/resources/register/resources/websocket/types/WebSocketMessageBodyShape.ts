/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../../..";

export type WebSocketMessageBodyShape =
    | FernRegistry.api.v1.register.WebSocketMessageBodyShape.Object_
    | FernRegistry.api.v1.register.WebSocketMessageBodyShape.Reference;

export declare namespace WebSocketMessageBodyShape {
    interface Object_ extends FernRegistry.api.v1.register.ObjectType {
        type: "object";
    }

    interface Reference {
        type: "reference";
        value: FernRegistry.api.v1.register.TypeReference;
    }
}
