import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    // Fetch the page HTML
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; PortfolioBot/1.0)",
      },
      signal: AbortSignal.timeout(10000), // 10s timeout
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch URL" },
        { status: 400 }
      );
    }

    const html = await response.text();

    // Extract OpenGraph image
    let ogImage = extractMetaContent(html, 'property="og:image"') ||
                  extractMetaContent(html, "property='og:image'") ||
                  extractMetaContent(html, 'name="og:image"');

    // Try Twitter card image
    if (!ogImage) {
      ogImage = extractMetaContent(html, 'name="twitter:image"') ||
                extractMetaContent(html, 'property="twitter:image"');
    }

    // Try favicon as fallback
    let favicon = extractFavicon(html, url);

    // Try to extract title and description too
    const title = extractMetaContent(html, 'property="og:title"') ||
                  extractMetaContent(html, 'name="title"') ||
                  extractTitle(html);

    const description = extractMetaContent(html, 'property="og:description"') ||
                        extractMetaContent(html, 'name="description"');

    // Make relative URLs absolute
    if (ogImage && !ogImage.startsWith("http")) {
      const baseUrl = new URL(url);
      ogImage = new URL(ogImage, baseUrl.origin).href;
    }

    return NextResponse.json({
      success: true,
      image: ogImage || null,
      favicon: favicon || null,
      title: title || null,
      description: description || null,
    });
  } catch (error) {
    console.error("Fetch preview error:", error);
    return NextResponse.json(
      { error: "Failed to fetch preview" },
      { status: 500 }
    );
  }
}

function extractMetaContent(html: string, attribute: string): string | null {
  // Match meta tags with the specified attribute
  const regex = new RegExp(
    `<meta[^>]*${attribute}[^>]*content=["']([^"']+)["'][^>]*>`,
    "i"
  );
  const match = html.match(regex);
  if (match) return match[1];

  // Try reverse order (content before property)
  const regex2 = new RegExp(
    `<meta[^>]*content=["']([^"']+)["'][^>]*${attribute}[^>]*>`,
    "i"
  );
  const match2 = html.match(regex2);
  return match2 ? match2[1] : null;
}

function extractTitle(html: string): string | null {
  const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return match ? match[1].trim() : null;
}

function extractFavicon(html: string, pageUrl: string): string | null {
  // Try to find link rel="icon"
  const iconMatch = html.match(
    /<link[^>]*rel=["'](?:icon|shortcut icon)["'][^>]*href=["']([^"']+)["'][^>]*>/i
  );
  
  if (iconMatch) {
    const favicon = iconMatch[1];
    if (favicon.startsWith("http")) return favicon;
    const baseUrl = new URL(pageUrl);
    return new URL(favicon, baseUrl.origin).href;
  }

  // Default to /favicon.ico
  try {
    const baseUrl = new URL(pageUrl);
    return `${baseUrl.origin}/favicon.ico`;
  } catch {
    return null;
  }
}
