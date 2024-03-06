import { useCopyToClipboard } from "@fern-ui/react-commons";
import classNames from "classnames";
import { ReactElement } from "react";
import { Markdown } from "../mdx/Markdown";
import { SerializedMdxContent } from "../mdx/mdx";
import { FernTooltip } from "./FernTooltip";

type ChipProps = {
    name: string;
    description?: SerializedMdxContent | undefined;
    small?: boolean;
};

export const Chip = ({ name, description = undefined, small }: ChipProps): ReactElement => {
    const { copyToClipboard, wasJustCopied } = useCopyToClipboard(name);
    return (
        <FernTooltip
            open={wasJustCopied ? true : description == null ? false : undefined}
            content={wasJustCopied ? "Copied!" : description != null ? <Markdown mdx={description} /> : undefined}
        >
            <span
                className={classNames(
                    "t-default bg-tag-default hover:bg-tag-default-hover cursor-default font-mono text-xs flex items-center",
                    {
                        ["py-1 px-1.5 rounded-md h-5"]: small,
                        ["py-1 px-2 rounded-lg h-6"]: !small,
                    },
                )}
                style={{
                    fontSize: small ? "10px" : undefined,
                }}
                onClick={copyToClipboard}
            >
                <span>{name}</span>
            </span>
        </FernTooltip>
    );
};
