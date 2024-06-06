/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../index";
import * as core from "../../../../../../../../core";

export type Error =
    | FernRegistry.api.v1.register.registerApiDefinition.Error.UnauthorizedError
    | FernRegistry.api.v1.register.registerApiDefinition.Error.UserNotInOrgError
    | FernRegistry.api.v1.register.registerApiDefinition.Error._Unknown;

export declare namespace Error {
    interface UnauthorizedError {
        error: "UnauthorizedError";
        content: string;
    }

    interface UserNotInOrgError {
        error: "UserNotInOrgError";
    }

    interface _Unknown {
        error: void;
        content: core.Fetcher.Error;
    }

    interface _Visitor<_Result> {
        unauthorizedError: (value: string) => _Result;
        userNotInOrgError: () => _Result;
        _other: (value: core.Fetcher.Error) => _Result;
    }
}

export const Error = {
    unauthorizedError: (value: string): FernRegistry.api.v1.register.registerApiDefinition.Error.UnauthorizedError => {
        return {
            content: value,
            error: "UnauthorizedError",
        };
    },

    userNotInOrgError: (): FernRegistry.api.v1.register.registerApiDefinition.Error.UserNotInOrgError => {
        return {
            error: "UserNotInOrgError",
        };
    },

    _unknown: (fetcherError: core.Fetcher.Error): FernRegistry.api.v1.register.registerApiDefinition.Error._Unknown => {
        return {
            error: undefined,
            content: fetcherError,
        };
    },

    _visit: <_Result>(
        value: FernRegistry.api.v1.register.registerApiDefinition.Error,
        visitor: FernRegistry.api.v1.register.registerApiDefinition.Error._Visitor<_Result>
    ): _Result => {
        switch (value.error) {
            case "UnauthorizedError":
                return visitor.unauthorizedError(value.content);
            case "UserNotInOrgError":
                return visitor.userNotInOrgError();
            default:
                return visitor._other(value as any);
        }
    },
} as const;
