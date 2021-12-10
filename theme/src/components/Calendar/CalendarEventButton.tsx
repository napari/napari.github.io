import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';

import { CalendarEventPopup } from './CalendarEventPopup';
import {} from './context';
import { CalendarEvent } from './types';
import { formatEventTime } from './utils';

interface Props {
  date: dayjs.Dayjs;
  event: CalendarEvent;
  width?: number;
}

/**
 * Component for rendering the event time and title as a button that shows a
 * popup with more information about the calendar event.
 */
export function CalendarEventButton({ date, event, width }: Props) {
  const [popupOpen, setPopupOpen] = useState(false);
  const eventButtonRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useClickAway(popupRef, () => setPopupOpen(false));

  return (
    <li style={{ width }}>
      <CalendarEventPopup
        anchorEl={eventButtonRef.current}
        event={event}
        open={popupOpen}
        ref={popupRef}
      />

      <button
        className="flex space-x-1 screen-900:bg-napari-light"
        style={{ width }}
        onClick={(clickEvent) => {
          clickEvent.preventDefault();
          setPopupOpen(true);
        }}
        type="button"
        ref={eventButtonRef}
      >
        <div className="ml-1 flex space-x-1">
          <span className="font-semibold">{formatEventTime(date)}</span>

          <span className="overflow-ellipsis flex-nowrap">{event.title}</span>
        </div>
      </button>
    </li>
  );
}
