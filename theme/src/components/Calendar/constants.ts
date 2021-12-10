import { CalendarType } from 'react-calendar';

import { FilterKey } from './types';

/**
 * Labels to render for a particular meeting type.
 */
export const FILTER_LABEL_BY_KEY: Record<FilterKey, string> = {
  community: 'community meetings',
  other: 'other meetings',
  workingGroup: 'working groups',
};

export const CALENDAR_TYPE_LOCALES: Partial<Record<CalendarType, string[]>> = {
  US: ['en', 'es', 'pt', 'ja', 'ps', 'zu'],
  Arabic: ['ar', 'dv', 'ps', 'fa'],
  Hebrew: ['he'],
};
