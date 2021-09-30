import clsx from 'clsx';

import { TOCHeader } from '@/context/jupyterBook';

import { useActiveHeader } from './TableOfContents.hooks';

interface Props {
  /**
   * className: additional classes to apply to this component
   */
  className?: string;

  /**
   * headers: header ids and titles to link to
   */
  headers: TOCHeader[];

  /**
   * free: whether the component should move with the page or be fixed in place
   */
  free?: boolean;

  /**
   * Active header that should be highlighted. This will completely disable the
   * highlight on scroll effect. Setting this to an empty value will disable
   * highlighting completely.
   */
  active?: string;
}

/**
 * Duration to wait for before re-enabling the TOC event handlers.
 */
const ENABLE_EVENT_HANDLERS_TIMEOUT_MS = 100;

/**
 * Helper for scrolling to the selected header. By default, the browser will
 * scroll to the heading when the hash values is changed. However, if the hash
 * is already set to the same value, the browser will not scroll to the heading.
 * Because of this, we'l need to manually scroll to the heading when the hash
 * values are the same.
 *
 * @param header The header to scroll to.
 */
function scrollToHeading(header: TOCHeader) {
  if (window.location.hash === header.href) {
    const headerNode = document.getElementById(header.href.replace(/^#/, ''));
    const alignToTop = true;
    headerNode?.scrollIntoView(alignToTop);
  } else {
    window.location.hash = header.href;
  }
}

/**
 * Component for rendering TOC from the given headers. Highlighting will
 * only work if the headers match those present on the page.
 */
export function TableOfContents({ active, className, headers, free }: Props) {
  const enabled = active === undefined;
  const {
    activeHeader,
    setActiveHeader,
    enableEventHandlers,
    disableEventHandlers,
  } = useActiveHeader({ enabled, headers });

  return (
    <ul
      className={clsx(
        className,
        'flex flex-col',
        'border-l border-black',
        !free && 'sticky top-12',
      )}
    >
      {headers.map((header) => {
        const isActive = header.href === activeHeader;

        return (
          <li
            className={clsx(
              // Layout
              'flex',
              // 'flex items-center',

              // Box model
              'pl-6 border-l-4',

              // Ensure height is at least 25px, but also allow scaling for
              // multiline items.
              'min-h-6 h-auto',

              // Apply top/bottom margins except for first/last items
              'my-2 first:mt-0 last:mb-0',

              // Smooth transition for border color
              'transition-colors',

              'hover:border-napari-primary',
              'border-transparent',
              isActive && 'screen-1425:border-black',
            )}
            key={header.href}
            data-active={isActive}
            data-testid="tocItem"
          >
            {/*
              Use normal link component instead of Next.js Link because we're
              not loading another page.
            */}
            <a
              className={clsx(isActive && 'screen-1425:font-bold')}
              href={header.href}
              onClick={(event) => {
                event.preventDefault();

                // If highlighting is disabled, only handle scrolling to the header.
                if (!enabled) {
                  scrollToHeading(header);
                  return;
                }

                // The event handlers are disabled here because we want to set
                // the active header AND scroll to the header. If the handlers
                // aren't disabled, then the handlers and the below
                // `setActiveHeader()` will have a race condition.
                disableEventHandlers();

                scrollToHeading(header);
                setActiveHeader(header.href);

                // Wrap in timeout so that the browser has time to scroll the
                // header. If we don't wrap it in a timeout, then setting the
                // hash will fire a scroll event and overwrite the active
                // header.
                setTimeout(
                  () => enableEventHandlers(),
                  ENABLE_EVENT_HANDLERS_TIMEOUT_MS,
                );
              }}
            >
              {header.text}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
