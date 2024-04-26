/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as FernRegistry from "../../..";
export interface IterableTemplate {
    imports?: string[];
    /**
     * We might not need this, but the idea here is to be able to omit if it's optional and undefined,
     * or default if omitted and required.
     */
    isOptional: boolean;
    /** Commonly the braces of a container like `[ $FERN_INPUT ]` for a list or `{ $FERN_INPUT }` for a set */
    containerTemplateString: string;
    delimiter: string;
    /**
     * In the event of an array, the root template would be something like `[ fern!{{ child }} ]`
     * and so the child would be the actual object type seen in the example.
     */
    innerTemplate: FernRegistry.Template;
    templateInput?: FernRegistry.PayloadInput;
}