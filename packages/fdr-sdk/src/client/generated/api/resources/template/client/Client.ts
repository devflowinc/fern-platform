/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../environments";
import * as core from "../../../../core";
import * as FernRegistry from "../../..";
import urlJoin from "url-join";

export declare namespace Template {
    interface Options {
        environment?: core.Supplier<environments.FernRegistryEnvironment | string>;
        token?: core.Supplier<core.BearerToken | undefined>;
    }

    interface RequestOptions {
        timeoutInSeconds?: number;
        maxRetries?: number;
    }
}

export class Template {
    constructor(protected readonly _options: Template.Options = {}) {}

    /**
     * Store endpoint snippet for a particular SDK.
     */
    public async register(
        request: FernRegistry.RegisterSnippetTemplateRequest,
        requestOptions?: Template.RequestOptions
    ): Promise<core.APIResponse<void, FernRegistry.template.register.Error>> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.FernRegistryEnvironment.Dev,
                "/snippet-template/register"
            ),
            method: "POST",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            body: request,
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : undefined,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return {
                ok: true,
                body: undefined,
            };
        }

        return {
            ok: false,
            error: FernRegistry.template.register.Error._unknown(_response.error),
        };
    }

    /**
     * Store endpoint snippets for a particular SDK.
     */
    public async registerBatch(
        request: FernRegistry.RegisterSnippetTemplateBatchRequest,
        requestOptions?: Template.RequestOptions
    ): Promise<core.APIResponse<void, FernRegistry.template.registerBatch.Error>> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.FernRegistryEnvironment.Dev,
                "/snippet-template/register/batch"
            ),
            method: "POST",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            body: request,
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : undefined,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return {
                ok: true,
                body: undefined,
            };
        }

        return {
            ok: false,
            error: FernRegistry.template.registerBatch.Error._unknown(_response.error),
        };
    }

    /**
     * Get the endpoint's snippet template for a particular SDK.
     */
    public async get(
        request: FernRegistry.GetSnippetTemplate,
        requestOptions?: Template.RequestOptions
    ): Promise<core.APIResponse<FernRegistry.EndpointSnippetTemplate, FernRegistry.template.get.Error>> {
        const _response = await core.fetcher({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.FernRegistryEnvironment.Dev,
                "/snippet-template/get"
            ),
            method: "POST",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            body: request,
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : undefined,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return {
                ok: true,
                body: _response.body as FernRegistry.EndpointSnippetTemplate,
            };
        }

        if (_response.error.reason === "status-code") {
            switch ((_response.error.body as FernRegistry.template.get.Error)?.error) {
                case "UnauthorizedError":
                case "SnippetNotFound":
                    return {
                        ok: false,
                        error: _response.error.body as FernRegistry.template.get.Error,
                    };
            }
        }

        return {
            ok: false,
            error: FernRegistry.template.get.Error._unknown(_response.error),
        };
    }

    protected async _getAuthorizationHeader() {
        const bearer = await core.Supplier.get(this._options.token);
        if (bearer != null) {
            return `Bearer ${bearer}`;
        }

        return undefined;
    }
}
