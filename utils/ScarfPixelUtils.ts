export const SCARF_PIXEL_IDS = {
  HOMEPAGE: "87848f39-08ad-4fee-a3d6-ab05b717d351",
  QUICKSTART: "466d9050-5f23-44d9-9533-b0a7a1417622",
  SECURITY: "8472f2b3-d307-4935-a5ed-3f9d3982c15d",
  HOW_TO_GUIDES: "6814879a-96c0-40bd-be69-ddfeb14694aa",
};

export function getScarfPixelId(slug: string[] | undefined): string | null {
  if (!slug || slug.length === 0) {
    return SCARF_PIXEL_IDS.HOMEPAGE;
  }

  const firstSegment = slug[0];

  // Quick Start pages
  if (firstSegment === "quick-start") {
    return SCARF_PIXEL_IDS.QUICKSTART;
  }

  // Deployment/Security pages - tracks /deployment/security and all its subpages
  if (firstSegment === "deployment" && slug.length > 1 && slug[1] === "security") {
    return SCARF_PIXEL_IDS.SECURITY;
  }

  // How-to-guides pages and all subpages
  if (firstSegment === "how-to-guides") {
    return SCARF_PIXEL_IDS.HOW_TO_GUIDES;
  }

  // No tracking for other pages
  return null;
}
