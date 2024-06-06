/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../index";

export type SizeConfig = FernRegistry.docs.v1.write.SizeConfig.Px | FernRegistry.docs.v1.write.SizeConfig.Rem;

export declare namespace SizeConfig {
    interface Px {
        type: "px";
        value: number;
    }

    interface Rem {
        type: "rem";
        value: number;
    }
}
