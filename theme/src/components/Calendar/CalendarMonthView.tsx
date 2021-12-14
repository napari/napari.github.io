import clsx from 'clsx';
import dayjs from 'dayjs';
import ReactCalendar, { CalendarType } from 'react-calendar';
import { useSnapshot } from 'valtio';

import { useIsFeatureFlagEnabled } from '@/utils/featureFlags';

import { CalendarTile } from './CalendarTile';
import { CALENDAR_TYPE_LOCALES } from './constants';
import { useCalendar } from './context';

function getCalendarType(): CalendarType {
  const locale = navigator.language;

  for (const [key, locales] of Object.entries(CALENDAR_TYPE_LOCALES)) {
    if (locales.find((includeLocale) => locale.includes(includeLocale))) {
      return key as CalendarType;
    }
  }

  return 'ISO 8601';
}

/**
 * Calendar component that shows napari events for the current month.
 */
export function CalendarMonthView() {
  const { calendarState } = useCalendar();
  const snap = useSnapshot(calendarState);
  const is18nEnabled = useIsFeatureFlagEnabled('calendari18n');

  return (
    <ReactCalendar
      calendarType={is18nEnabled ? getCalendarType() : 'US'}
      locale={is18nEnabled ? undefined : 'en-US'}
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
