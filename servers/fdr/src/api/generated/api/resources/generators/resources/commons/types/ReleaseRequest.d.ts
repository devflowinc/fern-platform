/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../..";
export interface ReleaseRequest {
    version: string;
    created_at?: string;
    is_yanked?: FernRegistry.generators.Yank;
    changelog_entry?: FernRegistry.generators.ChangelogEntry;
}