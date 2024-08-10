import { visitDiscriminatedUnion } from "@fern-api/fdr-sdk";
import { EnvironmentId, NavigationNode, NodeId, PlaygroundSettings } from "@fern-api/fdr-sdk/navigation";
import { useIsPlaygroundOpen, useNavigationNodes, usePlaygroundNodeId } from "../atoms";

export function usePlaygroundSettings(currentNodeId?: NodeId): EnvironmentId[] | undefined {
    const playgroundNodeId = usePlaygroundNodeId();
    const playgroundOpen = useIsPlaygroundOpen();
    const navigationNodes = useNavigationNodes();

    const nodeIdToUse = playgroundOpen ? playgroundNodeId : currentNodeId;

    if (nodeIdToUse) {
        const maybeCurrentHasPlayground = nodeHasPlayground(navigationNodes.get(nodeIdToUse));

        if (maybeCurrentHasPlayground) {
            return maybeCurrentHasPlayground.environments;
        } else {
            for (const node of navigationNodes.getParents(nodeIdToUse).reverse()) {
                const maybeNodeHasPlayground = nodeHasPlayground(node);
                if (maybeNodeHasPlayground) {
                    return maybeNodeHasPlayground.environments;
                }
            }
        }
    }

    return;
}

function nodeHasPlayground(currentNode?: NavigationNode) {
    return (
        currentNode &&
        visitDiscriminatedUnion(currentNode)._visit<PlaygroundSettings | undefined>({
            root: () => undefined,
            versioned: () => undefined,
            tabbed: () => undefined,
            sidebarRoot: () => undefined,
            sidebarGroup: () => undefined,
            version: () => undefined,
            unversioned: () => undefined,
            tab: () => undefined,
            link: () => undefined,
            page: () => undefined,
            landingPage: () => undefined,
            section: () => undefined,
            apiReference: (node) => node.playground,
            changelog: () => undefined,
            changelogYear: () => undefined,
            changelogMonth: () => undefined,
            changelogEntry: () => undefined,
            endpoint: (node) => node.playground,
            endpointPair: () => undefined,
            webSocket: (node) => node.playground,
            webhook: () => undefined,
            apiPackage: (node) => node.playground,
        })
    );
}