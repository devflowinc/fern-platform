/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../..";
import * as core from "../../../../core";

export type Error =
    | FernRegistry.snippets.load.Error.UnauthorizedError
    | FernRegistry.snippets.load.Error.UserNotInOrgError
    | FernRegistry.snippets.load.Error.UnavailableError
    | FernRegistry.snippets.load.Error.InvalidPageError
    | FernRegistry.snippets.load.Error.ApiIdRequiredError
    | FernRegistry.snippets.load.Error.OrgIdRequiredError
    | FernRegistry.snippets.load.Error.OrgIdAndApiIdNotFound
    | FernRegistry.snippets.load.Error.OrgIdNotFound
    | FernRegistry.snippets.load.Error.SdkNotFound
    | FernRegistry.snippets.load.Error._Unknown;

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

    interface InvalidPageError {
        error: "InvalidPageError";
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
        invalidPageError: (value: string) => _Result;
        apiIdRequiredError: (value: string) => _Result;
        orgIdRequiredError: (value: string) => _Result;
        orgIdAndApiIdNotFound: (value: string) => _Result;
        orgIdNotFound: (value: string) => _Result;
        sdkNotFound: (value: string) => _Result;
        _other: (value: core.Fetcher.Error) => _Result;
    }
}

export const Error = {
    unauthorizedError: (value: string): FernRegistry.snippets.load.Error.UnauthorizedError => {
        return {
            content: value,
            error: "UnauthorizedError",
        };
    },

    userNotInOrgError: (): FernRegistry.snippets.load.Error.UserNotInOrgError => {
        return {
            error: "UserNotInOrgError",
        };
    },

    unavailableError: (value: string): FernRegistry.snippets.load.Error.UnavailableError => {
        return {
            content: value,
            error: "UnavailableError",
        };
    },

    invalidPageError: (value: string): FernRegistry.snippets.load.Error.InvalidPageError => {
        return {
            content: value,
            error: "InvalidPageError",
        };
    },

    apiIdRequiredError: (value: string): FernRegistry.snippets.load.Error.ApiIdRequiredError => {
        return {
            content: value,
            error: "ApiIdRequiredError",
        };
    },

    orgIdRequiredError: (value: string): FernRegistry.snippets.load.Error.OrgIdRequiredError => {
        return {
            content: value,
            error: "OrgIdRequiredError",
        };
    },

    orgIdAndApiIdNotFound: (value: string): FernRegistry.snippets.load.Error.OrgIdAndApiIdNotFound => {
        return {
            content: value,
            error: "OrgIdAndApiIdNotFound",
        };
    },

    orgIdNotFound: (value: string): FernRegistry.snippets.load.Error.OrgIdNotFound => {
        return {
            content: value,
            error: "OrgIdNotFound",
        };
    },

    sdkNotFound: (value: string): FernRegistry.snippets.load.Error.SdkNotFound => {
        return {
            content: value,
            error: "SDKNotFound",
        };
    },

    _unknown: (fetcherError: core.Fetcher.Error): FernRegistry.snippets.load.Error._Unknown => {
        return {
            error: undefined,
            content: fetcherError,
        };
    },

    _visit: <_Result>(
        value: FernRegistry.snippets.load.Error,
        visitor: FernRegistry.snippets.load.Error._Visitor<_Result>
    ): _Result => {
        switch (value.error) {
            case "UnauthorizedError":
                return visitor.unauthorizedError(value.content);
            case "UserNotInOrgError":
                return visitor.userNotInOrgError();
            case "UnavailableError":
                return visitor.unavailableError(value.content);
            case "InvalidPageError":
                return visitor.invalidPageError(value.content);
            case "ApiIdRequiredError":
                return visitor.apiIdRequiredError(value.content);
            case "OrgIdRequiredError":
                return visitor.orgIdRequiredError(value.content);
            case "OrgIdAndApiIdNotFound":
                return visitor.orgIdAndApiIdNotFound(value.content);
            case "OrgIdNotFound":
                return visitor.orgIdNotFound(value.content);
            case "SDKNotFound":
                return visitor.sdkNotFound(value.content);
            default:
                return visitor._other(value as any);
        }
    },
} as const;