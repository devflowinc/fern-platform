/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../../../../../../../..";

export type TypeReference =
    | FernRegistry.api.v1.register.TypeReference.Id
    | FernRegistry.api.v1.register.TypeReference.Primitive
    | FernRegistry.api.v1.register.TypeReference.Optional
    | FernRegistry.api.v1.register.TypeReference.List
    | FernRegistry.api.v1.register.TypeReference.Set
    | FernRegistry.api.v1.register.TypeReference.Map
    | FernRegistry.api.v1.register.TypeReference.Literal
    | FernRegistry.api.v1.register.TypeReference.Unknown;

export declare namespace TypeReference {
    interface Id {
        type: "id";
        value: FernRegistry.api.v1.register.TypeId;
    }

    interface Primitive {
        type: "primitive";
        value: FernRegistry.api.v1.register.PrimitiveType;
    }

    interface Optional extends FernRegistry.api.v1.register.OptionalType {
        type: "optional";
    }

    interface List extends FernRegistry.api.v1.register.ListType {
        type: "list";
    }

    interface Set extends FernRegistry.api.v1.register.SetType {
        type: "set";
    }

    interface Map extends FernRegistry.api.v1.register.MapType {
        type: "map";
    }

    interface Literal {
        type: "literal";
        value: FernRegistry.api.v1.register.LiteralType;
    }

    interface Unknown {
        type: "unknown";
    }
}
