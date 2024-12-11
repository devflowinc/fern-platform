/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../../../index";

export type HttpRequestBodyShape =
    | FernRegistry.api.v1.read.HttpRequestBodyShape.Object_
    | FernRegistry.api.v1.read.HttpRequestBodyShape.Reference
    | FernRegistry.api.v1.read.HttpRequestBodyShape.Bytes
    | FernRegistry.api.v1.read.HttpRequestBodyShape.FormData
    /**
     * `fileUpload` is optional only to be backwards compatible. It should be required. */
    | FernRegistry.api.v1.read.HttpRequestBodyShape.FileUpload;

export declare namespace HttpRequestBodyShape {
    interface Object_ extends FernRegistry.api.v1.read.ObjectType {
        type: "object";
    }

    interface Reference {
        type: "reference";
        value: FernRegistry.api.v1.read.TypeReference;
    }

    interface Bytes extends FernRegistry.api.v1.read.BytesRequest {
        type: "bytes";
    }

    interface FormData extends FernRegistry.api.v1.read.FormDataRequest {
        type: "formData";
    }

    interface FileUpload {
        type: "fileUpload";
        value: FernRegistry.api.v1.read.FormDataRequest | undefined;
    }
}