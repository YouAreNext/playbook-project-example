import { Tabs, Tab } from '@heroui/react';
import type { TripDay } from '@/entities/trip';

interface DayTabsProps {
  days: TripDay[];
  selectedDay: number | null;
  onDaySelect: (day: number) => void;
}

export function DayTabs({ days, selectedDay, onDaySelect }: DayTabsProps) {
  const handleSelectionChange = (key: React.Key) => {
    if (key === 'all') {
      onDaySelect(null as any); // Show all days
    } else {
      onDaySelect(Number(key));
    }
  };

  const selectedKey = selectedDay === null ? 'all' : selectedDay.toString();

  return (
    <div className="flex gap-1">
      <button
        onClick={() => onDaySelect(null as any)}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          selectedDay === null
            ? 'bg-gray-900 text-white'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        All days
      </button>
      {days
        .sort((a, b) => a.day - b.day)
        .map((day) => (
          <button
            key={day.day}
            onClick={() => onDaySelect(day.day)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedDay === day.day
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Day {day.day}
          </button>
        ))}
    </div>
  );
}