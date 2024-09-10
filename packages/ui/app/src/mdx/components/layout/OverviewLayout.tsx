import type { FernNavigation } from "@fern-api/fdr-sdk";
import { FernScrollArea } from "@fern-ui/components";
import type { ElementContent } from "hast";
import type { MdxJsxFlowElementHast } from "mdast-util-mdx-jsx";
import { ReactElement, ReactNode } from "react";
import type { TableOfContentsItem } from "../../../atoms";
import { EditThisPageButton } from "../../../components/EditThisPage";
import { PageHeader } from "../../../components/PageHeader";
import { TableOfContents } from "../../../components/TableOfContents";
import { Feedback } from "../../../feedback/Feedback";
import { BuiltWithFern } from "../../../sidebar/BuiltWithFern";
import { toAttribute } from "../../plugins/utils";

interface OverviewLayoutProps {
    breadcrumbs: readonly FernNavigation.NavigationBreadcrumbItem[];
    title: string;
    subtitle: ReactNode | undefined;
    tableOfContents: TableOfContentsItem[] | undefined;
    children: ReactNode;
    editThisPageUrl: string | undefined;
    hideFeedback: boolean | undefined;
}

interface OverviewLayoutOpts {
    breadcrumbs: readonly FernNavigation.NavigationBreadcrumbItem[];
    title: string;
    subtitle: ElementContent | undefined;
    tableOfContents: TableOfContentsItem[] | undefined;
    children: ElementContent[];
    editThisPageUrl: string | undefined;
    hideFeedback: boolean | undefined;
}

export function OverviewLayout({
    breadcrumbs,
    title,
    tableOfContents,
    subtitle,
    children,
    editThisPageUrl,
    hideFeedback,
}: OverviewLayoutProps): ReactElement {
    return (
        <main className="fern-overview-layout">
            <aside className="fern-layout-toc">
                {tableOfContents != null && tableOfContents.length > 0 && (
                    <FernScrollArea className="px-4 pb-12 pt-8 lg:pr-8">
                        <TableOfContents tableOfContents={tableOfContents} />
                    </FernScrollArea>
                )}
            </aside>
            <article className="fern-layout-content max-w-content-wide-width">
                <PageHeader breadcrumbs={breadcrumbs} title={title} subtitle={subtitle} />
                <div className="max-w-full fern-prose">{children}</div>
                {(!hideFeedback || editThisPageUrl != null) && (
                    <footer className="mt-12">
                        <div className="flex sm:justify-between max-sm:flex-col gap-4">
                            <div>{!hideFeedback && <Feedback />}</div>
                            <EditThisPageButton editThisPageUrl={editThisPageUrl} />
                        </div>
                        <BuiltWithFern className="w-fit mx-auto my-8" />
                    </footer>
                )}
            </article>
        </main>
    );
}

export function toOverviewLayoutHastNode({ children, ...attributes }: OverviewLayoutOpts): MdxJsxFlowElementHast {
    return {
        type: "mdxJsxFlowElement",
        name: "OverviewLayout",
        attributes: Object.entries(attributes).map(([key, value]) => toAttribute(key, value)),
        children,
    };
}
