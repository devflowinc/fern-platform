/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernProxy from "../index";

export type RequestSerializableBody =
    | FernProxy.RequestSerializableBody.Json
    | FernProxy.RequestSerializableBody.FormData
    | FernProxy.RequestSerializableBody.OctetStream;

export declare namespace RequestSerializableBody {
    interface Json {
        type: "json";
        value?: unknown;
    }

    interface FormData {
        type: "form-data";
        value: Record<string, FernProxy.SerializableFormDataEntryValue>;
    }

    interface OctetStream extends FernProxy.SerializableFile {
        type: "octet-stream";
    }
}