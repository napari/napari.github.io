import clsx from 'clsx';
import dayjs from 'dayjs';
import ReactCalendar from 'react-calendar';
import { useSnapshot } from 'valtio';

import { CalendarNavigation } from './CalendarNavigation';
import { CalendarTile } from './CalendarTile';
import { CalendarFilter } from './CalenderFilter';
import { CalendarProvider, useCalendar } from './context';

/**
 * Wrapper component over `react-calendar`.
 */
function CalendarWrapper() {
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

/**
 * Component for showing napari Google Calendar events with controls for
 * filtering and copying events to the user's calendar.
 */
export function Calendar() {
  return (
    <CalendarProvider>
      <div className="border border-napari-light">
        <CalendarNavigation />
        <CalendarFilter />
        <CalendarWrapper />
      </div>
    </CalendarProvider>
  );
}
