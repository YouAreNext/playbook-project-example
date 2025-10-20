# Localize Frontend

A React application for displaying AI-generated travel itineraries.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** - bundler and dev server
- **TailwindCSS** - styling
- **HeroUI** - UI components
- **TanStack Query** - server state management
- **FSD Architecture** - architectural methodology

## Project Architecture (FSD)

```
src/
  app/                    # Main application, providers
  shared/                 # Reusable utilities, API, components
    lib/                  # Utilities (cn, helpers)
    api/                  # Base API functions
  entities/               # Domain entities
    trip/                 # Trip entity
      api/                # Types and contracts
      model/              # Hooks and business logic
  widgets/                # Composite UI blocks
    trip-viewer/          # Trip viewer widget
  pages/                  # Application pages
```

## Main Components

### TripView
The main component for displaying a travel itinerary with the following states:
- **loading** - data is loading
- **processing** - itinerary is being generated
- **completed** - itinerary is ready
- **failed** - generation error

### Subcomponents
- **DayTabs** - tabs for switching between days
- **LocationList** - list of locations for the selected day
- **MapView** - interactive map with locations

## API Integration

The frontend interacts with the NestJS backend via a REST API:
- `GET /trips/{tripId}` - fetching trip data
- Automatic polling for itineraries in the PROCESSING status

## Commands

```bash
# Install dependencies
npm install

# Start dev server (localhost:5174)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npx tsc --noEmit
```

## Configuration

### Proxy
A proxy for API requests is configured in `vite.config.ts`:
- `/api/*` → `http://localhost:3000/*`

### Environment Variables
If necessary, create a `.env.local` file:
```
VITE_API_BASE_URL=http://localhost:3000
```

## Usage

1. Start the backend on port 3000
2. Start the frontend: `npm run dev`
3. Open http://localhost:5174
4. To view an itinerary, navigate to `/trips/{tripId}`

Available itineraries for testing are listed on the main page.