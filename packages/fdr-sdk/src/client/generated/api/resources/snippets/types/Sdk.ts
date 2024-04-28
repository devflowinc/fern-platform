/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernRegistry from "../../..";

export type Sdk =
    | FernRegistry.Sdk.Typescript
    | FernRegistry.Sdk.Python
    | FernRegistry.Sdk.Go
    | FernRegistry.Sdk.Ruby
    | FernRegistry.Sdk.Java;

export declare namespace Sdk {
    interface Typescript extends FernRegistry.TypeScriptSdk {
        type: "typescript";
    }

    interface Python extends FernRegistry.PythonSdk {
        type: "python";
    }

    interface Go extends FernRegistry.GoSdk {
        type: "go";
    }

    interface Ruby extends FernRegistry.RubySdk {
        type: "ruby";
    }

    interface Java extends FernRegistry.JavaSdk {
        type: "java";
    }
}