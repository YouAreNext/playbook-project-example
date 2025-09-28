import { Card, CardBody } from '@heroui/react';
import { MapPin } from 'lucide-react';
import type { TripDay } from '@/entities/trip';

interface MapViewProps {
  days: TripDay[];
  selectedDay: number | null;
  selectedLocationId: string | null;
  onLocationSelect: (locationId: string) => void;
}

export function MapView({ days, selectedDay, selectedLocationId, onLocationSelect }: MapViewProps) {
  // Filter locations based on selected day
  const displayLocations = selectedDay !== null
    ? days.find(day => day.day === selectedDay)?.locations || []
    : days.flatMap(day => day.locations);

  return (
    <div className="h-full relative bg-gray-200">
      {/* Map background with grid pattern to simulate map */}
      <div className="absolute inset-0"
           style={{
             backgroundImage: `
               linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent),
               linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent)
             `,
             backgroundSize: '50px 50px',
             backgroundColor: '#e5e7eb'
           }}>
      </div>

      {/* Location pins positioned across the map */}
      {displayLocations.map((location, index) => {
        // Simulate positioning based on coordinates
        const x = ((location.coordinates?.lng || 0 + 180) / 360) * 100;
        const y = ((90 - (location.coordinates?.lat || 0)) / 180) * 100;

        return (
          <button
            key={location.locationId}
            onClick={() => onLocationSelect(location.locationId!)}
            className={`
              absolute transform -translate-x-1/2 -translate-y-1/2 z-10
              ${selectedLocationId === location.locationId ? 'scale-125' : 'hover:scale-110'}
              transition-transform
            `}
            style={{
              left: `${Math.min(Math.max(x, 10), 90)}%`,
              top: `${Math.min(Math.max(y, 10), 90)}%`
            }}
          >
            <div className={`
              w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-xs font-bold
              ${selectedLocationId === location.locationId
                ? 'bg-blue-600 text-white'
                : 'bg-red-500 text-white hover:bg-red-600'
              }
            `}>
              {index + 1}
            </div>
          </button>
        );
      })}

      {/* Route lines connecting locations */}
      {selectedDay !== null && days.find(day => day.day === selectedDay)?.locations && (
        <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          {days.find(day => day.day === selectedDay)?.locations.slice(0, -1).map((location, index) => {
            const nextLocation = days.find(day => day.day === selectedDay)?.locations[index + 1];
            if (!nextLocation) return null;

            const x1 = ((location.coordinates?.lng || 0 + 180) / 360) * 100;
            const y1 = ((90 - (location.coordinates?.lat || 0)) / 180) * 100;
            const x2 = ((nextLocation.coordinates?.lng || 0 + 180) / 360) * 100;
            const y2 = ((90 - (nextLocation.coordinates?.lat || 0)) / 180) * 100;

            return (
              <line
                key={`${location.locationId}-${nextLocation.locationId}`}
                x1={`${Math.min(Math.max(x1, 10), 90)}%`}
                y1={`${Math.min(Math.max(y1, 10), 90)}%`}
                x2={`${Math.min(Math.max(x2, 10), 90)}%`}
                y2={`${Math.min(Math.max(y2, 10), 90)}%`}
                stroke="#374151"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.6"
              />
            );
          })}
        </svg>
      )}
    </div>
  );
}