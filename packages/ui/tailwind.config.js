const plugin = require("tailwindcss/plugin");

const round = (num) =>
    num
        .toFixed(7)
        .replace(/(\.[0-9]+?)0+$/, "$1")
        .replace(/\.0$/, "");
const em = (px, base) => `${round(px / base)}em`;

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                mono: "var(--typography-code-font-family)",
            },
            spacing: {
                "page-width": "var(--spacing-page-width)",
                "content-width": "var(--spacing-content-width)",
                "endpoint-width": "calc(var(--spacing-content-width) * 2 + 3rem)",
                "sidebar-width": "var(--spacing-sidebar-width)",
                "header-height-real": "var(--spacing-header-height-real)",
                "header-height": "var(--spacing-header-height)",
                "header-height-padded": "calc(var(--spacing-header-height) + 1rem)",
                "vh-minus-header": "calc(100vh - var(--spacing-header-height))",
                icon: "15px",
            },
            flex: {
                2: "2 2 0%",
            },
            minWidth: {
                sm: "24rem",
                md: "28rem",
                lg: "32rem",
                xl: "36rem",
            },
            maxWidth: {
                "8xl": "88rem",
            },
            boxShadow: {
                header: "0px 4px 24px 0px rgba(var(--accent-primary), 10%)",
                "header-dark": "0px 4px 24px 0px rgba(var(--accent-primary), 10%)",
                "card-light": "0 1px 2px rgba(17,20,24,.06)",
                "card-light-elevated": "0 1px 2px rgba(17,20,24,.1), 0 3px 6px rgba(17,20,24,.06)",
                "card-dark": "0 2px 4px rgba(221, 243, 255,.07)",
                "card-dark-elevated": "0 2px 4px rgba(221, 243, 255,.1), 0 2px 24px rgba(221, 243, 255,.1)",
            },

            colors: {
                "accent-primary": withOpacity("--accent-primary"),
                "accent-primary-aa": withOpacity("--accent-primary-aa"),
                "accent-primary-aaa": withOpacity("--accent-primary-aaa"),
                "accent-primary-tinted": withOpacity("--accent-primary-tinted"),
                "accent-primary-contrast": withOpacity("--accent-primary-contrast"),
                "accent-highlight": "rgba(var(--accent-primary), 20%)",
                "accent-highlight-faded": "rgba(var(--accent-primary), 10%)",
                background: withOpacity("--background"),

                "method-get": "#49A68C",
                "method-post": "#487FAB",
                "method-delete": "#E75B4D",
                "method-put": "#E99368",
                "method-patch": "#E99368",
                "method-get-dark": "#A7F3D0",
                "method-post-dark": "#70ABEC",
                "method-delete-dark": "#F87F71",
                "method-put-dark": "#FDBA74",
                "method-patch-dark": "#FDBA74",

                "intent-default": "var(--grayscale-a11)",
                "intent-default-lightened": "var(--grayscale-a12)",
                "intent-warning": "var(--amber-a11)",
                "intent-warning-lightened": "var(--amber-a12)",
                "intent-success": "var(--green-a11)",
                "intent-success-lightened": "var(--green-a12)",
                "intent-danger": "var(--red-a11)",
                "intent-danger-lightened": "var(--red-a12)",
                "intent-info": "var(--blue-a11)",
                "intent-info-lightened": "var(--blue-a12)",

                "background-primary": {
                    light: "rgb(3, 7, 18)",
                    dark: "rgb(255, 255, 255)",
                },
                "background-secondary": {
                    light: "rgb(17, 24, 39)",
                    dark: "rgb(249, 250, 251)",
                },
                "background-tertiary": {
                    light: "rgb(243, 244, 246)",
                    dark: "rgb(31, 41, 55)",
                },

                "background-hover": {
                    light: "rgba(3, 7, 18, 0.05)",
                    dark: "rgba(151, 90, 90, 0.05)",
                },

                "card-background": "var(--card-background)",
                "sidebar-background": "var(--sidebar-background)",
                "header-background": "var(--header-background)",

                // "border-default": "var(--grayscale-a5)",
                "border-default": "var(--border)",
                "border-concealed": "var(--border-concealed)",
                "border-accent-muted": "rgba(var(--accent-primary), 0.50)",
                "border-warning": "var(--amber-a8)",
                "border-success": "var(--green-a8)",
                "border-danger": "var(--red-a8)",
                "border-info": "var(--blue-a8)",

                "border-default-soft": "var(--grayscale-a6)",
                "border-primary-soft": "rgba(var(--accent-primary), 30%)",
                "border-warning-soft": "var(--amber-a6)",
                "border-success-soft": "var(--green-a6)",
                "border-danger-soft": "var(--red-a6)",
                "border-info-soft": "var(--blue-a6)",

                "text-default": withOpacity("--body-text"),
                "text-muted": "var(--grayscale-a11)",
                "text-disabled": "var(--grayscale-a10)",
                faded: "var(--grayscale-a9)",

                "tag-default-soft": "var(--grayscale-a2)",
                "tag-primary-soft": "rgba(var(--accent-primary), 10%)",
                "tag-warning-soft": "var(--amber-a2)",
                "tag-success-soft": "var(--green-a2)",
                "tag-danger-soft": "var(--red-a2)",
                "tag-info-soft": "var(--blue-a2)",

                "tag-default": "var(--grayscale-a3)",
                "tag-default-solid": "var(--grayscale-3)",
                "tag-default-hover": "var(--grayscale-a4)",
                "tag-primary": "rgba(var(--accent-primary), 15%)",
                "tag-warning": "var(--amber-a3)",
                "tag-success": "var(--green-a3)",
                "tag-danger": "var(--red-a3)",
                "tag-info": "var(--blue-a3)",
            },
            typography: {
                DEFAULT: {
                    css: {
                        color: "#000000",
                        maxWidth: "var(--spacing-content-width)",
                        "--tw-prose-bold": "inherit",
                        "--tw-prose-links": "inherit",
                        "--tw-prose-hr": "var(--border)",
                        "--tw-prose-body": "inherit",
                        "--tw-prose-headings": "inherit",
                        "--tw-prose-pre-bg": "initial",
                        "--tw-prose-th-borders": "var(--border)",
                        "--tw-prose-td-borders": "var(--border)",
                        "tbody td[rowspan]:first-child, tfoot td[rowspan]:first-child": {
                            paddingRight: em(8, 14),
                        },
                        "tbody td[rowspan]:first-child + td, tfoot td[rowspan]:first-child + td": {
                            paddingLeft: 0,
                        },
                    },
                },
                sm: {
                    css: {
                        color: "var(--grayscale-a11)",
                        p: {
                            marginTop: "0.25rem",
                        },
                        "tbody td[rowspan]:first-child, tfoot td[rowspan]:first-child": {
                            paddingRight: em(12, 12),
                        },
                        "tbody td[rowspan]:first-child + td, tfoot td[rowspan]:first-child + td": {
                            paddingLeft: 0,
                        },
                    },
                },
                invert: {
                    css: {
                        color: "#ffffff",
                        "--tw-prose-bold": "inherit",
                        "--tw-prose-links": "inherit",
                        "--tw-prose-hr": "var(--border)",
                        "--tw-prose-invert-body": "inherit",
                        "--tw-prose-invert-headings": "inherit",
                        "--tw-prose-pre-bg": "initial",
                        "--tw-prose-invert-th-borders": "var(--border)",
                        "--tw-prose-invert-td-borders": "var(--border)",
                    },
                },
                "invert-sm": {
                    css: {
                        color: "var(--grayscale-a11)",
                    },
                },
            },
            keyframes: {
                "slide-down-and-fade": {
                    from: { opacity: 0, transform: "translateY(-2px)" },
                    to: { opacity: 1, transform: "translateY(0)" },
                },
                "slide-left-and-fade": {
                    from: { opacity: 0, transform: "translateX(2px)" },
                    to: { opacity: 1, transform: "translateX(0)" },
                },
                "slide-up-and-fade": {
                    from: { opacity: 0, transform: "translateY(2px)" },
                    to: { opacity: 1, transform: "translateY(0)" },
                },
                "slide-right-and-fade": {
                    from: { opacity: 0, transform: "translateX(-2px)" },
                    to: { opacity: 1, transform: "translateX(0)" },
                },
                shine: {
                    "0%": { opacity: "0.5", transform: "translateX(-100px) skewX(-15deg)" },
                    "33%": { opacity: "0.6", transform: "translateX(300px) skewX(-15deg)" },
                    "100%": { opacity: "0.6", transform: "translateX(300px) skewX(-15deg)" },
                },
                "slide-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "slide-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
            },
            transitionTimingFunction: {
                shift: "cubic-bezier(0.16, 1, 0.3, 1)",
                collapse: "cubic-bezier(0.87,0,0.13,1)",
            },
            animation: {
                "slide-down-and-fade": "slide-down-and-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                "slide-left-and-fade": "slide-left-and-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                "slide-up-and-fade": "slide-up-and-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                "slide-right-and-fade": "slide-right-and-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                shine: "shine 5s ease-in-out infinite",
                "slide-down": "slide-down 400ms cubic-bezier(0.87, 0, 0.13, 1)",
                "slide-up": "slide-up 400ms cubic-bezier(0.87, 0, 0.13, 1)",
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
        // Defining the classes here to get proper intellisense
        // https://github.com/tailwindlabs/tailwindcss-intellisense/issues/227#issuecomment-1269592872
        plugin(({ addComponents }) => {
            addComponents({
                // Text
                ".t-default": {
                    "@apply text-text-default": {},
                },
                ".t-muted": {
                    "@apply text-text-muted dark:text-text-muted dark:[text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)]": {},
                },
                ".t-accent": {
                    "@apply text-accent-primary-aa": {},
                },
                ".t-accent-aaa": {
                    "@apply text-accent-primary-aaa": {},
                },
                ".t-accent-contrast": {
                    "@apply text-accent-primary-contrast": {},
                },
                ".t-success": {
                    "@apply text-intent-success": {},
                },
                ".t-warning": {
                    "@apply text-intent-warning": {},
                },
                ".t-danger": {
                    "@apply text-intent-danger": {},
                },
                // Background
                // ".bg-background": {
                //     "@apply bg-background-light dark:bg-background-dark": {},
                // },
                ".bg-background-translucent": {
                    "@apply bg-background/70": {},
                },
                ".bg-sidebar": {
                    "@apply bg-sidebar-background": {},
                },
                ".bg-header": {
                    "@apply bg-header-background": {},
                },
                ".bg-card": {
                    "@apply bg-card-background": {},
                },
                ".bg-accent": {
                    "@apply bg-accent-primary": {},
                },
                ".bg-accent-muted": {
                    "@apply bg-accent-primary/70": {},
                },
                ".bg-accent-aa": {
                    "@apply bg-accent-primary-aa": {},
                },
                ".bg-accent-aaa": {
                    "@apply bg-accent-primary-aaa": {},
                },
                ".bg-accent-contrast": {
                    "@apply bg-accent-primary-contrast": {},
                },
                ".bg-accent-tinted": {
                    "@apply bg-accent-primary-tinted": {},
                },
                ".bg-accent-highlight": {
                    "@apply bg-accent-primary/20": {},
                },
                ".bg-accent-highlight-faded": {
                    "@apply bg-accent-primary/10": {},
                },
                ".bg-border-primary": {
                    "@apply bg-border-accent-muted": {},
                },
                // Border
                ".border-primary": {
                    "@apply border-border-accent-muted": {},
                },
                ".border-concealed": {
                    "@apply border-border-concealed": {},
                },
                ".border-default": {
                    "@apply border-border-default": {},
                },
                ".border-success": {
                    "@apply border-border-success": {},
                },
                ".border-warning": {
                    "@apply border-border-warning": {},
                },
                ".border-danger": {
                    "@apply border-border-danger": {},
                },
                ".divide-default": {
                    "@apply divide-border-default": {},
                },
                ".ring-default": {
                    "@apply ring-border-default": {},
                },
                ".ring-concealed": {
                    "@apply ring-border-concealed": {},
                },
                ".ring-border-primary": {
                    "@apply ring-border-accent-muted": {},
                },
                ".animate-popover": {
                    "@apply data-[side=top]:animate-slide-down-and-fade data-[side=right]:animate-slide-left-and-fade data-[side=bottom]:animate-slide-up-and-fade data-[side=left]:animate-slide-right-and-fade":
                        {},
                },

                ".callout-soft": {
                    "@apply bg-tag-default ring-0": {},
                },
                ".callout-soft-success": {
                    "@apply bg-tag-success ring-0": {},
                },
                ".callout-soft-warning": {
                    "@apply bg-tag-warning ring-0": {},
                },
                ".callout-soft-danger": {
                    "@apply bg-tag-danger ring-0": {},
                },

                ".callout-outlined": {
                    "@apply bg-tag-default-soft ring-1 ring-inset ring-border-default-soft": {},
                },
                ".callout-outlined-success": {
                    "@apply bg-tag-success-soft ring-1 ring-inset ring-border-success-soft": {},
                },
                ".callout-outlined-warning": {
                    "@apply bg-tag-warning-soft ring-1 ring-inset ring-border-warning-soft": {},
                },
                ".callout-outlined-danger": {
                    "@apply bg-tag-danger-soft ring-1 ring-inset ring-border-danger-soft": {},
                },
                ".callout-outlined-primary": {
                    "@apply bg-tag-primary-soft ring-1 ring-inset ring-border-primary-soft": {},
                },
                ".callout-outlined-info": {
                    "@apply bg-tag-info-soft ring-1 ring-inset ring-border-info-soft": {},
                },

                ".callout-outlined-ghost": {
                    "@apply ring-1 ring-inset ring-border-default-soft": {},
                },
                ".callout-outlined-ghost-success": {
                    "@apply ring-1 ring-inset ring-border-success-soft": {},
                },
                ".callout-outlined-ghost-warning": {
                    "@apply ring-1 ring-inset ring-border-warning-soft": {},
                },
                ".callout-outlined-ghost-danger": {
                    "@apply ring-1 ring-inset ring-border-danger-soft": {},
                },
                ".shadow-default": {
                    "@apply shadow-border-default": {},
                },
                // ".shadow-tag-primary": {
                //     "@apply shadow-tag-primary": {},
                // },
                ".shadow-border-primary": {
                    "@apply shadow-border-accent-muted": {},
                },
                ".shadow-accent": {
                    "@apply shadow-accent-primary": {},
                },
                ".shadow-card": {
                    "@apply shadow-card-light dark:shadow-card-dark": {},
                },
                ".shadow-card-elevated": {
                    "@apply shadow-card-light-elevated dark:shadow-card-dark-elevated": {},
                },
            });
        }),
    ],
    future: {
        hoverOnlyWhenSupported: true,
    },
};

// https://stackoverflow.com/a/72831219/4238485
function withOpacity(variableName) {
    return ({ opacityValue }) => {
        if (opacityValue !== undefined) {
            return `rgba(var(${variableName}), ${opacityValue})`;
        }
        return `rgb(var(${variableName}))`;
    };
}