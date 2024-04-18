/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "..";
import * as core from "../../core";

export type Error =
    | FernRegistry.get.Error.UnauthorizedError
    | FernRegistry.get.Error.UserNotInOrgError
    | FernRegistry.get.Error.UnavailableError
    | FernRegistry.get.Error.ApiIdRequiredError
    | FernRegistry.get.Error.OrgIdRequiredError
    | FernRegistry.get.Error.OrgIdAndApiIdNotFound
    | FernRegistry.get.Error.OrgIdNotFound
    | FernRegistry.get.Error.EndpointNotFound
    | FernRegistry.get.Error.SdkNotFound
    | FernRegistry.get.Error._Unknown;

export declare namespace Error {
    interface UnauthorizedError {
        error: "UnauthorizedError";
        content: string;
    }

    interface UserNotInOrgError {
        error: "UserNotInOrgError";
    }

    interface UnavailableError {
        error: "UnavailableError";
        content: string;
    }

    interface ApiIdRequiredError {
        error: "ApiIdRequiredError";
        content: string;
    }

    interface OrgIdRequiredError {
        error: "OrgIdRequiredError";
        content: string;
    }

    interface OrgIdAndApiIdNotFound {
        error: "OrgIdAndApiIdNotFound";
        content: string;
    }

    interface OrgIdNotFound {
        error: "OrgIdNotFound";
        content: string;
    }

    interface EndpointNotFound {
        error: "EndpointNotFound";
        content: string;
    }

    interface SdkNotFound {
        error: "SDKNotFound";
        content: string;
    }

    interface _Unknown {
        error: void;
        content: core.Fetcher.Error;
    }

    interface _Visitor<_Result> {
        unauthorizedError: (value: string) => _Result;
        userNotInOrgError: () => _Result;
        unavailableError: (value: string) => _Result;
        apiIdRequiredError: (value: string) => _Result;
        orgIdRequiredError: (value: string) => _Result;
        orgIdAndApiIdNotFound: (value: string) => _Result;
        orgIdNotFound: (value: string) => _Result;
        endpointNotFound: (value: string) => _Result;
        sdkNotFound: (value: string) => _Result;
        _other: (value: core.Fetcher.Error) => _Result;
    }
}

export const Error = {
    unauthorizedError: (value: string): FernRegistry.get.Error.UnauthorizedError => {
        return {
            content: value,
            error: "UnauthorizedError",
        };
    },

    userNotInOrgError: (): FernRegistry.get.Error.UserNotInOrgError => {
        return {
            error: "UserNotInOrgError",
        };
    },

    unavailableError: (value: string): FernRegistry.get.Error.UnavailableError => {
        return {
            content: value,
            error: "UnavailableError",
        };
    },

    apiIdRequiredError: (value: string): FernRegistry.get.Error.ApiIdRequiredError => {
        return {
            content: value,
            error: "ApiIdRequiredError",
        };
    },

    orgIdRequiredError: (value: string): FernRegistry.get.Error.OrgIdRequiredError => {
        return {
            content: value,
            error: "OrgIdRequiredError",
        };
    },

    orgIdAndApiIdNotFound: (value: string): FernRegistry.get.Error.OrgIdAndApiIdNotFound => {
        return {
            content: value,
            error: "OrgIdAndApiIdNotFound",
        };
    },

    orgIdNotFound: (value: string): FernRegistry.get.Error.OrgIdNotFound => {
        return {
            content: value,
            error: "OrgIdNotFound",
        };
    },

    endpointNotFound: (value: string): FernRegistry.get.Error.EndpointNotFound => {
        return {
            content: value,
            error: "EndpointNotFound",
        };
    },

    sdkNotFound: (value: string): FernRegistry.get.Error.SdkNotFound => {
        return {
            content: value,
            error: "SDKNotFound",
        };
    },

    _unknown: (fetcherError: core.Fetcher.Error): FernRegistry.get.Error._Unknown => {
        return {
            error: undefined,
            content: fetcherError,
        };
    },

    _visit: <_Result>(value: FernRegistry.get.Error, visitor: FernRegistry.get.Error._Visitor<_Result>): _Result => {
        switch (value.error) {
            case "UnauthorizedError":
                return visitor.unauthorizedError(value.content);
            case "UserNotInOrgError":
                return visitor.userNotInOrgError();
            case "UnavailableError":
                return visitor.unavailableError(value.content);
            case "ApiIdRequiredError":
                return visitor.apiIdRequiredError(value.content);
            case "OrgIdRequiredError":
                return visitor.orgIdRequiredError(value.content);
            case "OrgIdAndApiIdNotFound":
                return visitor.orgIdAndApiIdNotFound(value.content);
            case "OrgIdNotFound":
                return visitor.orgIdNotFound(value.content);
            case "EndpointNotFound":
                return visitor.endpointNotFound(value.content);
            case "SDKNotFound":
                return visitor.sdkNotFound(value.content);
            default:
                return visitor._other(value as any);
        }
    },
} as const;