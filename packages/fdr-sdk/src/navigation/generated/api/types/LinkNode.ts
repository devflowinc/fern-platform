/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernNavigation from "../index";

export interface LinkNode extends FernNavigation.WithNodeId {
    type: "link";
    title: string;
    icon: string | undefined;
    url: FernNavigation.Url;
}