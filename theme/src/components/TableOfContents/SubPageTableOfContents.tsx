import clsx from 'clsx';
import slug from 'slug';

import { Link } from '@/components/Link';
import { Header } from '@/constants/toc';
import { useJupyterBookData } from '@/context/jupyterBook';

interface Props {
  /**
   * CSS classes to apply to the root element.
   */
  className?: string;

  /**
   * ID of the header to render.
   */
  headerId: string;
}

/**
 * Component for rendering the in page table of contents for Sub Page TOC pages.
 * If the item has children, a sub-header and sub-list will be rendered instead
 * of a list item.
 */
export function SubPageTableOfContents({ className, headerId }: Props) {
  const { globalHeaders } = useJupyterBookData();
  const childIds = globalHeaders[headerId].children;

  return (
    <ul className={className}>
      {childIds?.map((childId) => {
        const header = globalHeaders[childId];

        // TODO Remove when better design is available for API reference page.
        const isApiReference = globalHeaders[
          '/api/stable/index.html'
        ].children?.includes(header.href);

        const hasChildren = (header.children?.length ?? 0) > 0;

        return (
          <li
            // className={clsx(!hasChildren && 'list-disc list-inside my-2')}
            // TODO Remove when better design is available for API reference page.
            className={clsx(
              (isApiReference || !hasChildren) && 'list-disc list-inside my-2',
            )}
            key={childId}
          >
            {(header.level ?? 0) < Header.Level3 && hasChildren ? (
              // Render sub-header and sub-list for items with children. This
              // will only work for level 2 headers.
              <>
                {/* TODO Uncomment when better design is available for API reference page.  */}
                {/* <h2 id={slug(header.text)} className="text-2xl font-bold mt-10">
                  {header.text}
                </h2> */}

                {/* TODO Remove when better design is available for API reference page.  */}
                {isApiReference ? (
                  <Link className="underline" href={header.href}>
                    {header.text}
                  </Link>
                ) : (
                  <h2
                    id={slug(header.text)}
                    className="text-2xl font-bold mt-10"
                  >
                    {header.text}
                  </h2>
                )}

                <SubPageTableOfContents
                  // TODO Remove when better design is available for API reference page.
                  className={clsx(isApiReference && 'ml-6')}
                  headerId={childId}
                />
              </>
            ) : (
              // Render as link for regular items.
              <Link className="underline" href={header.href}>
                {header.text}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
