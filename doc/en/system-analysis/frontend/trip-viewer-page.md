# Frontend: Trip Viewer Page

## 1) General Page Description
- **Purpose:** To display the generated itinerary in a user-friendly format.
- **Routes/URLs:** `/trips/{tripId}`.
- **Layout:** The page is divided into two parts: on the left, a list of days and locations; on the right, an interactive map with pins.

## 2) Components
### Component: `TripView`
**Purpose:** The main component that manages the state of the entire page.
**States:**
- `loading`: Data is loading. A skeleton or global loader is displayed.
- `loaded`: Data has been received, `DayTabs`, `LocationList`, and `MapView` are displayed.
- `error`: A loading error has occurred. An error message is displayed.
- `processing`: The itinerary is still being generated. A special screen with the message "Itinerary is being generated..." is displayed.

### Component: `DayTabs`
**Purpose:** Tabs for switching between the days of the trip.

### Component: `LocationList`
**Purpose:** A list of locations for the selected day.

### Component: `MapView`
**Purpose:** An interactive map with pins for all locations in the itinerary.

## 5) API Integration
| UI Action | Method | Endpoint | When Called | Behavior |
|---|---|---|---|---|
| Page load | GET | `/trips/{tripId}` | When the `TripView` component is mounted. | If `status: 'PROCESSING'`, polling or waiting for a WebSocket is initiated. If `status: 'COMPLETED'`, the data is displayed. |
| Click on pin/location | - | - | - | Highlighting the corresponding element in the list and on the map. |
