import clsx from 'clsx';
import { useState } from 'react';

import { Menu, NapariLogo } from '@/components/icons';
import { Link } from '@/components/Link';
import { Media } from '@/components/media';
import { MenuDrawer } from '@/components/MenuDrawer';
import { SearchInput } from '@/components/SearchInput';

/**
 * App bar component that renders the home link, search bar, and menu.
 */
export function AppBar() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Media lessThan="screen-1150">
        <MenuDrawer
          items={[]}
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
