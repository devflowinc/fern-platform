import { APIV1Read } from "@fern-api/fdr-sdk";
import { useMemo } from "react";
import { EndpointParameter } from "./EndpointParameter";
import { EndpointParametersSection } from "./EndpointParametersSection";

export declare namespace QueryParametersSection {
    export interface Props {
        queryParameters: APIV1Read.QueryParameter[];
        anchorIdParts: string[];
        route: string;
    }
}

export const QueryParametersSection: React.FC<QueryParametersSection.Props> = ({
    queryParameters,
    anchorIdParts,
    route,
}) => {
    const convertedParameters = useMemo((): EndpointParameter.Props[] => {
        return queryParameters.map(
            (queryParameter): EndpointParameter.Props => ({
                name: queryParameter.key,
                type: queryParameter.type,
                description: queryParameter.description ?? undefined,
                descriptionContainsMarkdown: queryParameter.descriptionContainsMarkdown ?? false,
                anchorIdParts: [...anchorIdParts, queryParameter.key],
                route,
            })
        );
    }, [queryParameters, anchorIdParts, route]);

    return (
        <EndpointParametersSection
            title="Query parameters"
            parameters={convertedParameters}
            anchorIdParts={anchorIdParts}
            route={route}
        />
    );
};
