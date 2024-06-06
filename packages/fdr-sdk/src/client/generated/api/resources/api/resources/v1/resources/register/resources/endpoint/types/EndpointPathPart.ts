/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../../../index";

export type EndpointPathPart =
    | FernRegistry.api.v1.register.EndpointPathPart.Literal
    | FernRegistry.api.v1.register.EndpointPathPart.PathParameter;

export declare namespace EndpointPathPart {
    interface Literal {
        type: "literal";
        value: string;
    }

    interface PathParameter {
        type: "pathParameter";
        value: FernRegistry.api.v1.register.PathParameterKey;
    }
}
