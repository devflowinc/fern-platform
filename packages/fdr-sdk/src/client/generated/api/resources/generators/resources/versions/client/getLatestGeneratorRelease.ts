/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../index";
import * as core from "../../../../../../core";

export type Error =
    | FernRegistry.generators.versions.getLatestGeneratorRelease.Error.NoValidGeneratorsFoundError
    | FernRegistry.generators.versions.getLatestGeneratorRelease.Error._Unknown;

export declare namespace Error {
    interface NoValidGeneratorsFoundError {
        error: "NoValidGeneratorsFoundError";
    }

    interface _Unknown {
        error: void;
        content: core.Fetcher.Error;
    }

    interface _Visitor<_Result> {
        noValidGeneratorsFoundError: () => _Result;
        _other: (value: core.Fetcher.Error) => _Result;
    }
}

export const Error = {
    noValidGeneratorsFoundError:
        (): FernRegistry.generators.versions.getLatestGeneratorRelease.Error.NoValidGeneratorsFoundError => {
            return {
                error: "NoValidGeneratorsFoundError",
            };
        },

    _unknown: (
        fetcherError: core.Fetcher.Error
    ): FernRegistry.generators.versions.getLatestGeneratorRelease.Error._Unknown => {
        return {
            error: undefined,
            content: fetcherError,
        };
    },

    _visit: <_Result>(
        value: FernRegistry.generators.versions.getLatestGeneratorRelease.Error,
        visitor: FernRegistry.generators.versions.getLatestGeneratorRelease.Error._Visitor<_Result>
    ): _Result => {
        switch (value.error) {
            case "NoValidGeneratorsFoundError":
                return visitor.noValidGeneratorsFoundError();
            default:
                return visitor._other(value as any);
        }
    },
} as const;