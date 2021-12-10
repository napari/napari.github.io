import { IconButton } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { useSnapshot } from 'valtio';

import { useCalendar } from './context';

/**
 * Component that shows the current month and year, and buttons to go the
 * previous / next month.
 */
export function CalendarNavigation() {
  const { calendarState } = useCalendar();
  const { activeStartDate } = useSnapshot(calendarState);

  return (
    <nav className="bg-napari-primary flex items-center justify-between">
      <IconButton
        onClick={() => {
          calendarState.activeStartDate = activeStartDate.subtract(1, 'month');
        }}
      >
        <ChevronLeft className="text-black" />
      </IconButton>

      <span className="font-bold text-3xl">
        {activeStartDate.format('MMMM YYYY')}
      </span>

      <IconButton
        onClick={() => {
          calendarState.activeStartDate = activeStartDate.add(1, 'month');
        }}
      >
        <ChevronRight className="text-black" />
      </IconButton>
    </nav>
  );
}
