/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../index";

export interface ChangelogSection {
    /** Optional title for the changelog section. Defaults to "Changelog" if not provided. */
    title: string | undefined;
    /** Defaults to ActivityLog icon */
    icon: string | undefined;
    hidden: boolean | undefined;
    description: string | undefined;
    /** Optional mdx content to display at the top of the changelog section. The title and description will be parsed from the frontmatter and replace the config-defined values. */
    pageId: FernRegistry.PageId | undefined;
    items: FernRegistry.docs.v1.write.ChangelogItem[];
    urlSlug: string;
    fullSlug: string[] | undefined;
}