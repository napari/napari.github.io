import { Media } from '@/components/media';

import { CalendarMonthView } from './CalendarMonthView';
import { CalendarNavigation } from './CalendarNavigation';
import { CalendarWeekView } from './CalendarWeekView';
import { CalendarFilter } from './CalenderFilter';
import { CalendarProvider } from './context';

/**
 * Component for showing napari Google Calendar events with controls for
 * filtering and copying events to the user's calendar.
 *
 * For screens smaller than 900px, a week view is rendered with events for the
 * current week. Otherwise, a month view is used.
 */
export function Calendar() {
  return (
    <CalendarProvider>
      <div className="border border-napari-light">
        <CalendarNavigation />

        <Media lessThan="screen-900">
          <CalendarNavigation week />
        </Media>

        <CalendarFilter />

        <Media greaterThanOrEqual="screen-900">
          <CalendarMonthView />
        </Media>

        <Media lessThan="screen-900">
          <CalendarWeekView />
        </Media>
      </div>
    </CalendarProvider>
  );
}
