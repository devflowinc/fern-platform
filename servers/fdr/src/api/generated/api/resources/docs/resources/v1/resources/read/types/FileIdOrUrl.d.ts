/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../..";
export declare type FileIdOrUrl = FernRegistry.docs.v1.read.FileIdOrUrl.FileId | FernRegistry.docs.v1.read.FileIdOrUrl.Url;
export declare namespace FileIdOrUrl {
    interface FileId {
        type: "fileId";
        value: FernRegistry.docs.v1.read.FileId;
    }
    interface Url {
        type: "url";
        value: FernRegistry.docs.v1.read.Url;
    }
}