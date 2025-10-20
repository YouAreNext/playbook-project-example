# Entity: Trip

## 1) Entity Specifications
### Entity: `trips`
**Description:** The main entity representing a user's trip.

**Attributes**
| Field | Data Type | Description | Constraints/Notes | Required |
|---|---|---|---|---|
| id | uuid | PK | PRIMARY KEY | yes |
| user_id | uuid | FK to `users.id` | NOT NULL, ON DELETE CASCADE | yes |
| original_prompt | text | The user's original request | NOT NULL | yes |
| status | varchar(50) | Generation status | NOT NULL, CHECK (status IN ('PROCESSING', 'COMPLETED', 'FAILED')) | yes |
| created_at | timestamptz | Creation date | NOT NULL, default now() | yes |
| updated_at | timestamptz | Update date | NOT NULL, default now() | yes |

**Relationships**
- 1:N with `trip_days` (one trip has many days).

**Indexes**
- `trips_user_id_idx` (B-Tree) on `user_id` for quickly retrieving all of a user's trips.

**Lifecycle / Statuses**
- `PROCESSING` → `COMPLETED` | `FAILED`
