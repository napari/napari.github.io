import clsx from 'clsx';
import { useState } from 'react';

import { ExternalLink, Menu, NapariLogo } from '@/components/icons';
import { Link } from '@/components/Link';
import { Media } from '@/components/media';
import { MenuDrawer } from '@/components/MenuDrawer';
import { SearchInput } from '@/components/SearchInput';
import { useJupyterBookData } from '@/context/jupyterBook';
import { LinkInfo } from '@/types';

/**
 * Checks if the string is an external link. This works by using the value to
 * create a URL object. URL objects will throw errors for relative URLs if a
 * base URL isn't provided, so an error will indicate that the URL is an absolute URL.
 *
 * One limitation with this is it only checks for absolute URLs since Jupyter
 * Book uses relative URLs for the TOC. If an absolute URL is used that has the
 * same host, it'll be treated as an external URL, but so far there are no use cases.
 *
 * @param url The string to check.
 * @returns True if the string is an external URL, false if relative.
 */
function isExternalLink(url: string) {
  try {
    return url !== '#' && !!new URL(url);
  } catch (_) {
    return false;
  }
}

/**
 * App bar component that renders the home link, search bar, and menu.
 */
export function AppBar() {
  const [visible, setVisible] = useState(false);
  const { globalHeaders, rootGlobalHeaders } = useJupyterBookData();

  const links: LinkInfo[] = rootGlobalHeaders.map((header) => {
    const { href, text } = globalHeaders[header];
    const isExternal = isExternalLink(href);

    return {
      link: href,
      title: text,
      icon: isExternal && <ExternalLink />,
      newTab: isExternal,
    };
  });

  return (
    <>
      <Media lessThan="screen-1150">
        <MenuDrawer
          items={links}
          onClose={() => setVisible(false)}
          onOpen={() => setVisible(true)}
          visible={visible}
        />
      </Media>

      <header
        className={clsx(
          // Color and height
          'bg-napari-primary h-napari-app-bar',

          // Centering
          'justify-center items-center',

          // Padding
          'px-6 screen-495:px-12',

          'grid grid-cols-3',
          'screen-1150:grid-cols-4 screen-1425:grid-cols-napari-5',
          'justify-center gap-6 screen-495:gap-12',
        )}
      >
        <nav className="flex items-center">
          <Link href="/" className="inline-flex items-center">
            <NapariLogo className="w-4 h-4 screen-875:w-6 screen-875:h-6 mr-1" />
            <span className="font-bold">napari</span>
          </Link>
        </nav>

        <div
          className={clsx(
            // Flex layout
            'flex items-center',

            // Take 100% of width.
            'w-full',

            // Align container to the right of the grid cell
            'justify-self-end',

            // Use more columns on larger screens
            'col-span-2 screen-1150:col-span-3',
          )}
        >
          <SearchInput />

          {/* Menu button */}
          <Media lessThan="screen-1150">
            <button
              // Show menu button on smaller layouts
              className="ml-6 flex lg:hidden"
              onClick={() => setVisible(true)}
              type="button"
            >
              <Menu alt="Icon for opening side menu." />
            </button>
          </Media>
        </div>
      </header>
    </>
  );
}
