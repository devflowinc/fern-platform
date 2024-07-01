/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as FernGeneratorCli from "../../../../api/index";
import * as core from "../../../../core";
import { MethodInvocationSnippet } from "./MethodInvocationSnippet";
import { ParameterReference } from "./ParameterReference";

export const EndpointReference: core.serialization.ObjectSchema<
    serializers.EndpointReference.Raw,
    FernGeneratorCli.EndpointReference
> = core.serialization.object({
    title: MethodInvocationSnippet,
    description: core.serialization.string().optional(),
    snippet: core.serialization.string(),
    parameters: core.serialization.list(ParameterReference),
});

export declare namespace EndpointReference {
    interface Raw {
        title: MethodInvocationSnippet.Raw;
        description?: string | null;
        snippet: string;
        parameters: ParameterReference.Raw[];
    }
}