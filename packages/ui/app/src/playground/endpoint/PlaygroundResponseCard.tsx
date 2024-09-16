import {
    CopyToClipboardButton,
    FernAudioPlayer,
    FernButton,
    FernCard,
    FernTooltip,
    FernTooltipProvider,
} from "@fern-ui/components";
import { Loadable, visitLoadable } from "@fern-ui/loadable";
import clsx from "clsx";
import { Download } from "iconoir-react";
import { isEmpty, round } from "lodash-es";
import { ReactElement } from "react";
import { useFeatureFlags } from "../../atoms";
import { FernErrorTag } from "../../components/FernErrorBoundary";
import { PlaygroundResponsePreview } from "../PlaygroundResponsePreview";
import { PlaygroundSendRequestButton } from "../PlaygroundSendRequestButton";
import { PlaygroundResponse } from "../types/playgroundResponse";
import { ProxyResponse } from "../types/proxy";

interface PlaygroundResponseCard {
    response: Loadable<PlaygroundResponse>;
    sendRequest: () => void;
}

export function PlaygroundResponseCard({ response, sendRequest }: PlaygroundResponseCard): ReactElement {
    const { isBinaryOctetStreamAudioPlayer } = useFeatureFlags();
    return (
        <FernCard className="flex min-w-0 flex-1 shrink flex-col overflow-hidden rounded-xl shadow-sm">
            <div className="border-default flex h-10 w-full shrink-0 items-center justify-between border-b px-3 py-2">
                <span className="t-muted text-xs uppercase">Response</span>

                {response.type === "loaded" && (
                    <div className="flex items-center gap-2 text-xs">
                        <span
                            className={clsx("font-mono flex items-center py-1 px-1.5 rounded-md h-5", {
                                ["bg-method-get/10 text-method-get dark:bg-method-get-dark/10 dark:text-method-get-dark"]:
                                    response.value.response.status >= 200 && response.value.response.status < 300,
                                ["bg-method-delete/10 text-method-delete dark:bg-method-delete-dark/10 dark:text-method-delete-dark"]:
                                    response.value.response.status > 300,
                            })}
                        >
                            status: {response.value.response.status}
                        </span>
                        <span className={"flex h-5 items-center rounded-md bg-tag-default px-1.5 py-1 font-mono"}>
                            time: {round(response.value.time, 2)}ms
                        </span>
                        {response.value.type === "json" && !isEmpty(response.value.size) && (
                            <span className={"flex h-5 items-center rounded-md bg-tag-default px-1.5 py-1 font-mono"}>
                                size: {response.value.size}b
                            </span>
                        )}
                    </div>
                )}

                {visitLoadable(response, {
                    loading: () => <div />,
                    loaded: (response) =>
                        response.type === "file" ? (
                            <FernTooltipProvider>
                                <FernTooltip content="Download file">
                                    <FernButton
                                        icon={<Download />}
                                        size="small"
                                        variant="minimal"
                                        onClick={() => {
                                            const a = document.createElement("a");
                                            a.href = response.response.body;
                                            a.download = createFilename(response.response, response.contentType);
                                            a.click();
                                        }}
                                    />
                                </FernTooltip>
                            </FernTooltipProvider>
                        ) : (
                            <CopyToClipboardButton
                                content={() =>
                                    response.type === "json"
                                        ? JSON.stringify(response.response.body, null, 2)
                                        : response.type === "stream"
                                          ? response.response.body
                                          : ""
                                }
                                className="-mr-2"
                            />
                        ),
                    failed: () => (
                        <span className="flex items-center rounded-[4px] bg-tag-danger p-1 font-mono text-xs uppercase leading-none text-intent-danger">
                            Failed
                        </span>
                    ),
                })}
            </div>
            {visitLoadable(response, {
                loading: () =>
                    response.type === "notStartedLoading" ? (
                        <div className="flex flex-1 items-center justify-center">
                            <PlaygroundSendRequestButton sendRequest={sendRequest} />
                        </div>
                    ) : (
                        <div className="flex flex-1 items-center justify-center">Loading...</div>
                    ),
                loaded: (response) =>
                    response.type !== "file" ? (
                        <PlaygroundResponsePreview response={response} />
                    ) : response.contentType.startsWith("audio/") ||
                      (isBinaryOctetStreamAudioPlayer && response.contentType === "binary/octet-stream") ? (
                        <FernAudioPlayer
                            src={response.response.body}
                            className="flex h-full items-center justify-center p-4"
                        />
                    ) : response.contentType.includes("application/pdf") ? (
                        <iframe
                            src={response.response.body}
                            className="size-full"
                            title="PDF preview"
                            allowFullScreen
                        />
                    ) : (
                        <FernErrorTag
                            component="PlaygroundEndpointContent"
                            error={`File preview not supported for ${response.contentType}`}
                            className="flex h-full items-center justify-center"
                            showError
                        />
                    ),
                failed: (e) => (
                    <FernErrorTag
                        component="PlaygroundEndpointContent"
                        error={e}
                        className="flex h-full items-center justify-center"
                        showError={true}
                    />
                ),
            })}
        </FernCard>
    );
}

function createFilename(body: ProxyResponse.SerializableFileBody, contentType: string): string {
    const headers = new Headers(body.headers);
    const contentDisposition = headers.get("Content-Disposition");

    if (contentDisposition != null) {
        const filename = contentDisposition.split("filename=")[1];
        if (filename != null) {
            return filename;
        }
    }

    // TODO: use a more deterministic way to generate filenames
    const extension = contentType.split("/")[1];
    return `${crypto.randomUUID()}.${extension}`;
}