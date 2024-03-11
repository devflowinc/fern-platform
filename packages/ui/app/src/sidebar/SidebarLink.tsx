import { ChevronDownIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { range } from "lodash-es";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import {
    forwardRef,
    HTMLAttributeAnchorTarget,
    memo,
    PropsWithChildren,
    ReactElement,
    ReactNode,
    useEffect,
    useRef,
} from "react";
import { FernTooltip } from "../components/FernTooltip";
import { getRouteNodeWithAnchor } from "../util/anchor";
import { joinUrlSlugs } from "../util/slug";
import { useIsMobileSidebarOpen } from "./atom";

interface SidebarSlugLinkProps {
    icon?: ReactElement;
    slug?: string[];
    onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
    className?: string;
    linkClassName?: string;
    title?: string;
    shallow?: boolean;
    selected?: boolean;
    showIndicator?: boolean;
    depth?: number;
    toggleExpand?: () => void;
    expanded?: boolean;
    rightElement?: ReactNode;
    registerScrolledToPathListener: (slug: string, listener: () => void) => () => void;
    tooltipContent?: ReactNode;
}

type SidebarLinkProps = PropsWithChildren<
    Omit<SidebarSlugLinkProps, "registerScrolledToPathListener" | "slug"> & {
        // Link props
        href?: Url;
        rel?: string | undefined;
        target?: HTMLAttributeAnchorTarget | undefined;

        elementRef?: React.Ref<HTMLLIElement>;
    }
>;

const SidebarLinkInternal = forwardRef<HTMLButtonElement, SidebarLinkProps>((props, ref) => {
    const {
        icon,
        className,
        linkClassName: linkClassNameProp,
        title,
        onClick,
        shallow,
        href,
        selected,
        showIndicator,
        depth = 0,
        toggleExpand,
        expanded = false,
        rightElement,
        children,
        elementRef,
        tooltipContent,
        target,
        rel,
    } = props;
    const renderLink = (child: ReactElement) => {
        const linkClassName = classNames(linkClassNameProp, "fern-sidebar-link");

        return href != null ? (
            <Link
                href={href}
                className={linkClassName}
                onClick={(e) => {
                    onClick?.(e);
                    toggleExpand?.();
                    if (shallow && typeof href === "string") {
                        getRouteNodeWithAnchor(href)?.node?.scrollIntoView({ behavior: "auto" });
                    }
                }}
                shallow={shallow}
                scroll={!shallow}
                target={target}
                rel={rel}
            >
                {child}
            </Link>
        ) : (
            <button
                className={linkClassName}
                onClick={(e) => {
                    onClick?.(e);
                    toggleExpand?.();
                }}
                ref={ref}
            >
                {child}
            </button>
        );
    };

    const withTooltip = (content: ReactNode) => {
        if (tooltipContent == null) {
            return content;
        }

        return (
            <FernTooltip content={tooltipContent} side="right">
                {content}
            </FernTooltip>
        );
    };

    const expandButton = (toggleExpand != null || expanded) && (
        <span
            className="fern-sidebar-link-expand opacity-60 transition-opacity group-hover:opacity-100 lg:group-hover/sidebar:opacity-100"
            data-state={showIndicator ? "active" : "inactive"}
        >
            <ChevronDownIcon
                className={classNames("transition-transform size-5 lg:size-icon", {
                    "-rotate-90": !expanded,
                    "rotate-0": expanded,
                })}
            />
        </span>
    );

    return (
        <li ref={elementRef} className="fern-sidebar-item">
            <div
                className={classNames("fern-sidebar-link-container group", className)}
                data-state={selected ? "active" : "inactive"}
            >
                {withTooltip(
                    renderLink(
                        <>
                            {range(0, depth).map((i) => (
                                <div
                                    key={i}
                                    className={classNames(
                                        "fern-sidebar-link-indent",
                                        "transition-transform group-hover/sidebar:opacity-100 transition-opacity ease-out",
                                    )}
                                />
                            ))}
                            {expandButton}
                            <span className="fern-sidebar-link-content">
                                {icon != null && <span className="mr-2">{icon}</span>}
                                <span className="fern-sidebar-link-text">{title}</span>
                                {rightElement}
                            </span>
                            {expandButton}
                        </>,
                    ),
                )}
            </div>
            {children}
        </li>
    );
});

SidebarLinkInternal.displayName = "SidebarLink";

export const SidebarLink = memo(SidebarLinkInternal);

const SidebarSlugLinkInternal = forwardRef<HTMLButtonElement, PropsWithChildren<SidebarSlugLinkProps>>((props, ref) => {
    const { slug, registerScrolledToPathListener, ...innerProps } = props;
    const elementRef = useRef<HTMLLIElement>(null);
    const isMobileSidebarOpen = useIsMobileSidebarOpen();

    useEffect(() => {
        if (slug == null) {
            return undefined;
        }
        return registerScrolledToPathListener(joinUrlSlugs(...slug), () => {
            elementRef.current?.scrollIntoView({ block: "nearest", inline: "center" });
        });
    }, [slug, registerScrolledToPathListener]);

    useEffect(() => {
        if (isMobileSidebarOpen && props.selected) {
            elementRef.current?.scrollIntoView({ block: "nearest", inline: "center" });
        }
    }, [isMobileSidebarOpen, props.selected]);

    return (
        <SidebarLink
            {...innerProps}
            ref={ref}
            elementRef={elementRef}
            href={slug != null ? `/${slug.join("/")}` : undefined}
        />
    );
});

SidebarSlugLinkInternal.displayName = "SidebarSlugLink";

export const SidebarSlugLink = memo(SidebarSlugLinkInternal);
