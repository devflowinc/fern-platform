/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../index";
export interface ChangelogSection {
    /** Optional title for the changelog section. Defaults to "Changelog" if not provided. */
    title?: string;
    /** Defaults to ActivityLog icon */
    icon?: string;
    hidden?: boolean;
    description?: string;
    /** Optional mdx content to display at the top of the changelog section. The title and description will be parsed from the frontmatter and replace the config-defined values. */
    pageId?: string;
    items: FernRegistry.docs.v1.write.ChangelogItem[];
    urlSlug: string;
    fullSlug?: string[];
}
