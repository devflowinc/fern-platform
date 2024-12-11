/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../index";

export type NavigationTab =
    | FernRegistry.docs.v1.read.NavigationTab.Group
    | FernRegistry.docs.v1.read.NavigationTab.Link
    | FernRegistry.docs.v1.read.NavigationTab.Changelog
    | FernRegistry.docs.v1.read.NavigationTab.ChangelogV3;

export declare namespace NavigationTab {
    interface Group extends FernRegistry.docs.v1.read.NavigationTabGroup {
        type: "group";
    }

    interface Link extends FernRegistry.docs.v1.read.NavigationTabLink {
        type: "link";
    }

    interface Changelog extends FernRegistry.docs.v1.read.ChangelogSection {
        type: "changelog";
    }

    interface ChangelogV3 extends FernRegistry.docs.v1.read.ChangelogSectionV3 {
        type: "changelogV3";
    }
}