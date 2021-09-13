import { Grow, GrowProps, IconButton, Popover } from '@material-ui/core';
import clsx from 'clsx';

import { Close } from '@/components/icons';
import { Link } from '@/components/Link';
import { LinkInfo } from '@/types';

import styles from './MenuPopover.module.scss';

/**
 * Transition component that renders the Grow transition, but with different
 * animation durations so that the closing animation finishes faster than the
 * opening animation.
 *
 * https://material.io/design/motion/speed.html#duration
 */
function MenuGrow({ in: inProp, ...props }: Omit<GrowProps, 'timeout'>) {
  return (
    <Grow
      in={inProp}
      {...props}
      {...(inProp ? { timeout: 250 } : { timeout: 200 })}
    />
  );
}

interface Props {
  anchorEl: HTMLElement | null;
  items: LinkInfo[];
  onClose: () => void;
  visible: boolean;
}

/**
 * Popover menu for rendering a list of links.
 */
export function MenuPopover({ anchorEl, items, onClose, visible }: Props) {
  return (
    <Popover
      anchorEl={anchorEl}
      className="flex flex-row-reverse"
      classes={{
        paper: clsx(
          styles.menuPopover,
          'bg-black static flex flex-row',
          'p-6 h-[min-content] max-w-[325px]',
        ),
      }}
      onClose={onClose}
      open={visible}
      data-testid="menu"
      TransitionComponent={MenuGrow}
    >
      <ul className="text-white flex-grow">
        {items.map((item) => (
          <li
            className="flex items-center mb-5 last:m-0"
            key={item.title}
            data-testid="menuItem"
          >
            <Link
              className="mr-1"
              href={item.link}
              newTab={item.newTab}
              onClick={onClose}
            >
              {item.title}
            </Link>

            {item.icon}
          </li>
        ))}
      </ul>

      <IconButton
        className="self-start p-0"
        data-testid="menuClose"
        onClick={onClose}
      >
        <Close />
      </IconButton>
    </Popover>
  );
}
