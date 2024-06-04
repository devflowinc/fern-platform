/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as FernGeneratorCli from "../../../../api/index";
import * as core from "../../../../core";
import { RubyGemsPublishInfo } from "./RubyGemsPublishInfo";

export const RubyInfo: core.serialization.ObjectSchema<serializers.RubyInfo.Raw, FernGeneratorCli.RubyInfo> =
    core.serialization.object({
        publishInfo: RubyGemsPublishInfo.optional(),
    });

export declare namespace RubyInfo {
    interface Raw {
        publishInfo?: RubyGemsPublishInfo.Raw | null;
    }
}
