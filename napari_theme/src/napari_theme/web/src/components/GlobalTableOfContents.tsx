import { Collapse, Tooltip } from '@material-ui/core';
import clsx from 'clsx';
import { Fragment, useEffect, useRef, useState } from 'react';

import { ExternalLink } from '@/components/icons';
import { Link } from '@/components/Link';
import { Header } from '@/constants/toc';
import { TOCHeader } from '@/context/jupyterBook';
import { useCurrentPathname } from '@/hooks/useCurrentPathname';
import { isExternalUrl } from '@/utils/url';

interface Props {
  headers: Record<string, TOCHeader | undefined>;
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
  // Ref for the DOM node of the root unordered list element. This is
  // used to get the maximum width of the container, which is used for
  // determining if the current item overflows.
  const listRef = useRef<HTMLOListElement>(null);

  // Ref for the first DOM node that contains a list item. This node is used to
  // measure the left border and padding to determine if the current item
  // overflowed or not. Only one is needed because every item has the same left
  // border and padding values.
  const itemContainerRef = useRef<HTMLDivElement>();

  /// Ref for an array of DOM nodes that correspond to a TOC item.
  const itemsRef = useRef(new Map<string, HTMLElement>());

  // Set containing list of strings that can be used to determine if a tooltip is enabled.
  const [enabledTooltipSet, setEnabledTooltipSet] = useState(new Set<string>());

  // Next.js router path.
  const currentPathname = useCurrentPathname();

  // Effect that creates a new set of header IDs whose content is truncated so
  // that we can conditionally render content tooltips.
  useEffect(() => {
    const nextSet = new Set<string>();

    // Get left padding and border pixel values of the surrounding div container.
    const computedStyle =
      itemContainerRef.current &&
      window.getComputedStyle(itemContainerRef.current);
    const paddingLeft = parseFloat(computedStyle?.paddingLeft ?? '0');
    const borderLeft = parseFloat(computedStyle?.borderLeft ?? '0');

    for (const [headerId, node] of itemsRef.current.entries()) {
      // Total item is the node width + the parent container's left border and padding.
      const width = borderLeft + paddingLeft + node.offsetWidth;

      // Check if current node overflows the parent list node:
      // https://stackoverflow.com/a/10017343
      if (width > (listRef.current?.offsetWidth ?? 0)) {
        nextSet.add(headerId);
      }
    }

    // Update the enabled tooltip set state.
    setEnabledTooltipSet(nextSet);
  }, []);

  /**
   * Determines if a particular header is within an expanded column.
   *
   * @param headerId The header ID.
   * @returns True if the header ID is in a level 1 list that's expanded.
   */
  function isLevel1Expanded(headerId: string) {
    function isLevel1ExpandedHelper(currentHeaderId: string) {
      // If the current header is equal to the pathname, then the original
      // header should be within an expanded level 1 list.
      if (currentHeaderId === currentPathname) {
        return true;
      }

      // Traverse down the header tree.
      for (const childId of headers[currentHeaderId]?.children ?? []) {
        if (isLevel1ExpandedHelper(childId)) {
          return true;
        }
      }

      return false;
    }

    return isLevel1ExpandedHelper(headerId);
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

    // TODO Remove when better design is available for API reference page.
    const isApiReference =
      header &&
      headers['/api/stable/index.html']?.children?.includes(header.href);

    // TODO Uncomment when better design is available for API reference page.
    // const hasChildren = (header.children?.length ?? 0) > 0;

    // TODO Remove when better design is available for API reference page.
    const hasChildren = !isApiReference && (header?.children?.length ?? 0) > 0;
    const headerLevel = header?.level ?? 0;

    // Render children recursively.
    const children =
      hasChildren &&
      headers[headerId]?.children?.map((childId) => render(childId));

    // Bool for if the URL point somewhere outside of napari.org.
    const isExternal = header && isExternalUrl(header.href);

    // Bool for if the header link matches the current page.
    const isActive = header?.href === currentPathname;

    // Bool for if the current level 1 list is expanded.
    const isExpanded =
      headerLevel === Header.Level1 && isLevel1Expanded(headerId);

    /**
     * Helper for collecting the content nodes into an array of nodes ref.
     * @param element The element to store or delete if null.
     */
    function itemRefSetter(element: HTMLElement | null) {
      if (element) {
        itemsRef.current.set(headerId, element);
      } else {
        itemsRef.current.delete(headerId);
      }
    }

    const contentNode = (
      <span
        // Truncate really long nodes using an ellipsis.
        className="truncate overflow-ellipsis"
      >
        {header &&
          ([Header.Level1, Header.Level3].includes(headerLevel) ||
          !hasChildren ? (
            <Link href={header.href} newTab={isExternal} ref={itemRefSetter}>
              {header.text}
            </Link>
          ) : (
            <p ref={itemRefSetter}>{header.text}</p>
          ))}
      </span>
    );

    return (
      <Fragment key={headerId}>
        <li
          className={clsx(
            // Sub-list black border.
            HEADER_TITLES.includes(headerLevel) && 'border-l border-black py-1',
          )}
        >
          {/* Container for rendering the left border and adding padding to the titles. */}
          <div
            // Store first node we encounter as a ref. We only need one since we
            // only care about the border and padding sizes.
            ref={(el) => {
              if (
                headerLevel === Header.Level3 ||
                (headerLevel === Header.Level2 && !hasChildren)
              )
                if (el && !itemContainerRef.current) {
                  itemContainerRef.current = el;
                } else if (!el && itemContainerRef.current) {
                  itemContainerRef.current = undefined;
                }
            }}
            className={clsx(
              'flex items-center',

              // Hover styles for items in the TOC.
              HEADER_TITLES.includes(headerLevel) && 'border-l-4 py-1 pl-4',

              headerLevel === Header.Level1 && [
                'text-base',

                // Render category bold if its currently expanded.
                (isActive || isExpanded) && 'font-bold',
              ],

              headerLevel === Header.Level2 && [
                // Styles for if there are sub-pages for this particular page.
                hasChildren
                  ? 'text-xs font-bold uppercase tracking-widest'
                  : 'text-sm hover:border-napari-primary',

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
            {/* Use tooltip for truncated content only. */}
            {enabledTooltipSet.has(headerId) && header ? (
              <Tooltip
                arrow
                placement="right"
                classes={{
                  arrow: 'text-black',
                  tooltip: 'bg-black max-w-min',
                }}
                title={
                  <span className="text-sm whitespace-nowrap">
                    {header.text}
                  </span>
                }
              >
                {contentNode}
              </Tooltip>
            ) : (
              contentNode
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
  return (
    <ul className="space-y-4" ref={listRef}>
      {rootHeaders.map((href) => render(href))}
    </ul>
  );
}
