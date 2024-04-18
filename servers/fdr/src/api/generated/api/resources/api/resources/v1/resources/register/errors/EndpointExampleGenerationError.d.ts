/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as errors from "../../../../../../../../errors";
import * as FernRegistry from "../../../../../../..";
import express from "express";
export declare class EndpointExampleGenerationError extends errors.FernRegistryError {
    private readonly body;
    constructor(body: FernRegistry.api.v1.register.EndpointExampleGenerationErrorBody);
    send(res: express.Response): Promise<void>;
}