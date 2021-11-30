import {
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@material-ui/core';
import clsx from 'clsx';
import { ReactNode, useRef, useState } from 'react';
import { useClickAway } from 'react-use';

import { Download } from '@/components/icons';
import { Link } from '@/components/Link';
import { useJupyterBookData } from '@/context/jupyterBook';

import styles from './DownloadButton.module.scss';

interface Props {
  className?: string;
}

/**
 * Helper component for conditionally rendering a MenuItem that is a link.
 */
function MenuItemLink({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <>
      {href && (
        <MenuItem component={Link} href={href}>
          {children}
        </MenuItem>
      )}
    </>
  );
}

/**
 * Button for rendering a dropdown of download links for the current page in
 * different formats.
 */
export function DownloadButton({ className }: Props) {
  const { mdSource, ipynbSource } = useJupyterBookData();
  const [open, setOpen] = useState(false);
  const anchorElRef = useRef<HTMLButtonElement>(null);
  const paperElRef = useRef<HTMLDivElement>(null);

  // Close menu if the user clicks outside of the menu.
  useClickAway(paperElRef, () => setOpen(false));

  return (
    <IconButton
      className={clsx(
        'rounded-none hover:bg-transparent',
        styles.downloadButton,
        open && styles.open,
        className,
      )}
      ref={anchorElRef}
      onClick={() => setOpen((prev) => !prev)}
    >
      <Download />

      <Popper open={open} anchorEl={anchorElRef.current}>
        <Paper
          className={clsx('border-2 border-napari-gray', styles.menu)}
          ref={paperElRef}
        >
          <MenuList>
            <MenuItemLink href={ipynbSource}>.ipynb</MenuItemLink>

            <MenuItemLink href={mdSource}>.md</MenuItemLink>

            <MenuItem onClick={() => window.print()}>.pdf</MenuItem>
          </MenuList>
        </Paper>
      </Popper>
    </IconButton>
  );
}
