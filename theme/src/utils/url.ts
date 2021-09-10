/**
 * Checks if the string is an external URL. This works by using the value to
 * create a URL object. URL objects will throw errors for relative URLs if a
 * base URL isn't provided, so an error will indicate that the URL is an absolute URL.
 *
 * @param url The string to check.
 * @returns True if the string is an external URL, false if relative.
 */
export function isExternalUrl(url: string): boolean {
  try {
    return !!new URL(url);
  } catch (_) {
    return false;
  }
}
