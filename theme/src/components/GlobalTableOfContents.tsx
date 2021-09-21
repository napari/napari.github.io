import { Collapse } from '@material-ui/core';
import clsx from 'clsx';
import { Fragment } from 'react';

import { ExternalLink } from '@/components/icons';
import { Link } from '@/components/Link';
import { Header } from '@/constants/toc';
import { TOCHeader } from '@/context/jupyterBook';
import { useCurrentPathname } from '@/hooks/useCurrentPathname';
import { isExternalUrl } from '@/utils/url';

interface Props {
  headers: Record<string, TOCHeader>;
  rootHeaders: string[];
}

/**
 * Constant for applying styles to the title headers.
 */
const HEADER_TITLES = [Header.Level2, Header.Level3];

/**
 * Component for rendering the global table of contents list. This uses a
 * recursive render function to render the global TOC data structure since the
 * data is deeply nested.
 */
export function GlobalTableOfContents({ headers, rootHeaders }: Props) {
  const currentPathname = useCurrentPathname();

  /**
   * Determines if a particular header is within an expanded column.
   *
   * @param headerId The header ID.
   * @returns True if the header ID is in a level 1 list that's expanded.
   */
  function isLevel1Expanded(headerId: string) {
    // Use DFS to check if the header ID is in an expanded level 1 list.
    const stack = [headerId];
    const rootHeaderSet = new Set(rootHeaders);

    while (stack.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const currentHeaderId = stack.pop()!;

      // If the current header is equal to the pathname, then the original
      // header should be within an expanded level 1 list.
      if (
        currentHeaderId === currentPathname &&
        !rootHeaderSet.has(currentHeaderId)
      ) {
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
    const hasChildren = (header.children?.length ?? 0) > 0;
    const headerLevel = header.level ?? 0;

    // Render children recursively.
    const children = headers[headerId].children?.map((childId) =>
      render(childId),
    );

    // Bool for if the URL point somewhere outside of napari.org.
    const isExternal = isExternalUrl(header.href);

    // Bool for if the header link matches the current page.
    const isActive = header.href === currentPathname;

    // Bool for if the current level 1 list is expanded.
    const isExpanded =
      headerLevel === Header.Level1 && isLevel1Expanded(headerId);

    return (
      <Fragment key={headerId}>
        <li
          className={clsx(
            // Level 1 list spacing.
            headerLevel === Header.Level1 && 'first:mt-0 mt-2 mb-2',

            // Sub-list black border.
            HEADER_TITLES.includes(headerLevel) && 'border-l border-black py-1',
          )}
        >
          {/* Container for rendering the left border and adding padding to the titles. */}
          <div
            className={clsx(
              'flex items-center',

              // Hover styles for items in the TOC.
              HEADER_TITLES.includes(headerLevel) && 'border-l-4 py-1 pl-4',

              headerLevel === Header.Level1 && [
                'text-base hover:font-bold',

                // Render category bold if its currently expanded.
                (isActive || isExpanded) && 'font-bold',
              ],

              headerLevel === Header.Level2 && [
                'text-xs',

                // Styles for if there are sub-pages for this particular page.
                hasChildren && 'font-bold uppercase tracking-widest',

                // Highlight active items with semi-bold and a black border, but
                // only if there are no level 3 items.
                isActive && !hasChildren
                  ? 'font-semibold border-black'
                  : 'border-transparent',
              ],

              headerLevel === Header.Level3 && [
                'text-sm hover:border-napari-primary',

                // Highlight active items with semi-bold and a black border.
                isActive ? 'font-semibold border-black' : 'border-transparent',
              ],
            )}
          >
            {[Header.Level1, Header.Level3].includes(headerLevel) ||
            !hasChildren ? (
              <Link href={header.href} newTab={isExternal}>
                {header.text}
              </Link>
            ) : (
              <p>{header.text}</p>
            )}

            {/* Render icon if the link is external.  */}
            {isExternal && (
              <ExternalLink className="ml-2 w-3 h-3" color="#000" />
            )}
          </div>
        </li>

        {/*
          The category list is collapsed by default, and is expanded when the
          user visits a page within the category.
        */}
        {headerLevel === Header.Level1 ? (
          // Render as list component and return a new sub-list.
          <Collapse component="li" in={isExpanded} unmountOnExit>
            <ul>{children}</ul>
          </Collapse>
        ) : (
          children
        )}
      </Fragment>
    );
  }

  // Render global TOC using root headers at the top of the list.
  return <ul>{rootHeaders.map((href) => render(href))}</ul>;
}
