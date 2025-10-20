# API: Trips (`/trips`)

This resource is responsible for creating and managing user travel itineraries.

## `POST /trips`

**Purpose:** Initiates the asynchronous generation of a new travel itinerary based on the user's text query. The system immediately returns the ID of the created task and begins processing in the background.

**Request Body (`application/json`):**

| Field | Type | Description | Required |
|---|---|---|---|
| `prompt` | String | The user's text query for generating the itinerary. Maximum 1000 characters. | Yes |

**Example Request Body:**
```json
{
  "prompt": "A 4-day trip to Lisbon for two. We love ceramics, seafood, and non-touristy viewpoints. Budget 500 euros."
}
```

**Responses:**

*   **`202 Accepted`** - The generation request has been successfully accepted for processing. The client should use the `tripId` to track the status or retrieve the result.
    ```json
    {
      "tripId": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
      "status": "PROCESSING",
      "message": "Your trip generation has been queued."
    }
    ```
*   **`401 Unauthorized`** - The user is not authenticated.
    ```json
    {
      "error": "Authentication required."
    }
    ```
*   **`422 Unprocessable Entity`** - Validation error. For example, the query text is empty or exceeds the limit.
    ```json
    {
      "error": "Validation failed",
      "details": {
        "prompt": "Prompt must not be empty and should be less than 1000 characters."
      }
    }
    ```

---
## `GET /trips`

**Purpose:** Retrieves a list of all itineraries created by the current authenticated user. Returns brief information about each itinerary with pagination.

**Query Params:**

| Parameter | Type | Description | Required |
|---|---|---|---|
| `page` | Integer | The page number for pagination (starting from 1). Default: 1. | No |
| `limit` | Integer | The number of itineraries per page. Default: 10. | No |

**Responses:**

*   **`200 OK`** - Successful response with a list of itineraries.
    ```json
    {
      "page": 1,
      "limit": 10,
      "total": 2,
      "items": [
        {
          "tripId": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
          "title": "A 4-day trip to Lisbon...",
          "status": "COMPLETED",
          "createdAt": "2025-09-10T12:00:00Z"
        },
        {
          "tripId": "f0e9d8c7-b6a5-4321-fedc-ba9876543210",
          "title": "Roman holiday for a week...",
          "status": "PROCESSING",
          "createdAt": "2025-09-11T15:30:00Z"
        }
      ]
    }
    ```
*   **`401 Unauthorized`** - The user is not authenticated.
    ```json
    {
      "error": "Authentication required."
    }
    ```

---
## `GET /trips/{tripId}`

**Purpose:** Retrieves full, detailed information about a specific itinerary by its ID. Can be used to check the status or to load the finished result.

**Path Params:**

| Parameter | Type | Description | Required |
|---|---|---|---|
| `tripId` | String (UUID) | The unique identifier of the itinerary. | Yes |

**Responses:**

*   **`200 OK`** - Successful response with the data of the completed itinerary.
    ```json
    {
      "tripId": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
      "status": "COMPLETED",
      "originalPrompt": "A 4-day trip to Lisbon...",
      "createdAt": "2025-09-10T12:00:00Z",
      "plan": [
        {
          "day": 1,
          "title": "Discovering Alfama",
          "locations": [
            {
              "name": "São Jorge Castle",
              "description": "Start your day with panoramic views of the city.",
              "time": "10:00 - 12:00",
              "coordinates": {
                "lat": 38.7139,
                "lng": -9.1335
              }
            },
            {
              "name": "'Pateo 13' Restaurant",
              "description": "An authentic seafood restaurant recommended by locals.",
              "time": "13:00 - 14:30",
              "coordinates": {
                "lat": 38.7115,
                "lng": -9.1301
              }
            }
          ]
        }
      ]
    }
    ```
*   **`200 OK` (Processing)** - The itinerary is still being generated.
    ```json
    {
      "tripId": "f0e9d8c7-b6a5-4321-fedc-ba9876543210",
      "status": "PROCESSING"
    }
    ```
*   **`401 Unauthorized`** - The user is not authenticated.
    ```json
    {
      "error": "Authentication required."
    }
    ```
*   **`404 Not Found`** - The itinerary with the specified ID was not found or does not belong to the current user.
    ```json
    {
      "error": "Trip not found."
    }
    ```
