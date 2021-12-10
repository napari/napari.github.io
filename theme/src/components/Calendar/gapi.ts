import dayjs from 'dayjs';

import { CalendarEvent, MeetingType } from './types';

/**
 * Helper for lazily importing the Google JavaScript API.
 */
async function importGapi() {
  await new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    document.body.appendChild(script);
    script.onload = resolve;
  });
}

/**
 * Loads the Google API client.
 */
async function loadClient() {
  await new Promise((resolve) => gapi.load('client', resolve));
}

// Flag for if the API has loaded yet. This is used so that the API is only
// loaded once after it is called.
let isApiLoaded = false;

/**
 * Initializes the Google API Client and Calendar API.
 *
 * @param apiKey A Google API key with read access to the calendar API.
 */
export async function maybeLoadCalendarAPI(apiKey: string): Promise<void> {
  if (isApiLoaded) {
    return;
  }

  await importGapi();
  await loadClient();
  await gapi.client.init({ apiKey });

  await gapi.client.load(
    'https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest',
    'v3',
  );

  isApiLoaded = true;
}

/**
 * Uses the Google Calendar API to fetch calendar events for the Calendar
 * component.
 *
 * @param calendarId The calendar ID to fetch events from.
 * @param activeStartDate The currently visible date in the calendar.
 * @returns A list of events
 */
export async function fetchEvents(
  calendarId: string,
  activeStartDate: dayjs.Dayjs,
): Promise<CalendarEvent[]> {
  const { result } = await gapi.client.calendar.events.list({
    calendarId,
    // Expand recurring events into event instances so that the start times are
    // within `timeMin` and `timeMax`:
    // https://developers.google.com/calendar/api/v3/reference/events/list
    singleEvents: true,
    timeMin: activeStartDate.startOf('month').subtract(1, 'week').toISOString(),
    timeMax: activeStartDate.endOf('month').add(1, 'week').toISOString(),
  });

  const events: CalendarEvent[] = [];
  const visitedDates: Set<string> = new Set();

  result.items
    .filter((event) => event.status === 'confirmed')
    .forEach((event) => {
      const title = event.summary;
      let type: MeetingType;

      if (title.includes('community meeting')) {
        type = 'community';
      } else if (title.includes('working group')) {
        type = 'workingGroup';
      } else {
        type = 'other';
      }

      const start = dayjs(event.start.dateTime ?? event.start.date ?? '');
      const end = dayjs(event.end.dateTime ?? event.end.date ?? '');
      const dateStr = start.toString();

      if (visitedDates.has(dateStr)) {
        return;
      }

      visitedDates.add(dateStr);

      events.push({
        calendarId,
        end,
        start,
        title,
        type,
        description: event.description,
        htmlLink: event.htmlLink,
        location: event.location ?? '',
        recurringEventId: event.recurringEventId,
      });
    });

  return events;
}

/**
 * Fetches a single calendar event.
 *
 * @param calendarId The calendar ID.
 * @param eventId The calendar event ID.
 * @returns The calendar event data.
 */
export async function fetchEvent(
  calendarId: string,
  eventId: string,
): Promise<gapi.client.calendar.Event> {
  const { result } = await gapi.client.calendar.events.get({
    calendarId,
    eventId,
  });

  return result;
}
