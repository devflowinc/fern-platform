import { APIV1Read } from "@fern-api/fdr-sdk";
import { useApiPageCenterElement } from "../useApiPageCenterElement";
import { WebhookContextProvider } from "./webhook-context/WebhookContextProvider";
import { WebhookContent } from "./WebhookContent";

export declare namespace Webhook {
    export interface Props {
        webhook: APIV1Read.WebhookDefinition;
        isLastInApi: boolean;
        package: APIV1Read.ApiDefinitionPackage;
        fullSlug: string;
        anchorIdParts: string[];
    }
}

export const Webhook: React.FC<Webhook.Props> = ({
    webhook,
    fullSlug,
    package: package_,
    isLastInApi,
    anchorIdParts,
}) => {
    const { setTargetRef } = useApiPageCenterElement({ slug: fullSlug });
    const route = `/${fullSlug}`;

    return (
        <WebhookContextProvider>
            <WebhookContent
                webhook={webhook}
                setContainerRef={setTargetRef}
                package={package_}
                hideBottomSeparator={isLastInApi}
                anchorIdParts={anchorIdParts}
                route={route}
            />
        </WebhookContextProvider>
    );
};
