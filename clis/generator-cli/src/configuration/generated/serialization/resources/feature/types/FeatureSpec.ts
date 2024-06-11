/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as FernGeneratorCli from "../../../../api/index";
import * as core from "../../../../core";
import { FeatureId } from "./FeatureId";

export const FeatureSpec: core.serialization.ObjectSchema<serializers.FeatureSpec.Raw, FernGeneratorCli.FeatureSpec> =
    core.serialization.object({
        id: FeatureId,
        description: core.serialization.string().optional(),
        addendum: core.serialization.string().optional(),
    });

export declare namespace FeatureSpec {
    interface Raw {
        id: FeatureId.Raw;
        description?: string | null;
        addendum?: string | null;
    }
}