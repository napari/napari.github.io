import { Collapse } from '@material-ui/core';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

import { ExternalLink } from '@/components/icons';
import { Link } from '@/components/Link';
import { TOCHeader } from '@/context/jupyterBook';
import { isExternalUrl } from '@/utils/url';

import styles from './GlobalTableOfContents.module.scss';

interface Props {
  headers: Record<string, TOCHeader>;
  rootHeaders: string[];
}

/**
 * Enum values for identifying header levels in the global table of contents
 * data structure.
 */
enum Header {
  Category = 1,
  Title = 2,
  Subtitle = 3,
}

/**
 * Constant for applying styles to the title headers.
 */
const HEADER_TITLES = [Header.Title, Header.Subtitle];

/**
 * Component for rendering the global table of contents list. This uses a
 * recursive render function to render the global TOC data structure since the
 * data is deeply nested.
 */
export function GlobalTableOfContents({ headers, rootHeaders }: Props) {
  const router = useRouter();

  /**
   * @returns The router pathname without hashes or query parameters.
   */
  function getPathname() {
    return new URL(router.asPath, 'http://tmp.com').pathname;
  }

  /**
   * Determines if a particular header is within an expanded column.
   *
   * @param headerId The header ID.
   * @returns True if the header ID is in a category that's expanded.
   */
  function isCategoryExpanded(headerId: string) {
    // Use DFS to check if the header ID is in a expanded category.
    const stack = [headerId];

    while (stack.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const currentHeaderId = stack.pop()!;

      // If the current header is equal to the pathname, then the original
      // header should be within an expanded category.
      if (currentHeaderId === getPathname()) {
        return true;
      }

      // Traverse down the header tree.
      for (const childId of headers[currentHeaderId].children ?? []) {
        stack.push(childId);
      }
    }

    return false;
  }

  /**
   * Recursive render function used to render the table of contents list at
   * different levels. The function is recursive so that markup can be reused
   * for different levels of the list, and because the table of contents data
   * structure is deeply nested.
   *
   * @param headerId The header to render recursively.
   * @returns A fragment of list nodes.
   */
  function render(headerId: string) {
    // Grab header data.
    const header = headers[headerId];

    // Render children recursively.
    const children = headers[headerId].children?.map((childId) =>
      render(childId),
    );

    // Bool for if the URL point somewhere outside of napari.org.
    const isExternal = isExternalUrl(header.href);

    // Bool for if the header link matches the current page.
    const isActive = header.href === getPathname();

    // Bool for if the current category is expanded.
    const isExpanded =
      header.level === Header.Category && isCategoryExpanded(headerId);

    return (
      <Fragment key={headerId}>
        <li
          className={clsx(
            // Category list spacing.
            header.level === Header.Category && 'first:mt-0 mt-2 mb-2',

            // Sub-list black border.
            HEADER_TITLES.includes(header.level ?? 0) &&
              'border-l border-black',
          )}
        >
          <div
            className={clsx(
              'flex items-center',

              // Hover styles for items in the TOC.
              HEADER_TITLES.includes(header.level ?? 0) && [
                'border-l-4 hover:border-napari-hover py-1',
                isActive ? 'border-black' : 'border-transparent',
              ],

              header.level === Header.Title && 'pl-6',
              header.level === Header.Subtitle && 'pl-6',
            )}
          >
            <Link
              className={clsx(
                header.level === Header.Category && [
                  'text-base hover:font-bold',

                  // Render category bold if its currently expanded.
                  isExpanded && 'font-bold',
                ],

                header.level === Header.Title && [
                  'text-xs',

                  // Render link bold if there are sub-pages for this particular page.
                  (header.children?.length ?? 0) > 0 && 'font-bold',

                  // Render as semi-bold if there are no sub-pages and if it's
                  // the currently active page.
                  isActive &&
                    (header.children?.length ?? 0) === 0 &&
                    'font-semibold',
                ],

                header.level === Header.Subtitle && [
                  'text-sm',

                  // Render subtitle semibold if it's active.
                  isActive && 'font-semibold',
                ],
              )}
              href={header.href}
              // Open link in new tab if it's external.
              newTab={isExternal}
            >
              {header.text}
            </Link>

            {/* Render icon if the link is external.  */}
            {isExternal && (
              <ExternalLink className={clsx(styles.externalLink, 'ml-2')} />
            )}
          </div>
        </li>

        {/*
          The category list is collapsed by default, and is expanded when the
          user visits a page within the category.
        */}
        {header.level === Header.Category ? (
          <>
            {isExpanded && (
              // Render as list component and return a new sub-list.
              <Collapse component="li" in={isExpanded} unmountOnExit>
                <ul>{children}</ul>
              </Collapse>
            )}
          </>
        ) : (
          children
        )}
      </Fragment>
    );
  }

  // Render global TOC using root headers at the top of the list.
  return <ul>{rootHeaders.map((href) => render(href))}</ul>;
}
