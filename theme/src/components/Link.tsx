import NextLink, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { AnchorHTMLAttributes } from 'react';

interface Props extends AnchorHTMLAttributes<HTMLElement> {
  href: string;
  newTab?: boolean;
  linkProps?: LinkProps;
}

/**
 * Component for rendering a Next.js link using an anchor tag. This is mostly
 * to allow Next.js to preload routes and for the anchor tag to pass a11y.
 */
export function Link({
  children,
  href,
  linkProps = { href },
  newTab,
  ...props
}: Props) {
  const router = useRouter();
  let newTabProps: AnchorHTMLAttributes<HTMLElement> | undefined;

  if (newTab) {
    // For new tabs, add rel=noreferrer for security:
    // https://web.dev/external-anchors-use-rel-noopener/#how-to-improve-your-site's-performance-and-prevent-security-vulnerabilities
    newTabProps = {
      target: '_blank',
      rel: 'noreferrer',
    };
  }

  const linkNode = (
    <a href={href} {...props} {...newTabProps}>
      {children}
    </a>
  );

  // TODO Remove when sphinx script loading is figured out.
  // Currently there's an issue with using Next.js links because some of the
  // Sphinx extensions have scripts that need to run on initial load for every
  // page. Because of this, we can't treat the docs as an SPA and should use
  // regular links so that pages load normally.
  //
  // The code below is unreachable because of the return, but we're keeping it
  // in the codebase until the above TODO is solved.
  return linkNode;

  // Use regular links for the search page. This is because Jupyter Book fetches
  // every page from the documentation site to get and search its text content.
  // The fetching logic doesn't take SPA style apps into account, so it doesn't
  // include request cancellation logic. Because of this, we need to use regular
  // links so that opening a link will load a new page and cancel the pending
  // network requests.
  if (router.asPath.includes('/search')) {
    return linkNode;
  }

  return <NextLink {...linkProps}>{linkNode}</NextLink>;
}
