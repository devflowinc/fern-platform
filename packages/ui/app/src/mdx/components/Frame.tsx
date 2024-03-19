import { FC, PropsWithChildren } from "react";

export declare namespace Frame {
    export interface Props {
        caption?: string;
    }
}

export const Frame: FC<PropsWithChildren<Frame.Props>> = ({ caption, children }) => {
    return (
        <figure className="not-prose fern-card relative mb-6 mt-4 overflow-hidden rounded-xl p-2">
            <div className="relative flex justify-center overflow-hidden rounded-lg shadow-sm">{children}</div>
            {caption && (
                <figcaption className="t-muted relative mt-3 flex justify-center px-8 pb-2 pt-0 text-sm">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
};