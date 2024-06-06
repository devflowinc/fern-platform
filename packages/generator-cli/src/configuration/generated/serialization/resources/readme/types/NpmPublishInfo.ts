/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as FernGeneratorCli from "../../../../api/index";
import * as core from "../../../../core";

export const NpmPublishInfo: core.serialization.ObjectSchema<
    serializers.NpmPublishInfo.Raw,
    FernGeneratorCli.NpmPublishInfo
> = core.serialization.object({
    packageName: core.serialization.string(),
});

export declare namespace NpmPublishInfo {
    interface Raw {
        packageName: string;
    }
}