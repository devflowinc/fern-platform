/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../../..";

export interface FileUploadRequest
    extends FernRegistry.api.v1.read.WithDescription,
        FernRegistry.api.v1.read.WithAvailability {
    name: string;
    properties: FernRegistry.api.v1.read.FileUploadRequestProperty[];
}