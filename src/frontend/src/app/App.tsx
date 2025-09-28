import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HeroUIProvider } from '@heroui/react';
import { TripViewPage } from '../pages/TripViewPage';
import './globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  // Simple routing logic - in real app would use React Router
  const path = window.location.pathname;
  const tripIdMatch = path.match(/^\/trips\/(.+)$/);
  const tripId = tripIdMatch?.[1];

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <div className="min-h-screen bg-background text-foreground">
          {tripId ? (
            <TripViewPage tripId={tripId} />
          ) : (
            <div className="flex items-center justify-center h-screen">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Localize</h1>
                <p className="text-xl text-gray-600 mb-8">
                  AI Travel Planner
                </p>
                <div className="space-y-2 text-gray-500">
                  <p>Available itineraries:</p>
                  <div className="space-x-4">
                    <a
                      href="/trips/9790e47f-9602-4efb-bb49-125f6089d525"
                      className="text-primary hover:underline"
                    >
                      Sample Trip 1
                    </a>
                    <a
                      href="/trips/e3510ddd-db2c-4a2a-ba89-2bd426749361"
                      className="text-primary hover:underline"
                    >
                      Sample Trip 2
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </HeroUIProvider>
    </QueryClientProvider>
  );
}

export default App;