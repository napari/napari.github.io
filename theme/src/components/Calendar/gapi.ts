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
    timeMin: activeStartDate.startOf('month').toISOString(),
    timeMax: activeStartDate.endOf('month').toISOString(),
  });

  return result.items
    .filter((event) => event.status === 'confirmed')
    .map((event) => {
      const title = event.summary;
      let type: MeetingType;

      if (title.includes('community meeting')) {
        type = 'community';
      } else if (title.includes('working group')) {
        type = 'workingGroup';
      } else {
        type = 'other';
      }

      return {
        title,
        type,
        date: dayjs(event.start.dateTime ?? event.start.date ?? ''),
        description: event.description,
        location: event.location ?? '',
        recurrences: event.recurrence,
      };
    });
}
