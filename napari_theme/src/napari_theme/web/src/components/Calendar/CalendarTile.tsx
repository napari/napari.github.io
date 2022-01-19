import dayjs from 'dayjs';
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useSnapshot } from 'valtio';

import { CalendarEventButton } from './CalendarEventButton';
import { useCalendar } from './context';
import { getEventMapKey } from './utils';

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
  const tileRef = useRef<HTMLDivElement>(null);
  const [tileWidth, setTileWidth] = useState(0);

  useEffect(() => {
    function setWidth() {
      const { width = 0 } =
        tileRef.current?.parentElement?.getBoundingClientRect() ?? {};
      setTileWidth(width);
    }

    setWidth();
    const debouncedSetWidth = debounce(setWidth, 100);

    window.addEventListener('resize', debouncedSetWidth);
    return () => window.removeEventListener('resize', debouncedSetWidth);
  }, []);

  // Effect to disable tabbing on the tile buttons. Since we can't customize the
  // button component used for the tiles, we need to modify the DOM attribute
  // directly.
  useEffect(() => {
    tileRef.current?.parentElement?.setAttribute('tabindex', '-1');
  }, []);

  return (
    <div className="flex overflow-y-auto overflow-x-hidden" ref={tileRef}>
      <ul className="flex flex-col space-y-1 m-0">
        {eventList.map((event) => (
          <CalendarEventButton
            date={dayjs(event.start)}
            event={event}
            width={tileWidth}
          />
        ))}
      </ul>
    </div>
  );
}
