/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../index";
export interface CodeSnippet extends FernRegistry.api.latest.WithDescription {
    name: string | undefined;
    language: FernRegistry.api.latest.Language;
    install: string | undefined;
    code: string;
    generated: boolean;
}