# Entity: TripDay

## 1) Entity Specifications
### Entity: `trip_days`
**Description:** Represents one day within a trip.

**Attributes**
| Field | Data Type | Description | Constraints/Notes | Required |
|---|---|---|---|---|
| id | uuid | PK | PRIMARY KEY | yes |
| trip_id | uuid | FK to `trips.id` | NOT NULL, ON DELETE CASCADE | yes |
| day_number | integer | The sequential number of the day | NOT NULL | yes |
| title | varchar(255) | The name/theme of the day | NOT NULL | yes |

**Relationships**
- 1:N with `locations` through the `trip_day_locations` join table.
- N:1 with `trips`.

**Indexes**
- `trip_days_trip_id_idx` on `trip_id`.
- A unique composite index on (`trip_id`, `day_number`).
