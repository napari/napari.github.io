import Head from 'next/head';
import { useRouter } from 'next/router';

import { useJupyterBookData } from '@/context/jupyterBook';
import { createUrl, isExternalUrl } from '@/utils/url';

/**
 * Creates an absolute URL from the given Next.js path.
 *
 * @param path The path to use for the URL.
 * @returns A fully qualified URL.
 */
function createNapariOrgUrl(path: string) {
  // Get pathname without URL parameters or hash.
  const { pathname } = createUrl(path);
  const baseUrl = process.env.PREVIEW_BASE_URL || '';

  return `${baseUrl}${pathname}`;
}

/**
 * Component for adding meta tags to add support for rich previews on Twitter
 * and OpenGraph websites.
 */
export function MetaPreviews() {
  const router = useRouter();
  const { pageFrontMatter, pageTitle, previewImage } = useJupyterBookData();

  // Meta description will override the intro if specified.
  const previewDescription =
    pageFrontMatter.metaDescription || pageFrontMatter.intro;
  const previewUrl = router.asPath && createNapariOrgUrl(router.asPath);

  // Convert image URL to absolute URL if it's an internal image.
  let previewImageLink = previewImage;

  // Convert URL to absolute URL if it isn't one.
  if (!isExternalUrl(previewImage)) {
    previewImageLink = createNapariOrgUrl(previewImage);
  }

  return (
    <Head>
      {/* Twitter card data */}
      <meta
        name="twitter:card"
        content={previewImage ? 'summary_large_image' : 'summary'}
      />
      <meta name="twitter:site" content="@napari_imaging" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={previewDescription} />
      <meta name="twitter:creator" content="@napari_imaging" />
      {previewImage && <meta name="twitter:image" content={previewImageLink} />}

      {/* Open Graph data */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={previewUrl} />
      <meta property="og:description" content={previewDescription} />
      <meta property="og:site_name" content="napari.org" />
      {previewImage && <meta name="og:image" content={previewImageLink} />}
    </Head>
  );
}
