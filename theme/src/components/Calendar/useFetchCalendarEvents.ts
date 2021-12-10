/* eslint-disable no-param-reassign */

import { useEffect } from 'react';
import { snapshot } from 'valtio';
import { subscribeKey } from 'valtio/utils';

import { fetchEvents, maybeLoadCalendarAPI } from './gapi';
import { CalendarState } from './types';

/**
 * Effect for fetching the calendar event state when the user changes the
 * current month.
 *
 * @param calendarState The shard calendar state.
 */
export function useFetchCalendarEvents(calendarState: CalendarState): void {
  useEffect(() => {
    async function fetchCalendarEventsAsync() {
      // Clear events before fetching data
      calendarState.events = [];

      await maybeLoadCalendarAPI(process.env.GOOGLE_CALENDAR_API_KEY ?? '');

      const { activeStartDate } = snapshot(calendarState);
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

    // Fetch events if the active start date changes.
    return subscribeKey(calendarState, 'activeStartDate', fetchCalendarEvents);
  }, [calendarState]);
}
