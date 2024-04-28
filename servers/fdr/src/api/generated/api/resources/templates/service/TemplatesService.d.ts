/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../..";
import express from "express";
export interface TemplatesServiceMethods {
    register(req: express.Request<never, never, FernRegistry.RegisterSnippetTemplateRequest, never>, res: {
        send: () => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    registerBatch(req: express.Request<never, never, FernRegistry.RegisterSnippetTemplateBatchRequest, never>, res: {
        send: () => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    get(req: express.Request<never, FernRegistry.EndpointSnippetTemplate, FernRegistry.GetSnippetTemplate, never>, res: {
        send: (responseBody: FernRegistry.EndpointSnippetTemplate) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
}
export declare class TemplatesService {
    private readonly methods;
    private router;
    constructor(methods: TemplatesServiceMethods, middleware?: express.RequestHandler[]);
    addMiddleware(handler: express.RequestHandler): this;
    toRouter(): express.Router;
}