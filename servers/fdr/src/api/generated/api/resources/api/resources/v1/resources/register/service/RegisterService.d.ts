/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../..";
import express from "express";
export interface RegisterServiceMethods {
    registerApiDefinition(req: express.Request<never, FernRegistry.api.v1.register.RegisterApiDefinitionResponse, FernRegistry.api.v1.register.RegisterApiDefinitionRequest, never>, res: {
        send: (responseBody: FernRegistry.api.v1.register.RegisterApiDefinitionResponse) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
}
export declare class RegisterService {
    private readonly methods;
    private router;
    constructor(methods: RegisterServiceMethods, middleware?: express.RequestHandler[]);
    addMiddleware(handler: express.RequestHandler): this;
    toRouter(): express.Router;
}