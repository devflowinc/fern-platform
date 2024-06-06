import { FernNavigation } from "../generated";
import { NavigationNode } from "./NavigationNode";
import { NavigationNodeApiLeaf, isApiLeaf } from "./NavigationNodeApiLeaf";
import { NavigationNodeSectionOverview, isSectionOverview } from "./NavigationNodeSectionOverview";

export type NavigationNodeNeighbor =
    | NavigationNodeApiLeaf
    | FernNavigation.PageNode
    | FernNavigation.ChangelogNode
    | NavigationNodeSectionOverview;

export function isNeighbor(node: NavigationNode): node is NavigationNodeNeighbor {
    return isApiLeaf(node) || node.type === "page" || node.type === "changelog" || isSectionOverview(node);
}