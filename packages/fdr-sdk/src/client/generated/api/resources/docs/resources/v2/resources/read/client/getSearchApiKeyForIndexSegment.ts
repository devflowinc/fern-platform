/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../index";
import * as core from "../../../../../../../../core";

export type Error =
    | FernRegistry.docs.v2.read.getSearchApiKeyForIndexSegment.Error.IndexSegmentNotFoundError
    | FernRegistry.docs.v2.read.getSearchApiKeyForIndexSegment.Error._Unknown;

export declare namespace Error {
    interface IndexSegmentNotFoundError {
        error: "IndexSegmentNotFoundError";
    }

    interface _Unknown {
        error: void;
        content: core.Fetcher.Error;
    }

    interface _Visitor<_Result> {
        indexSegmentNotFoundError: () => _Result;
        _other: (value: core.Fetcher.Error) => _Result;
    }
}

export const Error = {
    indexSegmentNotFoundError:
        (): FernRegistry.docs.v2.read.getSearchApiKeyForIndexSegment.Error.IndexSegmentNotFoundError => {
            return {
                error: "IndexSegmentNotFoundError",
            };
        },

    _unknown: (
        fetcherError: core.Fetcher.Error
    ): FernRegistry.docs.v2.read.getSearchApiKeyForIndexSegment.Error._Unknown => {
        return {
            error: undefined,
            content: fetcherError,
        };
    },

    _visit: <_Result>(
        value: FernRegistry.docs.v2.read.getSearchApiKeyForIndexSegment.Error,
        visitor: FernRegistry.docs.v2.read.getSearchApiKeyForIndexSegment.Error._Visitor<_Result>
    ): _Result => {
        switch (value.error) {
            case "IndexSegmentNotFoundError":
                return visitor.indexSegmentNotFoundError();
            default:
                return visitor._other(value as any);
        }
    },
} as const;
