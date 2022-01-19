import dynamic from 'next/dynamic';

const Calendar = dynamic<Record<string, never>>(
  () => import('@/components/Calendar').then((mod) => mod.Calendar),
  {
    ssr: false,
  },
);

export default function CalendarPage() {
  return (
    <div className="flex flex-col h-screen items-stretch">
      <Calendar />
    </div>
  );
}
