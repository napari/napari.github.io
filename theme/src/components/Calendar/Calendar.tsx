import { Media } from '@/components/media';

import { CalendarFooter } from './CalendarFooter';
import { CalendarMonthView } from './CalendarMonthView';
import { CalendarNavigation } from './CalendarNavigation';
import { CalendarWeekView } from './CalendarWeekView';
import { CalendarFilter } from './CalenderFilter';
import { CalendarProvider } from './context';
import { CopyCalendarButton } from './CopyCalendarButton';

export interface Props {
  fullWidth?: boolean;
}

/**
 * Component for showing napari Google Calendar events with controls for
 * filtering and copying events to the user's calendar.
 *
 * For screens smaller than 900px, a week view is rendered with events for the
 * current week. Otherwise, a month view is used.
 */
export function Calendar({ fullWidth }: Props) {
  return (
    <div className="flex flex-col flex-1 items-stretch">
      <CalendarProvider>
        <div>
          <CopyCalendarButton
            href={`https://calendar.google.com/calendar/u/0/r?cid=${
              process.env.GOOGLE_CALENDAR_ID ?? ''
            }`}
          >
            Copy to calendar
          </CopyCalendarButton>
        </div>

        <div className="flex flex-col flex-1 items-stretch border border-napari-light">
          <CalendarNavigation />

          <Media lessThan="screen-900">
            <CalendarNavigation week />
          </Media>

          <CalendarFilter />

          <Media
            className="flex flex-col flex-1 items-stretch"
            greaterThanOrEqual="screen-900"
          >
            <CalendarMonthView fullWidth={fullWidth} />
          </Media>

          <Media lessThan="screen-900">
            <CalendarWeekView />
          </Media>

          <CalendarFooter />
        </div>
      </CalendarProvider>
    </div>
  );
}
