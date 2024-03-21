/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../..";
import express from "express";
export interface WriteServiceMethods {
    startDocsRegister(req: express.Request<never, FernRegistry.docs.v1.write.StartDocsRegisterResponse, FernRegistry.docs.v2.write.StartDocsRegisterRequestV2, never>, res: {
        send: (responseBody: FernRegistry.docs.v1.write.StartDocsRegisterResponse) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    startDocsPreviewRegister(req: express.Request<never, FernRegistry.docs.v2.write.StartDocsPreviewRegisterResponse, FernRegistry.docs.v2.write.StartDocsPreviewRegisterRequestV2, never>, res: {
        send: (responseBody: FernRegistry.docs.v2.write.StartDocsPreviewRegisterResponse) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    finishDocsRegister(req: express.Request<{
        docsRegistrationId: FernRegistry.docs.v1.write.DocsRegistrationId;
    }, never, FernRegistry.docs.v2.write.RegisterDocsRequest, never>, res: {
        send: () => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
}
export declare class WriteService {
    private readonly methods;
    private router;
    constructor(methods: WriteServiceMethods, middleware?: express.RequestHandler[]);
    addMiddleware(handler: express.RequestHandler): this;
    toRouter(): express.Router;
}