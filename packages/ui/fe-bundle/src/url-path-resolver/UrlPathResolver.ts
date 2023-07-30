import { assertNever } from "@fern-api/core-utils";
import { ResolvedUrlPath } from "@fern-api/ui";
import type * as FernRegistryApiRead from "@fern-fern/registry-browser/api/resources/api/resources/v1/resources/read";
import * as FernRegistryDocsRead from "@fern-fern/registry-browser/api/resources/docs/resources/v1/resources/read";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import remarkGfm from "remark-gfm";
import { UrlSlugTree, UrlSlugTreeNode } from "./UrlSlugTree";

const REMARK_PLUGINS = [remarkGfm];

export interface UrlPathResolverConfig {
    navigation: FernRegistryDocsRead.UnversionedNavigationConfig;
    loadApiPage: (id: FernRegistryDocsRead.PageId) => FernRegistryDocsRead.PageContent | undefined;
    loadApiDefinition: (id: FernRegistryApiRead.ApiDefinition["id"]) => FernRegistryApiRead.ApiDefinition | undefined;
}

export class UrlPathResolver {
    private readonly urlSlugTree: UrlSlugTree;

    constructor(private readonly config: UrlPathResolverConfig) {
        this.urlSlugTree = new UrlSlugTree({
            navigation: config.navigation,
            loadApiDefinition: config.loadApiDefinition,
        });
    }

    public async resolveSlug(slug: string): Promise<ResolvedUrlPath | undefined> {
        const node = this.urlSlugTree.resolveSlug(slug);
        if (node == null) {
            return undefined;
        }
        return this.convertNode(node);
    }

    private async convertNode(node: UrlSlugTreeNode): Promise<ResolvedUrlPath> {
        switch (node.type) {
            case "section":
                return {
                    type: "section",
                    section: node.section,
                    slug: node.slug,
                };
            case "page":
                switch (path.extname(node.page.id)) {
                    case ".md":
                        return {
                            type: "markdown-page",
                            page: node.page,
                            slug: node.slug,
                            markdownContent: this.getPage(node.page.id).markdown,
                        };
                    case ".mdx":
                        return {
                            type: "mdx-page",
                            page: node.page,
                            slug: node.slug,
                            serializedMdxContent: await serialize(this.getPage(node.page.id).markdown, {
                                scope: {},
                                mdxOptions: {
                                    remarkPlugins: REMARK_PLUGINS,
                                    format: "mdx",
                                },
                                parseFrontmatter: false,
                            }),
                        };
                    default:
                        throw new Error("Unexpected page extension: " + node.page.id);
                }
            case "api":
                return {
                    type: "api",
                    apiSection: node.apiSection,
                    apiSlug: node.apiSlug,
                    slug: node.slug,
                };
            case "clientLibraries":
                return {
                    type: "clientLibraries",
                    apiSection: node.apiSection,
                    apiSlug: node.apiSlug,
                    slug: node.slug,
                    artifacts: node.artifacts,
                };
            case "topLevelEndpoint":
                return {
                    type: "topLevelEndpoint",
                    apiSection: node.apiSection,
                    apiSlug: node.apiSlug,
                    slug: node.slug,
                    endpoint: node.endpoint,
                };
            case "apiSubpackage":
                return {
                    type: "apiSubpackage",
                    apiSection: node.apiSection,
                    apiSlug: node.apiSlug,
                    slug: node.slug,
                    subpackage: node.subpackage,
                };
            case "endpoint":
                return {
                    type: "endpoint",
                    apiSection: node.apiSection,
                    apiSlug: node.apiSlug,
                    slug: node.slug,
                    parent: node.parent,
                    endpoint: node.endpoint,
                };
            default:
                assertNever(node);
        }
    }

    private getPage(pageId: FernRegistryDocsRead.PageId): FernRegistryDocsRead.PageContent {
        const page = this.config.loadApiPage(pageId);
        if (page == null) {
            throw new Error("Page does not exist: " + pageId);
        }
        return page;
    }

    public async getNextNavigatableItem(path: ResolvedUrlPath): Promise<ResolvedUrlPath | undefined> {
        const { nextNavigatableItem } = this.urlSlugTree.getNeighbors(path.slug);
        return nextNavigatableItem != null ? this.convertNode(nextNavigatableItem) : undefined;
    }

    public async getPreviousNavigatableItem(path: ResolvedUrlPath): Promise<ResolvedUrlPath | undefined> {
        const { previousNavigatableItem } = this.urlSlugTree.getNeighbors(path.slug);
        return previousNavigatableItem != null ? this.convertNode(previousNavigatableItem) : undefined;
    }
}
