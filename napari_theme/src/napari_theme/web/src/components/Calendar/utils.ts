import dayjs from 'dayjs';

export function formatEventTime(date: dayjs.Dayjs): string {
  return date.format(`h${date.minute() > 0 ? ':mm' : ''}a`);
}

export function getEventMapKey(date: dayjs.Dayjs): string {
  return date.format('MM/DD');
}
