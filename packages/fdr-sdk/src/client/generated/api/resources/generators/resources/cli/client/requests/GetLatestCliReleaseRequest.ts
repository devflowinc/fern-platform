/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../index";

/**
 * @example
 *     {
 *         release_type: FernRegistry.generators.ReleaseType.Ga
 *     }
 */
export interface GetLatestCliReleaseRequest {
    /** A filter for the release type, specifically if you'd like to get RC releases only, etc. */
    release_type?: FernRegistry.generators.ReleaseType;
}