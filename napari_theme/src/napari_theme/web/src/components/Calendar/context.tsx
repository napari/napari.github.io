import dayjs from 'dayjs';
import { createContext, ReactNode, useContext } from 'react';
import { proxy } from 'valtio';
import { derive } from 'valtio/utils';

import { useConstant } from '@/hooks/useConstant';

import { CalendarEventMap, CalendarEventState, CalendarState } from './types';
import { useFetchCalendarEvents } from './useFetchCalendarEvents';
import { getEventMapKey } from './utils';

interface CalendarContextValue {
  calendarState: CalendarState;
  eventState: CalendarEventState;
}

const CalenderContext = createContext<CalendarContextValue | null>(null);

interface Props {
  children: ReactNode;
}

/**
 * Provider that shares global state within the Calendar component tree.
 */
export function CalendarProvider({ children }: Props) {
  const calendarState = useConstant(() =>
    proxy<CalendarState>({
      activeStartDate: dayjs(),
      filters: {
        community: true,
        other: true,
        workingGroup: true,
      },
      events: [],
    }),
  );

  const eventState = useConstant(() =>
    derive({
      events(get) {
        const { events, filters } = get(calendarState);
        const result: CalendarEventMap = {};

        for (const event of events) {
          const key = getEventMapKey(event.start);

          if (!result[key]) {
            result[key] = [];
          }

          if (filters[event.type]) {
            result[key]?.push(event);
          }
        }

        for (const [key, eventList] of Object.entries(result)) {
          if (eventList) {
            result[key] = eventList.sort((event1, event2) =>
              event1.start.diff(event2.start),
            );
          }
        }

        return result;
      },
    }),
  );

  // Fetch calendar events when the active month changes.
  useFetchCalendarEvents(calendarState);

  return (
    <CalenderContext.Provider
      value={{
        calendarState,
        eventState,
      }}
    >
      {children}
    </CalenderContext.Provider>
  );
}

/**
 * Hook for accessing the calendar state.
 */
export function useCalendar() {
  const value = useContext(CalenderContext);

  if (!value) {
    throw new Error('useCalender() may only be used in a <CalenderProvider />');
  }

  return value;
}
