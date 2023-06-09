import { FernRegistryClient } from "@fern-fern/registry-browser";

export const REGISTRY_SERVICE = new FernRegistryClient({
    environment:
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        import.meta.env?.VITE_FDR_ORIGIN ?? "https://registry.buildwithfern.com",
});
