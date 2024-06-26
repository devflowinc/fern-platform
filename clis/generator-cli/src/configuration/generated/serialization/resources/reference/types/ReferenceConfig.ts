/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as FernGeneratorCli from "../../../../api/index";
import * as core from "../../../../core";
import { RootPackageReferenceSection } from "./RootPackageReferenceSection";
import { ReferenceSection } from "./ReferenceSection";
import { Language } from "./Language";

export const ReferenceConfig: core.serialization.ObjectSchema<
    serializers.ReferenceConfig.Raw,
    FernGeneratorCli.ReferenceConfig
> = core.serialization.object({
    rootSection: core.serialization.property("root_section", RootPackageReferenceSection.optional()),
    sections: core.serialization.list(ReferenceSection),
    language: Language,
});

export declare namespace ReferenceConfig {
    interface Raw {
        root_section?: RootPackageReferenceSection.Raw | null;
        sections: ReferenceSection.Raw[];
        language: Language.Raw;
    }
}
