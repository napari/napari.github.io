/* eslint-disable no-param-reassign */

import { useEffect } from 'react';
import { usePrevious } from 'react-use';
import { useSnapshot } from 'valtio';

import { fetchEvents, maybeLoadCalendarAPI } from './gapi';
import { CalendarState } from './types';

/**
 * Effect for fetching the calendar event state when the user changes the
 * current month.
 *
 * @param calendarState The shard calendar state.
 */
export function useFetchCalendarEvents(calendarState: CalendarState): void {
  const { activeStartDate } = useSnapshot(calendarState);
  const prevActiveStartDate = usePrevious(activeStartDate);

  useEffect(() => {
    async function fetchCalendarEventsAsync() {
      // Skip fetching if the active start date is within the same month as the
      // previous start date. This is to prevent excessive calls to the API when
      // using the week view on smaller screens.
      if (
        prevActiveStartDate &&
        activeStartDate.isSame(prevActiveStartDate, 'month')
      ) {
        return;
      }

      // Clear events before fetching data
      calendarState.events = [];

      await maybeLoadCalendarAPI(process.env.GOOGLE_CALENDAR_API_KEY ?? '');

      calendarState.events = await fetchEvents(
        process.env.GOOGLE_CALENDAR_ID ?? '',
        activeStartDate,
      );
    }

    // Wrapper without `async` so that we can call it like a normal function
    // without TypeScript and ESLint complaining.
    function fetchCalendarEvents() {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchCalendarEventsAsync();
    }

    // Fetch events on initial load.
    fetchCalendarEvents();
  }, [activeStartDate, calendarState, prevActiveStartDate]);
}
