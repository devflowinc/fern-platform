/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../..";

export type NavbarLink =
    | FernRegistry.docs.v1.write.NavbarLink.Filled
    | FernRegistry.docs.v1.write.NavbarLink.Outlined
    | FernRegistry.docs.v1.write.NavbarLink.Minimal
    | FernRegistry.docs.v1.write.NavbarLink.Primary
    | FernRegistry.docs.v1.write.NavbarLink.Secondary;

export declare namespace NavbarLink {
    interface Filled extends FernRegistry.docs.v1.write.NavbarLinkMetadata {
        type: "filled";
    }

    interface Outlined extends FernRegistry.docs.v1.write.NavbarLinkMetadata {
        type: "outlined";
    }

    interface Minimal extends FernRegistry.docs.v1.write.NavbarLinkMetadata {
        type: "minimal";
    }

    interface Primary extends FernRegistry.docs.v1.write.NavbarLinkMetadata {
        type: "primary";
    }

    interface Secondary extends FernRegistry.docs.v1.write.NavbarLinkMetadata {
        type: "secondary";
    }
}
