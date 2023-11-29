import { APIV1Read } from "@fern-api/fdr-sdk";
import { visitDiscriminatedUnion } from "@fern-ui/core-utils";

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

export function divideEndpointPathToParts(endpoint: APIV1Read.EndpointDefinition): EndpointPathPart[] {
    const parts: EndpointPathPart[] = [];
    endpoint.path.parts.forEach((part) => {
        if (part.type === "literal") {
            const subparts = part.value.split("/");
            subparts.forEach((subpart) => {
                if (subpart.length > 0) {
                    parts.push({ type: "literal", value: subpart });
                }
            });
        } else {
            if (part.value.length > 0) {
                parts.push({ type: "pathParameter", name: part.value });
            }
        }
    });
    return parts;
}

export function getEndpointEnvironmentUrl(endpoint: APIV1Read.EndpointDefinition): string | undefined {
    if (endpoint.defaultEnvironment != null) {
        const defaultEnvironment = endpoint.environments.find((env) => env.id === endpoint.defaultEnvironment);
        if (defaultEnvironment != null) {
            return defaultEnvironment.baseUrl;
        }
    }
    return endpoint.environments[0]?.baseUrl;
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
                })
            )
            .join("")
    );
}

export function getPathParameterAsString(pathParameterKey: APIV1Read.PathParameterKey): string {
    return `:${pathParameterKey}`;
}
