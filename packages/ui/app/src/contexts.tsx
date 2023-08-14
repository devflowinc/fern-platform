import { ThemeProviderWithLayout } from "@fern-ui/theme";
import { PropsWithChildren } from "react";
import { SearchContextProvider } from "./search-context/SearchContextProvider";

export const CONTEXTS = [
    ({ children }: PropsWithChildren): JSX.Element => <SearchContextProvider>{children}</SearchContextProvider>,
    ({ children }: PropsWithChildren): JSX.Element => <ThemeProviderWithLayout>{children}</ThemeProviderWithLayout>,
];
