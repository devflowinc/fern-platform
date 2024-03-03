import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
export const revalidate = 60 * 60 * 24;

function getHostFromUrl(url: string | undefined): string | undefined {
    if (url == null) {
        return undefined;
    }
    const urlObj = new URL(url);
    return urlObj.host;
}

export default async function GET(req: NextRequest): Promise<NextResponse> {
    const xFernHost = req.headers.get("x-fern-host") ?? getHostFromUrl(req.nextUrl.href);

    if (xFernHost == null || Array.isArray(xFernHost)) {
        return notFoundResponse();
    }

    const hostWithoutTrailingSlash = xFernHost.endsWith("/") ? xFernHost.slice(0, -1) : xFernHost;

    const hostnameAndProtocol =
        req.nextUrl.host === "localhost" ? "http://localhost:3000" : `https://${hostWithoutTrailingSlash}`;

    const sitemapResponse = await fetch(`${hostnameAndProtocol}/api/sitemap`, {
        headers: { "x-fern-host": xFernHost },
    });

    if (sitemapResponse.status !== 200) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch docs", sitemapResponse.status, sitemapResponse.statusText);
        return notFoundResponse();
    }

    const urls: string[] = await sitemapResponse.json();

    const sitemap = getSitemapXml(urls.map((url) => `https://${url}`));

    return new NextResponse(sitemap, {
        headers: {
            "Content-Type": "text/xml",
        },
    });
}

function getSitemapXml(urls: string[]): string {
    return `<?xml version="1.0" encoding="UTF-8"?> <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls
            .map((url) => {
                return `
                    <url>
                        <loc>${url}</loc>
                    </url>
                `;
            })
            .join("\n")}
    </urlset>`;
}
function notFoundResponse(): NextResponse<unknown> | PromiseLike<NextResponse<unknown>> {
    throw new Error("Function not implemented.");
}