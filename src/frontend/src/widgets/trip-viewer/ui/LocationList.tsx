import { Card, CardBody, CardHeader, Chip } from '@heroui/react';
import { MapPin, Clock } from 'lucide-react';
import type { TripDay } from '@/entities/trip';

interface LocationListProps {
  days: TripDay[];
  selectedDay: number | null;
  selectedLocationId: string | null;
  onLocationSelect: (locationId: string) => void;
}

export function LocationList({ days, selectedDay, selectedLocationId, onLocationSelect }: LocationListProps) {
  // Filter days based on selection
  const displayDays = selectedDay !== null
    ? days.filter(day => day.day === selectedDay)
    : days;

  const sortedDays = displayDays.sort((a, b) => a.day - b.day);

  return (
    <div className="h-full overflow-auto">
      {sortedDays.map((day) => (
        <div key={day.dayId} className="border-b border-gray-50 last:border-b-0">
          <div className="p-4 bg-gray-50 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900">Day {day.day}</span>
              <span className="text-sm text-gray-600">{day.title}</span>
            </div>
          </div>

          <div className="divide-y divide-gray-50">
            {day.locations
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((location, index) => (
                <button
                  key={location.locationId}
                  onClick={() => onLocationSelect(location.locationId!)}
                  className={`
                    w-full text-left p-4 hover:bg-gray-50 transition-colors relative
                    ${selectedLocationId === location.locationId ? 'bg-blue-50 border-r-2 border-r-blue-500' : ''}
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1 relative">
                      <div className={`w-2 h-2 rounded-full ${
                        selectedLocationId === location.locationId ? 'bg-blue-500' : 'bg-gray-400'
                      }`}></div>
                      {index < day.locations.length - 1 && (
                        <div className="w-px h-16 bg-gray-200 absolute top-3 left-0.5"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          {location.time}
                        </span>
                        <span className="text-sm text-gray-600">
                          {location.name}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {location.description}
                      </p>
                      <div className="text-xs text-gray-400 mt-1">
                        Transport: 15 min walk
                      </div>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </div>
      ))}

      {sortedDays.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No locations to display</p>
        </div>
      )}
    </div>
  );
}