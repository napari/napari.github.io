import { Paper, Popper, PopperProps } from '@material-ui/core';
import clsx from 'clsx';
import { forwardRef, useState } from 'react';

import { PopupArrow } from '@/components/icons';

interface Props extends PopperProps {
  paperClassName?: string;
}

interface PopperEvent {
  flipped: boolean;
}

/**
 * Component for rendering popups. This includes an arrow that centers around
 * the anchor element.
 */
export const Popup = forwardRef<HTMLDivElement, Props>(
  ({ children, paperClassName, ...props }, ref) => {
    // State to flip the popup arrow if the popper state is flipped.
    const [flipped, setFlipped] = useState(false);

    return (
      <Popper
        {...props}
        ref={ref}
        popperOptions={{
          onUpdate(data: PopperEvent) {
            if (flipped !== data.flipped) {
              setFlipped(data.flipped);
            }
          },
        }}
      >
        <div className="flex flex-col items-center">
          {flipped && <PopupArrow className="z-10 " />}

          <Paper
            className={clsx(
              paperClassName,
              'border border-napari-gray -mt-px',
              flipped ? '-mt-px' : '-mb-px',
            )}
          >
            {children}
          </Paper>

          {!flipped && <PopupArrow className="z-10 rotate-180" />}
        </div>
      </Popper>
    );
  },
);
