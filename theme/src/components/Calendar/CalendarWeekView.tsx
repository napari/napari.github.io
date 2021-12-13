import clsx from 'clsx';
import dayjs from 'dayjs';
import { ReactNode } from 'react';
import { useSnapshot } from 'valtio';

import styles from './Calendar.module.scss';
import { CalendarEventButton } from './CalendarEventButton';
import { useCalendar } from './context';
import { CalendarEvent } from './types';
import { getEventMapKey } from './utils';

interface CalendarDayListProps {
  date: dayjs.Dayjs;
  events: CalendarEvent[];
}

/**
 * Helper component for rendering all events for a specific day as a list.
 */
function CalendarDayList({ date, events }: CalendarDayListProps) {
  if (events.length === 0) {
    return null;
  }

  return (
    <div className={clsx('flex px-4', styles.dayList)}>
      <div className="flex flex-col items-center leading-7">
        <span className="font-bold uppercase">{date.format('ddd')}</span>
        <span
          className={clsx(
            'flex items-center justify-center',
            'w-6 h-6 font-bold',

            date.isSame(dayjs(), 'week') && [
              date.isSame(dayjs(), 'day')
                ? 'bg-napari-primary rounded-full'
                : 'bg-black text-white',
            ],
          )}
        >
          {date.format('DD')}
        </span>
      </div>

      <ul className="my-6 space-y-1">
        {events.map((event) => (
          <CalendarEventButton
            date={event.start}
            event={event}
            key={event.title}
          />
        ))}
      </ul>
    </div>
  );
}

/**
 * Calendar component that shows napari events for the current week.
 */
export function CalendarWeekView() {
  const { calendarState, eventState } = useCalendar();
  const { activeStartDate } = useSnapshot(calendarState);
  const { events } = useSnapshot(eventState);

  const firstDayOfWeek = activeStartDate.startOf('week');
  const lastDayOfWeek = activeStartDate.endOf('week');

  const dayNodes: ReactNode[] = [];

  for (
    let currentDay = firstDayOfWeek;
    currentDay.isSameOrBefore(lastDayOfWeek, 'day');
    currentDay = currentDay.add(1, 'day')
  ) {
    dayNodes.push(
      <CalendarDayList
        date={currentDay}
        events={events[getEventMapKey(currentDay)] ?? []}
      />,
    );
  }

  return <div className="flex flex-col">{dayNodes}</div>;
}
