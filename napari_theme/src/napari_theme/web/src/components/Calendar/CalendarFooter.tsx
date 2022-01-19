import dayjs from 'dayjs';

export function CalendarFooter() {
  return (
    <span className="flex p-1 bg-white border-t border-black">
      Times shown in {dayjs().format('z')}
    </span>
  );
}
