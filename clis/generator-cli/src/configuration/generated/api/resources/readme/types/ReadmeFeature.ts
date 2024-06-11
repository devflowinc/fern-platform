/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernGeneratorCli from "../../../index";

/**
 * A single feature supported by a generator (e.g. PAGINATION).
 */
export interface ReadmeFeature {
    id: FernGeneratorCli.FeatureId;
    description?: string;
    addendum?: string;
    snippets?: string[];
    /**
     * If true, the feature block should be rendered even if we don't receive a snippet for it.
     * This is useful for features that are always supported, but might not require a snippet
     * to explain.
     */
    snippetsAreOptional: boolean;
}