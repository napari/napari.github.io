import { Divider, PopperProps } from '@material-ui/core';
import { Event, Info, Label, LocationOn } from '@material-ui/icons';
import clsx from 'clsx';
import dayjs from 'dayjs';
import dompurify from 'dompurify';
import { upperFirst } from 'lodash';
import { ComponentType, forwardRef, useEffect, useState } from 'react';
import { RRule } from 'rrule';

import { Popup } from '@/components/Popup';
import { createUrl, isExternalUrl } from '@/utils/url';

import styles from './Calendar.module.scss';
import { FILTER_LABEL_BY_KEY } from './constants';
import { CopyCalendarButton } from './CopyCalendarButton';
import { fetchEvent } from './gapi';
import { CalendarEvent } from './types';
import { formatEventTime } from './utils';

interface CalendarMetadataProps {
  icon: ComponentType;
  label: string;
  html?: boolean;
}

function CalendarMetadata({
  html,
  icon: Icon,
  label: rawLabel,
}: CalendarMetadataProps) {
  let label: string;

  if (html) {
    const zoomDividerIndex = rawLabel.indexOf('──────────');
    label =
      zoomDividerIndex >= 0 ? rawLabel.slice(0, zoomDividerIndex) : rawLabel;
  } else {
    label = rawLabel;
  }

  const labelClassName = 'break-words min-w-[1%] box-border';
  const isUrl = !html && (isExternalUrl(label) || label.startsWith('/'));

  return (
    <li className={clsx('flex space-x-1', styles.popupMetadata)}>
      <Icon />

      {html ? (
        <p
          className={labelClassName}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            // Sanitize HTML before rendering to prevent XSS attacks.
            __html: dompurify.sanitize(label),
          }}
        />
      ) : (
        <>
          {isUrl ? (
            <a className={clsx(labelClassName, 'underline')} href={label}>
              {label}
            </a>
          ) : (
            <p className={labelClassName}>{label}</p>
          )}
        </>
      )}
    </li>
  );
}

interface Props extends Omit<PopperProps, 'children' | 'ref'> {
  event: CalendarEvent;
}

/**
 * Component for rendering Google Calendar event information in a popup window.
 */
export const CalendarEventPopup = forwardRef<HTMLDivElement, Props>(
  ({ event, open, ...props }, ref) => {
    const [recurrence, setRecurrence] = useState<string[]>([]);

    useEffect(() => {
      async function fetchRecurrence() {
        const { calendarId, recurringEventId } = event;

        if (!open || recurrence.length > 0 || !recurringEventId) {
          return;
        }

        const calendarEvent = await fetchEvent(calendarId, recurringEventId);
        const result: string[] = [];

        for (const value of calendarEvent.recurrence ?? []) {
          const rule = new RRule({
            ...RRule.parseString(value),
            dtstart: new Date(),
          });

          result.push(upperFirst(rule.toText()));
        }

        setRecurrence(result);
      }

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchRecurrence();
    }, [event, open, recurrence]);

    const metadata: CalendarMetadataProps[] = [
      {
        icon: Label,
        label: FILTER_LABEL_BY_KEY[event.type],
      },

      ...recurrence.map((label) => ({
        label,
        icon: Event,
      })),

      {
        icon: LocationOn,
        label: event.location,
      },
      {
        icon: Info,
        label: event.description,
        html: true,
      },
    ].filter(({ label }) => label);

    const eventHtmlId = createUrl(event.htmlLink).searchParams.get('eid');
    const copyLink = `https://calendar.google.com/calendar/u/0/r/eventedit/copy/${eventHtmlId}`;

    return (
      <Popup
        ref={ref}
        paperClassName="max-w-64 max-h-96 py-1 flex"
        placement="top"
        open={open && !!(!event.recurringEventId || recurrence)}
        {...props}
      >
        <div className="flex flex-col space-y-2 overflow-y-auto py-4 px-5">
          <p className="font-bold uppercase">
            {event.start.format('dddd MMM D')}
          </p>
          <p className="font-bold">
            {formatEventTime(event.start)}–{formatEventTime(event.end)}{' '}
            {dayjs().format('z')}
          </p>

          <h2 className="text-2xl font-bold">{event.title}</h2>

          <ul className="space-y-2">
            {metadata
              .filter(({ label }) => label)
              .map((metadataProps) => (
                <CalendarMetadata
                  {...metadataProps}
                  key={metadataProps.label}
                />
              ))}
          </ul>

          <Divider />

          <div>
            <CopyCalendarButton href={copyLink}>
              Copy event to calendar
            </CopyCalendarButton>
          </div>
        </div>
      </Popup>
    );
  },
);
