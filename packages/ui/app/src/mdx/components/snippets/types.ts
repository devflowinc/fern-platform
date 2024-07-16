import { APIV1Read } from "@fern-api/fdr-sdk";

export declare namespace RequestSnippet {
    export interface Props {
        endpoint: string;
        example?: string;
    }
    export interface InternalProps {
        path: string;
        method: APIV1Read.HttpMethod;
        example: string | undefined;
    }
}