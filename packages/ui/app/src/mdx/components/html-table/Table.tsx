import { FernButton, FernScrollArea } from "@fern-ui/components";
import * as Dialog from "@radix-ui/react-dialog";
import { EnterFullScreenIcon } from "@radix-ui/react-icons";
import * as Tooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";
import { ComponentProps, FC, useState } from "react";

export const Table: FC<ComponentProps<"table">> = ({ className, ...rest }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    return (
        <>
            <Tooltip.TooltipProvider delayDuration={300}>
                <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                        <div className="fern-table-root not-prose">
                            <FernScrollArea>
                                <table {...rest} className={clsx("fern-table", className)} />
                            </FernScrollArea>
                        </div>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content side="right" align="start" sideOffset={6} className="animate-popover">
                            <FernButton
                                variant="outlined"
                                icon={<EnterFullScreenIcon />}
                                onClick={() => setIsFullScreen(true)}
                            />
                        </Tooltip.Content>
                    </Tooltip.Portal>
                </Tooltip.Root>
            </Tooltip.TooltipProvider>
            <Dialog.Root open={isFullScreen} onOpenChange={setIsFullScreen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-background/50 data-[state=open]:animate-overlay-show backdrop-blur-sm" />
                    <Dialog.Content
                        className="data-[state=open]:animate-content-show fixed top-1/2 left-1/2 max-h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] md:max-h-[calc(100vh-8rem)] md:w-[calc(100vw-8rem)] -translate-x-1/2 -translate-y-1/2 flex flex-col"
                        asChild
                    >
                        <div className="fern-table-root not-prose fullscreen">
                            <FernScrollArea>
                                <table {...rest} className={clsx("fern-table", className)} />
                            </FernScrollArea>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    );
};