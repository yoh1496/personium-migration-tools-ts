const SCHEME_LOCALUNIT = 'personium-localunit';

/**
 * Function for converting old-style localunit schema url to current-style.
 * Before v1.7.17, normalized URI is created
 * by replacing path-based URL with `personium-localunit:/'.
 * @param uri localunit schema uri
 * @returns current-style localunit schema uri or null when uri is not old-style.
 */
export function convertOldNormalizedURI(uri: string): string | null {
  const UNIT_URL_DUMMY = 'https://impossibleurl.example.com/';
  const SCHEME_UNIT_URL_OLD = 'personium-localunit:/';

  // not old normalized uri style
  if (!uri.startsWith(SCHEME_UNIT_URL_OLD)) {
    return null;
  }

  const pathBasedUrl = uri.replace(
    RegExp(`^${SCHEME_UNIT_URL_OLD}`),
    UNIT_URL_DUMMY
  );
  return convertSchemeFromHttpToLocalUnit(pathBasedUrl, UNIT_URL_DUMMY, true);
}

/**
 * Function for converting schema from http to localunit.
 * @param url url with http schema
 * @param unitUrl url of unit
 * @param pathBased whether url style is pathBased
 */
function convertSchemeFromHttpToLocalUnit(
  url: string,
  unitUrl: string,
  pathBased: boolean
): string | null {
  if (url === null) return null;

  if (pathBased) {
    if (!url.startsWith(unitUrl)) {
      return url;
    }
    const ret = url
      .replace(unitUrl, SCHEME_LOCALUNIT + ':/')
      .replace(/\:\/(.+?)\//, ':$1:/');
    return ret;
  } else {
    throw new Error('Converting per-cell URL is not implemented');
  }
}
