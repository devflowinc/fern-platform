/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../../../../../../../..";
export declare type PrimitiveType = FernRegistry.api.v1.register.PrimitiveType.Integer | FernRegistry.api.v1.register.PrimitiveType.Double | FernRegistry.api.v1.register.PrimitiveType.Long | FernRegistry.api.v1.register.PrimitiveType.String | FernRegistry.api.v1.register.PrimitiveType.Boolean | FernRegistry.api.v1.register.PrimitiveType.Datetime | FernRegistry.api.v1.register.PrimitiveType.Uuid | FernRegistry.api.v1.register.PrimitiveType.Base64 | FernRegistry.api.v1.register.PrimitiveType.Date_;
export declare namespace PrimitiveType {
    interface Integer {
        type: "integer";
    }
    interface Double {
        type: "double";
    }
    interface Long {
        type: "long";
    }
    interface String {
        type: "string";
    }
    interface Boolean {
        type: "boolean";
    }
    interface Datetime {
        type: "datetime";
    }
    interface Uuid {
        type: "uuid";
    }
    interface Base64 {
        type: "base64";
    }
    interface Date_ {
        type: "date";
    }
}
