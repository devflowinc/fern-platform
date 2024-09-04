import { FernButton } from "@fern-ui/components";
import { FC, ReactNode } from "react";

interface PlaygroundSendRequestButtonProps {
    sendRequest: () => void;

    sendRequestButtonLabel?: string;
    sendRequestIcon?: ReactNode;
}

export const PlaygroundSendRequestButton: FC<PlaygroundSendRequestButtonProps> = ({
    sendRequest,
    sendRequestButtonLabel,
    sendRequestIcon,
}) => {
    return (
        <FernButton
            className="group relative overflow-hidden font-semibold after:absolute after:inset-y-0 after:w-8 after:animate-shine after:bg-white/50 after:blur after:content-['']"
            rightIcon={sendRequestIcon}
            onClick={sendRequest}
            intent="primary"
            rounded
            size="large"
        >
            {sendRequestButtonLabel ?? "Send Request"}
        </FernButton>
    );
};