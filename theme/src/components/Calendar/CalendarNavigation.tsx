import { IconButton } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import clsx from 'clsx';
import { useSnapshot } from 'valtio';

import { useCalendar } from './context';

interface Props {
  week?: boolean;
}

/**
 * Component that shows the current month and year, and buttons to go the
 * previous / next month.
 */
export function CalendarNavigation({ week: isWeekView }: Props) {
  const { calendarState } = useCalendar();
  const { activeStartDate } = useSnapshot(calendarState);
  const unitType = isWeekView ? 'week' : 'month';

  return (
    <nav
      className={clsx(
        'flex items-center justify-between',
        isWeekView ? 'bg-napari-light' : 'bg-napari-primary',
      )}
    >
      <IconButton
        onClick={() => {
          calendarState.activeStartDate = activeStartDate.subtract(1, unitType);
        }}
      >
        <ChevronLeft className="text-black" />
      </IconButton>

      <span
        className={clsx('font-bold', isWeekView ? 'text-base' : 'text-3xl')}
      >
        {isWeekView
          ? [
              activeStartDate.startOf('week').format('MMM DD'),
              activeStartDate.endOf('week').format('MMM DD'),
            ].join(' - ')
          : activeStartDate.format('MMMM YYYY')}
      </span>

      <IconButton
        onClick={() => {
          calendarState.activeStartDate = activeStartDate.add(1, unitType);
        }}
      >
        <ChevronRight className="text-black" />
      </IconButton>
    </nav>
  );
}
