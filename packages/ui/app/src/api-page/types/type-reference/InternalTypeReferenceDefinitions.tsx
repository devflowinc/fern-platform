import { visitDiscriminatedUnion } from "@fern-ui/core-utils";
import React, { ReactElement } from "react";
import { ResolvedTypeDefinition, ResolvedTypeShape, unwrapReference } from "../../../util/resolver";
import { InternalTypeDefinition } from "../type-definition/InternalTypeDefinition";
import { InternalTypeDefinitionError } from "../type-definition/InternalTypeDefinitionError";
import { ListTypeContextProvider } from "./ListTypeContextProvider";
import { MapTypeContextProvider } from "./MapTypeContextProvider";

export declare namespace InternalTypeReferenceDefinitions {
    export interface Props {
        shape: ResolvedTypeShape;
        applyErrorStyles: boolean;
        isCollapsible: boolean;
        className?: string;
        anchorIdParts: string[];
        route: string;
        defaultExpandAll?: boolean;
        types: Record<string, ResolvedTypeDefinition>;
        isResponse?: boolean;
    }
}

export function hasInternalTypeReference(
    shape: ResolvedTypeShape,
    types: Record<string, ResolvedTypeDefinition>,
): boolean {
    return visitDiscriminatedUnion(shape, "type")._visit<boolean>({
        object: () => true,
        enum: () => true,
        undiscriminatedUnion: () => true,
        discriminatedUnion: () => true,
        list: () => true,
        set: () => true,
        optional: (optional) => hasInternalTypeReference(optional.shape, types),
        map: (map) => hasInternalTypeReference(map.keyShape, types) || hasInternalTypeReference(map.valueShape, types),
        string: () => false,
        boolean: () => false,
        integer: () => false,
        double: () => false,
        long: () => false,
        datetime: () => false,
        uuid: () => false,
        base64: () => false,
        date: () => false,
        booleanLiteral: () => false,
        stringLiteral: () => false,
        unknown: () => false,
        _other: () => false,
        reference: (reference) =>
            hasInternalTypeReference(
                types[reference.typeId] ?? {
                    type: "unknown",
                    description: undefined,
                    availability: undefined,
                    defaultsTo: undefined,
                },
                types,
            ),
        alias: (alias) => hasInternalTypeReference(alias.shape, types),
    });
}

export const InternalTypeReferenceDefinitions: React.FC<InternalTypeReferenceDefinitions.Props> = ({
    shape,
    applyErrorStyles,
    isCollapsible,
    className,
    anchorIdParts,
    route,
    defaultExpandAll = false,
    types,
}) => {
    const InternalShapeRenderer = applyErrorStyles ? InternalTypeDefinitionError : InternalTypeDefinition;
    return visitDiscriminatedUnion(unwrapReference(shape, types), "type")._visit<ReactElement | null>({
        object: (object) => (
            <InternalShapeRenderer
                typeShape={object}
                isCollapsible={isCollapsible}
                anchorIdParts={anchorIdParts}
                route={route}
                defaultExpandAll={defaultExpandAll}
                types={types}
            />
        ),
        enum: (enum_) => (
            <InternalShapeRenderer
                typeShape={enum_}
                isCollapsible={isCollapsible}
                anchorIdParts={anchorIdParts}
                route={route}
                defaultExpandAll={defaultExpandAll}
                types={types}
            />
        ),
        undiscriminatedUnion: (undiscriminatedUnion) => (
            <InternalShapeRenderer
                typeShape={undiscriminatedUnion}
                isCollapsible={isCollapsible}
                anchorIdParts={anchorIdParts}
                route={route}
                defaultExpandAll={defaultExpandAll}
                types={types}
            />
        ),
        discriminatedUnion: (discriminatedUnion) => (
            <InternalShapeRenderer
                typeShape={discriminatedUnion}
                isCollapsible={isCollapsible}
                anchorIdParts={anchorIdParts}
                route={route}
                defaultExpandAll={defaultExpandAll}
                types={types}
            />
        ),

        list: (list) => (
            <ListTypeContextProvider>
                <InternalTypeReferenceDefinitions
                    shape={list.shape}
                    isCollapsible={isCollapsible}
                    applyErrorStyles={applyErrorStyles}
                    className={className}
                    anchorIdParts={anchorIdParts}
                    route={route}
                    defaultExpandAll={defaultExpandAll}
                    types={types}
                />
            </ListTypeContextProvider>
        ),
        set: (set) => (
            <ListTypeContextProvider>
                <InternalTypeReferenceDefinitions
                    shape={set.shape}
                    isCollapsible={isCollapsible}
                    applyErrorStyles={applyErrorStyles}
                    className={className}
                    anchorIdParts={anchorIdParts}
                    route={route}
                    defaultExpandAll={defaultExpandAll}
                    types={types}
                />
            </ListTypeContextProvider>
        ),
        optional: (optional) => (
            <InternalTypeReferenceDefinitions
                shape={optional.shape}
                isCollapsible={isCollapsible}
                applyErrorStyles={applyErrorStyles}
                className={className}
                anchorIdParts={anchorIdParts}
                route={route}
                defaultExpandAll={defaultExpandAll}
                types={types}
            />
        ),
        map: (map) => (
            <MapTypeContextProvider>
                <InternalTypeReferenceDefinitions
                    shape={map.keyShape}
                    isCollapsible={isCollapsible}
                    applyErrorStyles={applyErrorStyles}
                    className={className}
                    anchorIdParts={anchorIdParts}
                    route={route}
                    defaultExpandAll={defaultExpandAll}
                    types={types}
                />
                <InternalTypeReferenceDefinitions
                    shape={map.valueShape}
                    isCollapsible={isCollapsible}
                    applyErrorStyles={applyErrorStyles}
                    className={className}
                    anchorIdParts={anchorIdParts}
                    route={route}
                    defaultExpandAll={defaultExpandAll}
                    types={types}
                />
            </MapTypeContextProvider>
        ),
        string: () => null,
        boolean: () => null,
        integer: () => null,
        double: () => null,
        long: () => null,
        datetime: () => null,
        uuid: () => null,
        base64: () => null,
        date: () => null,
        booleanLiteral: () => null,
        stringLiteral: () => null,
        unknown: () => null,
        _other: () => null,
        alias: (alias) => (
            <InternalTypeReferenceDefinitions
                shape={alias.shape}
                isCollapsible={isCollapsible}
                applyErrorStyles={applyErrorStyles}
                className={className}
                anchorIdParts={anchorIdParts}
                route={route}
                defaultExpandAll={defaultExpandAll}
                types={types}
            />
        ),
    });
};
