import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import cn from "clsx";
import { FC, ReactNode } from "react";
import "./FernCheckbox.css";

interface FernCheckboxProps extends Checkbox.CheckboxProps {
    labelClassName?: string;
    label?: ReactNode;
    helperText?: ReactNode;
    compact?: boolean;
}

export const FernCheckbox: FC<FernCheckboxProps> = ({
    labelClassName,
    label,
    helperText,
    children,
    className,
    compact,
    ...props
}) => (
    <label className={cn("fern-checkbox-label", { compact })}>
        <Checkbox.Root className="fern-checkbox-item" {...props}>
            <Checkbox.Indicator className="fern-checkbox-indicator">
                <CheckIcon />
            </Checkbox.Indicator>
        </Checkbox.Root>

        <div className="ml-2 flex-1">
            <div className={cn("text-sm font-semibold", labelClassName)}>{label}</div>
            {helperText && <p className="t-muted mb-0 text-xs">{helperText}</p>}
            {children}
        </div>
    </label>
);