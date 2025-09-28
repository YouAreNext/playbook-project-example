'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader, Spinner, Button } from '@heroui/react';
import { AlertCircle, RefreshCw, MapPin } from 'lucide-react';
import { useTripQuery, TripStatus } from '@/entities/trip';
import { DayTabs } from './DayTabs';
import { LocationList } from './LocationList';
import { MapView } from './MapView';

interface TripViewProps {
  tripId: string;
}

export function TripView({ tripId }: TripViewProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);

  const { data: trip, isLoading, isError, error, refetch } = useTripQuery(tripId);

  const handleDaySelect = (day: number | null) => {
    setSelectedDay(day);
    setSelectedLocationId(null); // Reset location selection when day changes
  };

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocationId(prev => prev === locationId ? null : locationId);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Spinner size="lg" className="mb-4" />
          <p className="text-lg">Loading itinerary...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="max-w-md">
          <CardBody className="text-center p-6">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-danger" />
            <h3 className="text-xl font-semibold mb-2">Loading Error</h3>
            <p className="text-gray-600 mb-4">
              {error instanceof Error ? error.message : 'Failed to load itinerary'}
            </p>
            <Button
              color="primary"
              startContent={<RefreshCw className="w-4 h-4" />}
              onClick={() => refetch()}
            >
              Try Again
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  // Processing state
  if (trip?.status === TripStatus.PROCESSING) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="max-w-lg">
          <CardBody className="text-center p-8">
            <div className="animate-pulse mb-4">
              <MapPin className="w-16 h-16 mx-auto text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Trip in Generation</h3>
            <p className="text-gray-600 mb-4">
              Our AI is creating a personalized itinerary for you. This may take a few minutes.
            </p>
            <Spinner color="primary" />
          </CardBody>
        </Card>
      </div>
    );
  }

  // Failed state
  if (trip?.status === TripStatus.FAILED) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="max-w-md">
          <CardBody className="text-center p-6">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-danger" />
            <h3 className="text-xl font-semibold mb-2">Failed to Create Trip</h3>
            <p className="text-gray-600 mb-4">
              An error occurred while generating the trip. Please try creating a new trip.
            </p>
            <Button color="primary">
              Create New Trip
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  // Completed state - main UI
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Compact Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{trip?.title}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {trip?.originalPrompt}
            </p>
          </div>
          <Button
            color="default"
            variant="solid"
            size="sm"
            className="bg-black text-white hover:bg-gray-800 rounded-lg px-4 py-2"
          >
            Share
          </Button>
        </div>
      </div>

      {/* Day Tabs */}
      <div className="bg-white border-b border-gray-100">
        <div className="px-6 py-3">
          <DayTabs
            days={trip?.days || []}
            selectedDay={selectedDay}
            onDaySelect={handleDaySelect}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Map (50% of screen) */}
        <div className="w-1/2 bg-white border-r border-gray-100">
          <MapView
            days={trip?.days || []}
            selectedDay={selectedDay}
            selectedLocationId={selectedLocationId}
            onLocationSelect={handleLocationSelect}
          />
        </div>

        {/* Center Panel - Timeline (25% of screen) */}
        <div className="w-1/4 bg-white border-r border-gray-100">
          <LocationList
            days={trip?.days || []}
            selectedDay={selectedDay}
            selectedLocationId={selectedLocationId}
            onLocationSelect={handleLocationSelect}
          />
        </div>

        {/* Right Panel - Details (25% of screen) */}
        <div className="w-1/4 bg-gray-50 p-6">
          {selectedLocationId ? (
            <div>
              <h3 className="font-semibold text-lg mb-2">
                {trip?.days
                  ?.flatMap(day => day.locations)
                  ?.find(loc => loc.locationId === selectedLocationId)?.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Why you'll like it:
              </p>
              <p className="text-sm text-gray-700 mb-6">
                {trip?.days
                  ?.flatMap(day => day.locations)
                  ?.find(loc => loc.locationId === selectedLocationId)?.description}
              </p>
              <div className="space-y-2 text-sm">
                <div><strong>Details:</strong></div>
                <div>Address: {trip?.days
                  ?.flatMap(day => day.locations)
                  ?.find(loc => loc.locationId === selectedLocationId)?.coordinates?.lat.toFixed(4)}, {trip?.days
                  ?.flatMap(day => day.locations)
                  ?.find(loc => loc.locationId === selectedLocationId)?.coordinates?.lng.toFixed(4)}</div>
                <div>Hours: {trip?.days
                  ?.flatMap(day => day.locations)
                  ?.find(loc => loc.locationId === selectedLocationId)?.time}</div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-1 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Replace
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-1 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Remove
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-8">
              <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Select a location to see details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}