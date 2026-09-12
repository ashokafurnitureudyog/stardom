/**
 * Extracts the Appwrite file id from a stored media URL, or null when the URL
 * points somewhere else. Matches the bucket path rather than the hostname, so a
 * self-hosted endpoint behaves the same as Appwrite Cloud.
 */
export function fileIdFromUrl(url: string): string | null {
  const match = /\/storage\/buckets\/[^/]+\/files\/([^/?]+)/.exec(url);
  return match?.[1] ?? null;
}
