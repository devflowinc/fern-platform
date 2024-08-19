/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../index";

/**
 * @example
 *     {
 *         generator: "string",
 *         retain_major_version: 1,
 *         release_type: FernRegistry.generators.ReleaseType.Ga
 *     }
 */
export interface GetLatestGeneratorReleaseRequest {
    generator: FernRegistry.generators.GeneratorId;
    /**
     * Whether or not to include major versions when searching for the latest version. If specified, we will only return the latest version
     * that is the same major version as provided. Useful while we do not support config migrations, etc.
     *
     */
    retain_major_version?: number;
    /** A filter for the release type, specifically if you'd like to get RC releases only, etc. */
    release_type?: FernRegistry.generators.ReleaseType;
}