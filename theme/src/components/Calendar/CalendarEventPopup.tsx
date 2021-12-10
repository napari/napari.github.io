import { PopperProps } from '@material-ui/core';
import { Info, Label, LocationOn } from '@material-ui/icons';
import clsx from 'clsx';
import dayjs from 'dayjs';
import dompurify from 'dompurify';
import { ComponentType, forwardRef } from 'react';

import { Popup } from '@/components/Popup';
import { isExternalUrl } from '@/utils/url';

import styles from './Calendar.module.scss';
import { FILTER_LABEL_BY_KEY } from './constants';
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
  ({ event, ...props }, ref) => {
    const metadata: CalendarMetadataProps[] = [
      {
        icon: Label,
        label: FILTER_LABEL_BY_KEY[event.type],
      },
      {
        icon: Info,
        label: event.description,
        html: true,
      },
      {
        icon: LocationOn,
        label: event.location,
      },
    ].filter((item) => item.label);

    return (
      <Popup
        ref={ref}
        paperClassName="max-w-64 max-h-96 p-5 flex"
        placement="top"
        {...props}
      >
        <div className="flex flex-col space-y-2 overflow-y-auto">
          <p className="font-bold uppercase">
            {event.start.format('dddd MMM D')}
          </p>
          <p className="font-bold">
            {formatEventTime(event.start)}–{formatEventTime(event.end)}{' '}
            {dayjs().format('z')}
          </p>

          <h2 className="text-2xl font-bold">{event.title}</h2>

          <ul className="space-y-2 overflow-y-auto">
            {metadata.map((metadataProps) => (
              <CalendarMetadata {...metadataProps} key={metadataProps.label} />
            ))}
          </ul>
        </div>
      </Popup>
    );
  },
);
