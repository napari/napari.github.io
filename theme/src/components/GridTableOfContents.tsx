import clsx from 'clsx';

import { ExternalLink } from '@/components/icons';
import { Link } from '@/components/Link';
import { useJupyterBookData } from '@/context/jupyterBook';
import { isExternalUrl } from '@/utils/url';

/**
 * Renders a grid of table of content items with descriptions. The `gridTOC`
 * frontmatter configuration is used for rendering the grid TOC.
 */
export function GridTableOfContents() {
  const {
    pageFrontMatter: { gridTOC },
  } = useJupyterBookData();

  if (!gridTOC) {
    return null;
  }

  return (
    <ul
      className={clsx(
        'grid gap-x-6 gap-y-12 justify-center',
        'grid-cols-3 screen-875:grid-cols-5',
      )}
    >
      {gridTOC.map((item) => {
        const isExternal = isExternalUrl(item.url);

        return (
          <li key={item.url}>
            {/* Title and icon container */}
            <div className="flex items-center">
              <Link
                className="underline font-semibold text-[17px]"
                href={item.url}
                newTab={isExternal}
              >
                {item.title}
              </Link>

              {isExternal && (
                <ExternalLink className="ml-2 w-3 h-3" color="#000" />
              )}
            </div>

            {/* Grid TOC item content */}
            <p className="text-sm mt-4">{item.content}</p>
          </li>
        );
      })}
    </ul>
  );
}
