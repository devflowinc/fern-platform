/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../..";
export interface ComputedSemanticVersionResponse {
    /** The recommended version to release the SDK at */
    version: string;
    bump: FernRegistry.sdks.VersionBump;
}
