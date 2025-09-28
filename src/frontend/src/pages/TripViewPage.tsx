import { TripView } from '@/widgets/trip-viewer';

interface TripViewPageProps {
  tripId: string;
}

export function TripViewPage({ tripId }: TripViewPageProps) {
  return <TripView tripId={tripId} />;
}