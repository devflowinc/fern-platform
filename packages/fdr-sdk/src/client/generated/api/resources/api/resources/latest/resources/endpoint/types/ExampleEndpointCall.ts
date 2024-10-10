/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../index";

export interface ExampleEndpointCall extends FernRegistry.api.latest.WithDescription {
    path: string;
    responseStatusCode: number;
    name: string | undefined;
    pathParameters: Record<FernRegistry.PropertyKey, unknown> | undefined;
    queryParameters: Record<FernRegistry.PropertyKey, unknown> | undefined;
    headers: Record<FernRegistry.PropertyKey, unknown> | undefined;
    requestBody: FernRegistry.api.latest.ExampleEndpointRequest | undefined;
    responseBody: FernRegistry.api.latest.ExampleEndpointResponse | undefined;
    snippets: Record<FernRegistry.api.latest.Language, FernRegistry.api.latest.CodeSnippet[]> | undefined;
}