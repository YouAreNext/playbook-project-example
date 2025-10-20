# Entity: Location

## 1) Entity Specifications
### Entity: `locations`
**Description:** Represents a location or point of interest within a single day of a trip.

**Attributes**
| Field | Data Type | Description | Constraints/Notes | Required |
|---|---|---|---|---|
| id | uuid | PK | PRIMARY KEY | yes |
| trip_day_id | uuid | FK to `trip_days.id` | NOT NULL, ON DELETE CASCADE | yes |
| name | varchar(255) | Name of the location | NOT NULL | yes |
| description | text | Description of the location | - | no |
| time_slot | varchar(100) | Recommended time | - | no |
| lat | numeric(10, 7) | Latitude | NOT NULL | yes |
| lon | numeric(10, 7) | Longitude | NOT NULL | yes |
| order | integer | Order of the location within the day | NOT NULL | yes |

**Relationships**
- N:1 with `trip_days`.

**Indexes**
- `locations_trip_day_id_idx` on `trip_day_id`.
