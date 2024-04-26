/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../..";
import * as core from "../../../../core";

export type Error =
    | FernRegistry.template.get.Error.UnauthorizedError
    | FernRegistry.template.get.Error.SnippetNotFound
    | FernRegistry.template.get.Error._Unknown;

export declare namespace Error {
    interface UnauthorizedError {
        error: "UnauthorizedError";
        content: string;
    }

    interface SnippetNotFound {
        error: "SnippetNotFound";
        content: string;
    }

    interface _Unknown {
        error: void;
        content: core.Fetcher.Error;
    }

    interface _Visitor<_Result> {
        unauthorizedError: (value: string) => _Result;
        snippetNotFound: (value: string) => _Result;
        _other: (value: core.Fetcher.Error) => _Result;
    }
}

export const Error = {
    unauthorizedError: (value: string): FernRegistry.template.get.Error.UnauthorizedError => {
        return {
            content: value,
            error: "UnauthorizedError",
        };
    },

    snippetNotFound: (value: string): FernRegistry.template.get.Error.SnippetNotFound => {
        return {
            content: value,
            error: "SnippetNotFound",
        };
    },

    _unknown: (fetcherError: core.Fetcher.Error): FernRegistry.template.get.Error._Unknown => {
        return {
            error: undefined,
            content: fetcherError,
        };
    },

    _visit: <_Result>(
        value: FernRegistry.template.get.Error,
        visitor: FernRegistry.template.get.Error._Visitor<_Result>
    ): _Result => {
        switch (value.error) {
            case "UnauthorizedError":
                return visitor.unauthorizedError(value.content);
            case "SnippetNotFound":
                return visitor.snippetNotFound(value.content);
            default:
                return visitor._other(value as any);
        }
    },
} as const;