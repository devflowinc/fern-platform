/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../../..";

export interface UndiscriminatedUnionVariant
    extends FernRegistry.api.v1.read.WithDescription,
        FernRegistry.api.v1.read.WithAvailability {
    displayName?: string;
    type: FernRegistry.api.v1.read.TypeReference;
}