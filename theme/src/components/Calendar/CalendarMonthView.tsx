import clsx from 'clsx';
import dayjs from 'dayjs';
import ReactCalendar from 'react-calendar';
import { useSnapshot } from 'valtio';

import { CalendarTile } from './CalendarTile';
import { useCalendar } from './context';

/**
 * Calendar component that shows napari events for the current month.
 */
export function CalendarMonthView() {
  const { calendarState } = useCalendar();
  const snap = useSnapshot(calendarState);

  return (
    <ReactCalendar
      calendarType="US"
      activeStartDate={snap.activeStartDate.toDate()}
      showNavigation={false}
      tileClassName={({ date: dateValue }) => {
        const date = dayjs(dateValue);
        const now = dayjs();

        return clsx(
          date.isSame(now, 'week') && [
            'active-week',

            date.isSame(now, 'day') && 'active-day',
          ],
        );
      }}
      // Need to pass nested component so that it's rendered within the
      // CalendarProvider component.
      tileContent={({ date }) => <CalendarTile date={dayjs(date)} />}
      view="month"
    />
  );
}
