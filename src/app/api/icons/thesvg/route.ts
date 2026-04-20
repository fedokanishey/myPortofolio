import { NextRequest, NextResponse } from "next/server";

const THESVG_META_URL = "https://unpkg.com/thesvg@latest/dist/?meta";
const THESVG_ICON_PAGE_URL = "https://thesvg.org/icon";
const THESVG_CDN_URL = "https://thesvg.org/icons";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

type MetaFile = {
  path?: string;
};

type MetaPayload = {
  files?: MetaFile[];
};

type SlugIndex = {
  slugs: Set<string>;
  byFingerprint: Map<string, string[]>;
  expiresAt: number;
};

let slugIndexCache: SlugIndex | null = null;

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name") || "";
  const slug = request.nextUrl.searchParams.get("slug") || "";
  const altSlug = request.nextUrl.searchParams.get("altSlug") || "";
  const variant = sanitizeVariant(request.nextUrl.searchParams.get("variant") || "default");

  if (!name && !slug && !altSlug) {
    return new NextResponse("Missing name or slug", { status: 400 });
  }

  try {
    const candidates = buildCandidates({ name, slug, altSlug });
    let index: SlugIndex | undefined;

    try {
      index = await getSlugIndex();
    } catch (metaError) {
      // Keep serving icons via direct page scraping even if metadata lookup fails.
      console.warn("theSVG metadata fetch failed, falling back to page scraping:", metaError);
    }

    const resolvedSlug = await resolveSlug(candidates, index);
    if (!resolvedSlug) {
      return new NextResponse("Icon not found", { status: 404 });
    }

    const icon = await fetchSvgVariant(resolvedSlug, variant);
    if (!icon) {
      return new NextResponse("Icon variant not found", { status: 404 });
    }

    return new NextResponse(icon.svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        "X-Icon-Slug": resolvedSlug,
        "X-Icon-Variant": icon.variant,
      },
    });
  } catch (error) {
    console.error("theSVG resolve error:", error);
    return new NextResponse("Failed to resolve icon", { status: 500 });
  }
}

async function getSlugIndex(): Promise<SlugIndex> {
  const now = Date.now();
  if (slugIndexCache && slugIndexCache.expiresAt > now) {
    return slugIndexCache;
  }

  const response = await fetch(THESVG_META_URL, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; PortfolioIconResolver/1.0)",
    },
    signal: AbortSignal.timeout(12000),
  });

  if (!response.ok) {
    throw new Error(`Failed to load theSVG metadata: ${response.status}`);
  }

  const payload = (await response.json()) as MetaPayload;
  const slugs = new Set<string>();

  for (const file of payload.files || []) {
    if (!file.path || !file.path.startsWith("/dist/") || !file.path.endsWith(".d.ts")) {
      continue;
    }

    const rawSlug = file.path.slice("/dist/".length, -".d.ts".length).toLowerCase();
    if (!rawSlug || rawSlug === "index" || rawSlug === "types") {
      continue;
    }

    slugs.add(rawSlug);
  }

  const byFingerprint = new Map<string, string[]>();
  for (const s of slugs) {
    const fp = fingerprint(s);
    if (!fp) continue;

    const existing = byFingerprint.get(fp);
    if (existing) {
      existing.push(s);
    } else {
      byFingerprint.set(fp, [s]);
    }
  }

  slugIndexCache = {
    slugs,
    byFingerprint,
    expiresAt: now + CACHE_TTL_MS,
  };

  return slugIndexCache;
}

function buildCandidates(input: { name: string; slug: string; altSlug: string }): string[] {
  const set = new Set<string>();

  const baseSlug = sanitizeSlug(input.slug);
  const alt = sanitizeSlug(input.altSlug);

  if (baseSlug) {
    addSlugVariants(baseSlug, set);
  }

  if (alt) {
    addSlugVariants(alt, set);
  }

  if (input.name) {
    const fromSimple = normalizeSkillNameToSimpleSlug(input.name);
    const fromKebab = normalizeSkillNameToKebabSlug(input.name);

    if (fromSimple) {
      addSlugVariants(fromSimple, set);
    }

    if (fromKebab) {
      addSlugVariants(fromKebab, set);
      addSlugVariants(fromKebab.replace(/-/g, ""), set);
    }
  }

  return Array.from(set);
}

function addSlugVariants(slug: string, out: Set<string>) {
  if (!slug) return;

  const add = (value: string) => {
    const clean = sanitizeSlug(value);
    if (clean) out.add(clean);
  };

  add(slug);

  if (slug.includes("dot")) {
    add(slug.replace(/dot/g, "-"));
    add(slug.replace(/dot/g, ""));
  }

  if (slug.endsWith("dotjs") && slug.length > "dotjs".length) {
    add(slug.slice(0, -"dotjs".length));
  }

  if (slug.endsWith("dotio") && slug.length > "dotio".length) {
    const base = slug.slice(0, -"dotio".length);
    add(base);
    add(`${base}-io`);
    add(`${base}io`);
  }

  if (slug.endsWith("-js") && slug.length > 3) {
    add(slug.slice(0, -3));
  }

  if (slug.endsWith("js") && !slug.endsWith("dotjs") && slug.length > 2) {
    add(slug.slice(0, -2));
  }

  if (!slug.includes("-") && slug.endsWith("ui") && slug.length > 2) {
    add(`${slug.slice(0, -2)}-ui`);
  }

  if (!slug.includes("-") && slug.endsWith("modules") && slug.length > "modules".length) {
    add(`${slug.slice(0, -"modules".length)}-modules`);
  }

  if (!slug.includes("-") && slug.endsWith("labs") && slug.length > "labs".length) {
    add(`${slug.slice(0, -"labs".length)}-labs`);
  }
}

function normalizeSkillNameToSimpleSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/\+/g, "plus")
    .replace(/#/g, "sharp")
    .replace(/\./g, "dot")
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9-]/g, "");
}

function normalizeSkillNameToKebabSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/\+/g, " plus ")
    .replace(/#/g, " sharp ")
    .replace(/\./g, " ")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function resolveSlug(candidates: string[], index?: SlugIndex): Promise<string | null> {
  if (index) {
    for (const candidate of candidates) {
      if (index.slugs.has(candidate)) {
        return candidate;
      }
    }

    for (const candidate of candidates) {
      const matches = index.byFingerprint.get(fingerprint(candidate));
      if (!matches || matches.length === 0) continue;

      const sorted = [...matches].sort(
        (a, b) => Math.abs(a.length - candidate.length) - Math.abs(b.length - candidate.length)
      );
      return sorted[0];
    }
  }

  // Final fallback: scrape icon detail pages and resolve canonical slug from hydration data.
  for (const candidate of candidates.slice(0, 5)) {
    const scraped = await scrapeSlugFromIconPage(candidate);
    if (scraped) {
      return scraped;
    }
  }

  return null;
}

async function scrapeSlugFromIconPage(candidate: string): Promise<string | null> {
  const response = await fetch(`${THESVG_ICON_PAGE_URL}/${encodeURIComponent(candidate)}`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; PortfolioIconResolver/1.0)",
    },
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    return null;
  }

  const html = await response.text();

  const hydrationMatch = html.match(/"icon":\{"slug":"([a-z0-9.-]+)"/i);
  if (hydrationMatch?.[1]) {
    return sanitizeSlug(hydrationMatch[1]);
  }

  const jsonLdMatch = html.match(/"@id":"https:\/\/thesvg\.org\/icon\/([^"#]+)#image"/i);
  if (jsonLdMatch?.[1]) {
    return sanitizeSlug(jsonLdMatch[1]);
  }

  const canonicalMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="https:\/\/thesvg\.org\/icon\/([^"]+)"/i);
  if (canonicalMatch?.[1]) {
    return sanitizeSlug(canonicalMatch[1]);
  }

  return null;
}

async function fetchSvgVariant(slug: string, requestedVariant: string): Promise<{ svg: string; variant: string } | null> {
  const variants = requestedVariant === "default" ? ["default"] : [requestedVariant, "default"];

  for (const variant of variants) {
    const url = `${THESVG_CDN_URL}/${encodeURIComponent(slug)}/${encodeURIComponent(variant)}.svg`;
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; PortfolioIconResolver/1.0)",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      continue;
    }

    const svg = await response.text();
    if (!svg.includes("<svg")) {
      continue;
    }

    return { svg, variant };
  }

  return null;
}

function sanitizeSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function sanitizeVariant(value: string): string {
  const normalized = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, "");

  if (!normalized) return "default";
  return normalized;
}

function fingerprint(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}
