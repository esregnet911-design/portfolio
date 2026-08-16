const assetBaseUrl = process.env.NEXT_PUBLIC_ASSET_BASE_URL?.replace(/\/$/, "") || "";

export function assetUrl(path: string) {
  if (!path || path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }

  return `${assetBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function hasExternalAssetBase() {
  return assetBaseUrl.startsWith("http://") || assetBaseUrl.startsWith("https://");
}
