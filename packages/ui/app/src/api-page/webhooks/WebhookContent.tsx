import { ResolvedWebhookDefinition } from "@fern-ui/app-utils";
import classNames from "classnames";
import React, { useCallback } from "react";
import { ApiPageDescription } from "../ApiPageDescription";
import { EndpointParameter } from "../endpoints/EndpointParameter";
import { EndpointSection } from "../endpoints/EndpointSection";
import { JsonPropertyPath } from "../examples/json-example/contexts/JsonPropertyPath";
import { TypeComponentSeparator } from "../types/TypeComponentSeparator";
import { useWebhookContext } from "./webhook-context/useWebhookContext";
import { WebhookExample } from "./webhook-examples/WebhookExample";
import { WebhookPayloadSection } from "./WebhookPayloadSection";
import { WebhookResponseSection } from "./WebhookResponseSection";

export declare namespace WebhookContent {
    export interface Props {
        webhook: ResolvedWebhookDefinition;
        subpackageTitle: string | undefined;
        hideBottomSeparator?: boolean;
        setContainerRef: (ref: HTMLElement | null) => void;
        route: string;
    }
}

export const WebhookContent = React.memo<WebhookContent.Props>(function WebhookContent({
    webhook,
    subpackageTitle,
    hideBottomSeparator = false,
    setContainerRef,
    route,
}) {
    const { setHoveredPayloadPropertyPath } = useWebhookContext();
    const onHoverPayloadProperty = useCallback(
        (jsonPropertyPath: JsonPropertyPath, { isHovering }: { isHovering: boolean }) => {
            setHoveredPayloadPropertyPath(isHovering ? jsonPropertyPath : undefined);
        },
        [setHoveredPayloadPropertyPath],
    );

    const example = webhook.examples[0]; // TODO: Need a way to show all the examples

    const webhookExample = example ? <WebhookExample example={example} /> : null;

    return (
        <div className={"scroll-mt-header-height-padded mx-4 md:mx-6 lg:mx-8"}>
            <div
                className={classNames(
                    "scroll-mt-header-height max-w-content-width lg:max-w-endpoint-width mx-auto lg:grid lg:grid-cols-2 lg:gap-12",
                    {
                        "border-default border-b mb-px pb-20": !hideBottomSeparator,
                    },
                )}
                ref={setContainerRef}
                data-route={route.toLowerCase()}
            >
                <div className="max-w-content-width flex min-w-0 flex-1 flex-col">
                    <div className="space-y-2.5 py-8">
                        {subpackageTitle != null && (
                            <div className="t-accent text-xs font-semibold uppercase tracking-wider">
                                {subpackageTitle}
                            </div>
                        )}
                        <h1 className="my-0 inline-block">{webhook.name}</h1>
                    </div>
                    <ApiPageDescription
                        className="text-base leading-6"
                        description={webhook.description}
                        isMarkdown={true}
                    />
                    {webhook.headers.length > 0 && (
                        <div className="mt-8 flex">
                            <div className="flex max-w-full flex-1 flex-col gap-12">
                                <EndpointSection title="Headers" anchorIdParts={["payload", "header"]} route={route}>
                                    <div className="flex flex-col">
                                        {webhook.headers.map((parameter) => (
                                            <div className="flex flex-col" key={parameter.key}>
                                                <TypeComponentSeparator />
                                                <EndpointParameter
                                                    name={parameter.key}
                                                    shape={parameter.shape}
                                                    anchorIdParts={["payload", "header", parameter.key]}
                                                    route={route}
                                                    description={parameter.description}
                                                    descriptionContainsMarkdown={
                                                        parameter.descriptionContainsMarkdown ?? false
                                                    }
                                                    availability={parameter.availability}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </EndpointSection>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 flex">
                        <div className="flex max-w-full flex-1 flex-col gap-12">
                            <EndpointSection title="Payload" anchorIdParts={["payload"]} route={route}>
                                <WebhookPayloadSection
                                    payload={webhook.payload}
                                    onHoverProperty={onHoverPayloadProperty}
                                    anchorIdParts={["payload", "body"]}
                                    route={route}
                                />
                            </EndpointSection>
                        </div>
                    </div>

                    <div className="mt-8 flex">
                        <div className="flex max-w-full flex-1 flex-col gap-12">
                            <EndpointSection title="Response" anchorIdParts={["response"]} route={route}>
                                <WebhookResponseSection />
                            </EndpointSection>
                        </div>
                    </div>
                </div>
                <div
                    className={classNames(
                        "max-w-content-width",
                        "flex-1 sticky self-start top-header-height",
                        // the py-10 is the same as the 40px below
                        "pb-10 pt-8",
                        // the 4rem is the same as the h-10 as the Header
                        "max-h-vh-minus-header",
                        // hide on mobile,
                        "hidden lg:flex",
                    )}
                >
                    {webhookExample}
                </div>

                <div className="mt-10 flex max-h-[150vh] lg:mt-0 lg:hidden">{webhookExample}</div>
            </div>
        </div>
    );
});
