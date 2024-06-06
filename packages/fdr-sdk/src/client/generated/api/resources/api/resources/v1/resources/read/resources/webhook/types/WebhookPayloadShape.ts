/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../../../index";

export type WebhookPayloadShape =
    | FernRegistry.api.v1.read.WebhookPayloadShape.Object_
    | FernRegistry.api.v1.read.WebhookPayloadShape.Reference;

export declare namespace WebhookPayloadShape {
    interface Object_ extends FernRegistry.api.v1.read.ObjectType {
        type: "object";
    }

    interface Reference {
        type: "reference";
        value: FernRegistry.api.v1.read.TypeReference;
    }
}
