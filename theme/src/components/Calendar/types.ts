import type { Dayjs } from 'dayjs';

export type MeetingType = 'community' | 'workingGroup' | 'other';

export interface CalendarEvent {
  description: string;
  end: Dayjs;
  location: string;
  start: Dayjs;
  title: string;
  type: MeetingType;
}

export type CalendarFilterState = {
  [key in MeetingType]: boolean;
};

export type FilterKey = keyof CalendarFilterState;

export interface CalendarState {
  activeStartDate: Dayjs;
  events: CalendarEvent[];
  filters: CalendarFilterState;
}

export type CalendarEventMap = Record<string, CalendarEvent[] | undefined>;

export interface CalendarEventState {
  events: CalendarEventMap;
}
