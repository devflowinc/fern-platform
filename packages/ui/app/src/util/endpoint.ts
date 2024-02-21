import { APIV1Read } from "@fern-api/fdr-sdk";
import { visitDiscriminatedUnion } from "@fern-ui/core-utils";
import { ResolvedEndpointDefinition, ResolvedEndpointPathParts } from "./resolver";

export type EndpointPathPart =
    | {
          type: "literal";
          value: string;
      }
    | {
          type: "pathParameter";
          name: string;
      };

export function getEndpointAvailabilityLabel(availability: APIV1Read.Availability): string {
    switch (availability) {
        case "Beta":
            return "Beta";
        case "Deprecated":
            return "Deprecated";
        case "GenerallyAvailable":
            return "GA";
        default:
            return "Unknown";
    }
}

export function divideEndpointPathToParts(path: ResolvedEndpointPathParts[]): EndpointPathPart[] {
    const parts: EndpointPathPart[] = [];
    path.forEach((part) => {
        if (part.type === "literal") {
            const subparts = part.value.split("/");
            subparts.forEach((subpart) => {
                if (subpart.length > 0) {
                    parts.push({ type: "literal", value: subpart });
                }
            });
        } else {
            if (part.key.length > 0) {
                parts.push({ type: "pathParameter", name: part.key });
            }
        }
    });
    return parts;
}

export function getEndpointEnvironmentUrl(endpoint: ResolvedEndpointDefinition): string | undefined {
    return endpoint.defaultEnvironment?.baseUrl ?? endpoint.environments[0]?.baseUrl;
}

export function getEndpointTitleAsString(endpoint: APIV1Read.EndpointDefinition): string {
    return endpoint.name ?? getEndpointPathAsString(endpoint);
}

export function getEndpointPathAsString(endpoint: APIV1Read.EndpointDefinition): string {
    return (
        endpoint.method +
        " " +
        endpoint.path.parts
            .map((part) =>
                visitDiscriminatedUnion(part, "type")._visit({
                    literal: (literal) => literal.value,
                    pathParameter: (pathParameter) => getPathParameterAsString(pathParameter.value),
                    _other: () => "",
                }),
            )
            .join("")
    );
}

export function getPathParameterAsString(pathParameterKey: APIV1Read.PathParameterKey): string {
    return `:${pathParameterKey}`;
}