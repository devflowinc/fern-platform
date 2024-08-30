import clsx from "clsx";

export enum FernLogoFill {
    /**
     * The leaf color is fern (green), and the text color is ground in light mode or air in dark mode
     */
    Default = "default",

    /**
     * The entire logo is fern (green)
     */
    Fern = "fern",

    /**
     * The entire logo is monochrome — either ground in light mode or air in dark mode
     */
    Mono = "mono",

    /**
     * The entire logo is grayscale-a10
     */
    Muted = "muted",

    /**
     * The leaf color is fern (green), and the text color is air (white)
     */
    FernAir = "fern-air",

    /**
     * The leaf color is fern (green), and the text color is ground (black)
     */
    FernGround = "fern-ground",

    /**
     * The entire logo is air (white)
     */
    Air = "air",

    /**
     * The entire logo is ground (black)
     */
    Ground = "ground",
}

export declare namespace FernLogo {
    export interface Props {
        className?: string;
        fill?: FernLogoFill;
    }
}

export const FernLogo: React.FC<FernLogo.Props> = ({ fill = FernLogoFill.Default, className }) => {
    return (
        <svg
            viewBox="0 0 604 164"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx("aspect-[604/164]", className)}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M295.294 0H255.861H255.836C234.047 0 221.437 11.4661 221.437 33.483V47.2372H193.242V75.2033H221.437V160.5H253.547V75.2033H288.404V47.2372H253.547V37.3728C253.547 30.7118 257.208 27.9661 263.87 27.9661H295.294V0ZM345.26 43.8081C311.777 43.8081 288.844 67.1979 288.844 103.198H288.87C288.87 139.884 311.802 163.96 346.43 163.96C375.311 163.96 392.727 149.291 399.388 126.816H366.591C363.591 133.02 356.955 137.367 346.633 137.367C331.277 137.367 321.87 129.562 320.497 115.35H400.761C401.219 110.545 401.447 106.401 401.447 102.283C401.447 66.2826 378.744 43.8081 345.26 43.8081ZM369.108 90.5877V91.0453H320.269C321.184 77.7487 329.675 69.0284 345.26 69.0284C360.845 69.0284 369.108 77.7487 369.108 90.5877ZM412.668 47.2321H440.863V67.1898C443.609 54.3508 452.787 47.2321 467.227 47.2321H487.414V51.122C487.414 64.4186 476.634 75.1982 463.338 75.1982C450.727 75.1982 444.753 81.6304 444.753 94.4694V160.52H412.642V47.2321H412.668ZM526.939 47.24H498.744H498.719V160.503H530.829V96.0789C530.829 81.6382 539.321 72.6891 552.16 72.6891C564.999 72.6891 571.889 80.0366 571.889 95.1637V160.528H604V91.7315C604 61.7061 586.559 43.8078 558.821 43.8078C545.753 43.8078 533.601 48.8417 526.939 58.7061V47.24Z"
                className={clsx({
                    "fill-fern": fill === FernLogoFill.Fern,
                    "fill-air": fill === FernLogoFill.Air || fill === FernLogoFill.FernAir,
                    "fill-ground": fill === FernLogoFill.Ground || fill === FernLogoFill.FernGround,
                    "fill-ground dark:fill-air": fill === FernLogoFill.Default || fill === FernLogoFill.Mono,
                    "fill-grayscale-a10": fill === FernLogoFill.Muted,
                })}
            />
            <path
                d="M149.383 80.2222C138.594 71.101 122.341 67.4445 107.936 78.0925C107.273 78.5747 106.449 77.751 106.952 77.1081C110.367 72.7082 114.325 67.9668 117.519 63.2053C120.774 58.3233 125.636 54.8275 131.241 53.1198C161.076 44.079 152.116 0 152.116 0C152.116 0 106.027 2.97342 111.713 42.7329C112.657 49.3829 110.889 56.1535 106.731 61.4374C101.628 67.8865 95.7008 74.0543 91.4014 78.5144C90.4973 79.4386 88.9705 78.5546 89.3321 77.309C93.4909 63.3058 96.5246 41.648 82.1195 27.685L61.848 10.849L57.9504 15.9922C46.3581 31.2812 49.7534 52.8385 65.0625 64.4108C73.8422 71.0407 77.8201 78.2533 77.1973 86.169C76.8156 90.9104 74.6659 95.3505 71.4514 98.8663C65.4041 105.496 59.7586 112.608 55.3989 120.846C54.7962 121.991 53.0483 121.549 53.1086 120.243C53.7314 106.641 52.4255 75.983 29.5221 65.0336L3.88635 55.1289L1.89737 61.0556C-4.55174 80.182 5.99588 100.614 25.1021 107.104C41.7171 112.749 47.6439 123.457 43.6458 139.51C43.465 140.092 40.572 156.627 40.9738 163.96H59.3969C60.0198 152.589 71.9536 145.115 82.3003 149.756C85.2135 151.062 88.207 152.93 91.2809 155.341C107.755 168.32 132.025 165.246 144.983 148.752L148.68 144.05L125.375 127.315C109.383 114.738 88.0463 120.424 72.255 131.192C70.929 132.096 69.2414 130.65 69.9847 129.203C89.0709 91.7542 113.883 91.8346 123.607 100.152C135.4 110.238 153.261 108.429 163.266 96.5961L166.139 93.2007L149.363 80.2222H149.383Z"
                className={clsx({
                    "fill-fern":
                        fill === FernLogoFill.Default ||
                        fill === FernLogoFill.Fern ||
                        fill === FernLogoFill.FernAir ||
                        fill === FernLogoFill.FernGround,
                    "fill-air": fill === FernLogoFill.Air,
                    "fill-ground": fill === FernLogoFill.Ground,
                    "fill-ground dark:fill-air": fill === FernLogoFill.Mono,
                    "fill-grayscale-a10": fill === FernLogoFill.Muted,
                })}
            />
        </svg>
    );
};
