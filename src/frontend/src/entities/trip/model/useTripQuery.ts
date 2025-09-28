import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/shared/api';
import type { Trip } from '../api/types';

// Transform API response to match UI expectations
function transformTripData(trip: Trip): Trip & { days: Required<Trip>['plan'] } {
  const transformedPlan = trip.plan.map((day) => ({
    ...day,
    dayId: `${trip.tripId}-day-${day.day}`,
    locations: day.locations.map((location, index) => ({
      ...location,
      locationId: `${trip.tripId}-day-${day.day}-location-${index}`,
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
    })),
  }));

  return {
    ...trip,
    title: trip.originalPrompt.split('.')[0] || 'Путешествие',
    days: transformedPlan,
  };
}

export const useTripQuery = (tripId: string | undefined) =>
  useQuery({
    queryKey: ['trip', tripId] as const,
    queryFn: async (): Promise<Trip & { days: Required<Trip>['plan'] }> => {
      if (!tripId) throw new Error('Trip ID is required');
      const trip = await apiRequest<Trip>(`/trips/${tripId}`);
      return transformTripData(trip);
    },
    enabled: !!tripId,
    refetchInterval: (query) => {
      // Poll every 5 seconds if trip is still processing
      return query.state.data?.status === 'PROCESSING' ? 5000 : false;
    },
  });