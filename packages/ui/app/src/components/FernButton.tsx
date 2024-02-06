import classNames from "classnames";
import Link from "next/link";
import {
    ButtonHTMLAttributes,
    ComponentProps,
    DetailedHTMLProps,
    FC,
    forwardRef,
    PropsWithChildren,
    ReactNode,
} from "react";
import { RemoteFontAwesomeIcon } from "../commons/FontAwesomeIcon";
import "./FernButton.scss";

type Intent = "none" | "primary" | "success" | "warning" | "danger";

interface FernButtonSharedProps {
    className?: string;
    icon?: string | ReactNode;
    rightIcon?: string | ReactNode;
    buttonStyle?: "minimal" | "filled" | "outlined";
    intent?: Intent;
    size?: "small" | "normal" | "large";
    mono?: boolean;
    active?: boolean;
    full?: boolean;
    disabled?: boolean;
    rounded?: boolean;
}

interface FernButtonProps
    extends Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref">,
        PropsWithChildren<FernButtonSharedProps> {}

interface FernLinkButtonProps extends ComponentProps<typeof Link>, PropsWithChildren<FernButtonSharedProps> {}

function renderIcon(icon: string | ReactNode | undefined) {
    if (typeof icon === "string") {
        return <RemoteFontAwesomeIcon icon={icon} />;
    } else {
        return icon;
    }
}

export const FernLinkButton = forwardRef<HTMLAnchorElement, FernLinkButtonProps>(function FernAnchorButton(props, ref) {
    const {
        icon,
        disabled = false,
        rightIcon,
        className,
        children,
        buttonStyle,
        size,
        mono,
        intent,
        active,
        full,
        rounded,
        ...linkProps
    } = props;
    return (
        <Link
            ref={ref}
            {...linkProps}
            aria-disabled={disabled}
            className={getButtonClassName(props)}
            onClick={
                props.onClick != null
                    ? (e) => {
                          if (disabled) {
                              e.preventDefault();
                              e.stopPropagation();
                          } else {
                              props.onClick?.(e);
                          }
                      }
                    : undefined
            }
        >
            {renderButtonContent(props)}
        </Link>
    );
});

export const FernButton: FC<FernButtonProps> = forwardRef<HTMLButtonElement, FernButtonProps>(
    function FernButton(props, ref) {
        const {
            icon,
            disabled = false,
            rightIcon,
            className,
            children,
            buttonStyle,
            size,
            mono,
            intent,
            active,
            full,
            rounded,
            ...buttonProps
        } = props;
        return (
            <button
                ref={ref}
                {...buttonProps}
                disabled={disabled}
                aria-disabled={disabled}
                aria-selected={active}
                className={getButtonClassName(props)}
                onClick={
                    props.onClick != null
                        ? (e) => {
                              if (disabled) {
                                  e.preventDefault();
                                  e.stopPropagation();
                              } else {
                                  props.onClick?.(e);
                              }
                          }
                        : undefined
                }
            >
                {renderButtonContent(props)}
            </button>
        );
    },
);

export const FernButtonGroup = forwardRef<HTMLSpanElement, ComponentProps<"div">>(function FernButtonGroup(
    { className, children, ...props },
    ref,
) {
    return (
        <span ref={ref} className={classNames(className, "fern-button-group")} {...props}>
            {children}
        </span>
    );
});

function renderButtonContent({
    icon: leftIcon,
    rightIcon,
    mono = false,
    children,
}: PropsWithChildren<FernButtonSharedProps>) {
    return (
        <span className="fern-button-content">
            {renderIcon(leftIcon)}
            {children && (
                <span
                    className={classNames("whitespace-nowrap", {
                        "font-mono tracking-tight": mono,
                    })}
                >
                    {children}
                </span>
            )}
            {renderIcon(rightIcon)}
        </span>
    );
}

function getButtonClassName({
    className,
    buttonStyle = "filled",
    intent = "none",
    size = "normal",
    active = false,
    full = false,
    disabled = false,
    rounded = false,
    icon,
    rightIcon,
    children,
}: PropsWithChildren<FernButtonSharedProps>) {
    return classNames(className, "fern-button", buttonStyle, {
        small: size === "small",
        normal: size === "normal",
        large: size === "large",
        [size]: size !== "normal",
        [intent]: intent !== "none",
        disabled,
        active,
        "w-full": full,
        rounded,
        square: icon != null && children == null && rightIcon == null,
    });
}