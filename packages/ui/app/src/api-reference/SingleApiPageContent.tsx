import * as FernNavigation from "@fern-api/fdr-sdk/navigation";
import { visitDiscriminatedUnion } from "@fern-ui/core-utils";
import dynamic from "next/dynamic";
import { ReactElement, useMemo } from "react";
import { useNavigationNodes } from "../atoms";
import { FernErrorBoundary } from "../components/FernErrorBoundary";
import type { ResolvedApiEndpoint, ResolvedTypeDefinition } from "../resolver/types";

const Endpoint = dynamic(() => import("./endpoints/Endpoint").then(({ Endpoint }) => Endpoint), { ssr: true });
const Webhook = dynamic(() => import("./webhooks/Webhook").then(({ Webhook }) => Webhook), { ssr: true });
const WebSocket = dynamic(() => import("./web-socket/WebSocket").then(({ WebSocket }) => WebSocket), { ssr: true });

interface SingleApiPageContentProps {
    item: ResolvedApiEndpoint;
    types: Record<string, ResolvedTypeDefinition>;
    showErrors: boolean;
}

export function SingleApiPageContent({ item, showErrors, types }: SingleApiPageContentProps): ReactElement | null {
    const navigationNodes = useNavigationNodes();
    const breadcrumbs = useMemo(() => {
        const parents = navigationNodes.getParents(item.nodeId);
        return FernNavigation.utils.createBreadcrumb(parents);
    }, [item.nodeId, navigationNodes]);

    return (
        <FernErrorBoundary component="ApiPackageContents">
            {visitDiscriminatedUnion(item)._visit({
                endpoint: (endpoint) => (
                    <Endpoint
                        api={item.apiDefinitionId}
                        showErrors={showErrors}
                        endpoint={endpoint}
                        breadcrumbs={breadcrumbs}
                        isLastInApi={true}
                        types={types}
                    />
                ),
                webhook: (webhook) => (
                    <Webhook webhook={webhook} breadcrumbs={breadcrumbs} isLastInApi={true} types={types} />
                ),
                websocket: (websocket) => (
                    <WebSocket api={item.apiDefinitionId} websocket={websocket} isLastInApi={true} types={types} />
                ),
            })}
        </FernErrorBoundary>
    );
}