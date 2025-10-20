export enum TripStatus {
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export interface TripLocation {
  name: string;
  description: string;
  time: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  // For compatibility with UI components
  locationId?: string;
  latitude?: number;
  longitude?: number;
}

export interface TripDay {
  day: number;
  title: string;
  locations: TripLocation[];
  // For compatibility with UI components
  dayId?: string;
}

export interface Trip {
  tripId: string;
  status: TripStatus;
  originalPrompt: string;
  createdAt: string;
  plan: TripDay[];
  // For compatibility with UI components
  title?: string;
  days?: TripDay[];
}

export interface TripsListResponse {
  trips: Trip[];
  total: number;
}