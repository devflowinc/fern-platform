/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../index";

export interface ChangelogMonthNode extends FernRegistry.navigation.v1.WithNodeMetadata {
    type: "changelogMonth";
    month: number;
    children: FernRegistry.navigation.v1.ChangelogEntryNode[];
}
