import dayjs from 'dayjs';
import { useSnapshot } from 'valtio';

import { useCalendar } from './context';
import { formatEventTime, getEventMapKey } from './utils';

interface Props {
  date: dayjs.Dayjs;
}

/**
 * Component that renders the content of a calendar tile for a specific day.
 * Events for a particular day are rendered as a list sorted by time.
 */
export function CalendarTile({ date }: Props) {
  const { eventState } = useCalendar();
  const { events } = useSnapshot(eventState);
  const eventList = events[getEventMapKey(date)] ?? [];

  return (
    <div className="flex overflow-y-auto">
      <ul className="flex flex-col space-y-1 m-0">
        {eventList.map((event) => {
          const eventDate = dayjs(event.date);

          return (
            <li>
              <button
                className="flex space-x-1 bg-napari-light"
                onClick={(clickEvent) => {
                  clickEvent.preventDefault();
                  alert('TODO add popup');
                }}
                type="button"
              >
                <div className="ml-1 flex space-x-1">
                  <span className="font-semibold">
                    {formatEventTime(eventDate)}
                  </span>

                  <span className="overflow-ellipsis flex-nowrap">
                    {event.title}
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
