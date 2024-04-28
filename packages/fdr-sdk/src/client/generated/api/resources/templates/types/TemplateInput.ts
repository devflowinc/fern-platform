/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../..";

export type TemplateInput = FernRegistry.TemplateInput.Template | FernRegistry.TemplateInput.Payload;

export declare namespace TemplateInput {
    interface Template {
        type: "template";
        value: FernRegistry.Template;
    }

    interface Payload extends FernRegistry.PayloadInput {
        type: "payload";
    }
}