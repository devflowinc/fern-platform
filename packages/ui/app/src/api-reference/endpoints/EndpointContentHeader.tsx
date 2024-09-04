import { memo } from "react";
import { useSelectedEnvironmentId } from "../../atoms/environment";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { ResolvedEndpointDefinition, resolveEnvironment } from "../../resolver/types";
import { EndpointAvailabilityTag } from "./EndpointAvailabilityTag";
import { EndpointStreamingEnabledToggle } from "./EndpointStreamingEnabledToggle";
import { EndpointUrlWithOverflow } from "./EndpointUrlWithOverflow";

interface EndpointContentHeaderProps {
    endpoint: ResolvedEndpointDefinition;
    breadcrumbs: readonly string[];
    container: React.MutableRefObject<HTMLElement | null>;
}

export const EndpointContentHeader = memo<EndpointContentHeaderProps>(({ endpoint, breadcrumbs, container }) => {
    const selectedEnvironmentId = useSelectedEnvironmentId();
    return (
        <header className="space-y-1 pb-2 pt-8">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <div className="flex items-center justify-between">
                <span>
                    <h1 className="fern-page-heading">
                        {/* <AnimatedTitle>{endpoint.title}</AnimatedTitle> */}
                        {endpoint.title}
                    </h1>
                    {endpoint.availability != null && (
                        <span className="inline-block ml-2 align-text-bottom">
                            <EndpointAvailabilityTag availability={endpoint.availability} minimal={true} />
                        </span>
                    )}
                </span>

                {endpoint.stream != null && (
                    <EndpointStreamingEnabledToggle endpoint={endpoint} container={container} />
                )}
            </div>
            <EndpointUrlWithOverflow
                path={endpoint.path}
                method={endpoint.method}
                selectedEnvironment={resolveEnvironment(endpoint, selectedEnvironmentId)}
                showEnvironment
                large
            />
        </header>
    );
});

EndpointContentHeader.displayName = "EndpointContentHeader";