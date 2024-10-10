/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../index";
export declare type FormDataField = FernRegistry.api.latest.FormDataField.File_ | FernRegistry.api.latest.FormDataField.Files | FernRegistry.api.latest.FormDataField.Property;
export declare namespace FormDataField {
    interface File_ extends FernRegistry.api.latest.FormDataFile {
        type: "file";
    }
    interface Files extends FernRegistry.api.latest.FormDataFiles {
        type: "files";
    }
    interface Property extends FernRegistry.api.latest.FormDataProperty {
        type: "property";
    }
}