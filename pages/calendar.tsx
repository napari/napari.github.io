import dynamic from 'next/dynamic';

import type { Props as CalendarProps } from '@/components/Calendar';

const Calendar = dynamic<CalendarProps>(
  () => import('@/components/Calendar').then((mod) => mod.Calendar),
  {
    ssr: false,
  },
);

export default function CalendarPage() {
  return (
    <div className="flex flex-col h-screen items-stretch">
      <Calendar fullWidth />
    </div>
  );
}
