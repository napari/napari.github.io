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
