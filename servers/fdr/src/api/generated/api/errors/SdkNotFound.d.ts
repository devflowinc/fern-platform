/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as errors from "../../errors";
import express from "express";
export declare class SdkNotFound extends errors.FernRegistryError {
    private readonly body;
    constructor(body: string);
    send(res: express.Response): Promise<void>;
}
