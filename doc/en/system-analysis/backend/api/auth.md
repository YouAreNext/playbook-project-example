# API: Authentication

> - Dates — ISO 8601 (UTC, `Z`).
> - Uniform error format: `{"error": {"code", "message"}}`.
> - Asynchronicity is not required.

## 1) Access Matrix (RBAC)

| Resource | Method | Access | Notes |
|---|---|---|---|
| /auth/register | POST | public | - |
| /auth/login | POST | public | - |
| /auth/logout | POST | authenticated | Requires access token |
| /auth/google/redirect | GET | public | - |
| /auth/google/callback | GET | public | - |

## 2) Resources and Endpoints

### POST /auth/register
**Purpose:** Register a new user with email and password.
**Access:** public

**Request Body (`application/json`):**
| Field | Type | Format/Constraints | Required | Comment |
|---|---|---|---|---|
| email | string | valid email | yes | - |
| password | string | min 8 characters | yes | **[OPEN QUESTION]** Policies? |

**Responses:**
- **200 OK** - Returns a pair of tokens.
  ```json
  {
    "accessToken": "...",
    "refreshToken": "..."
  }
  ```
- **422 Unprocessable Entity** - Validation error.
- **409 Conflict** - A user with this email already exists.

### POST /auth/login
**Purpose:** User login with email and password.
**Access:** public

**Request Body (`application/json`):**
| Field | Type | Format/Constraints | Required | Comment |
|---|---|---|---|---|
| email | string | valid email | yes | - |
| password | string | - | yes | - |

**Responses:**
- **200 OK** - Returns a pair of tokens.
- **401 Unauthorized** - Invalid credentials.

### POST /auth/logout
**Purpose:** Log out the user.
**Access:** authenticated

**Responses:**
- **204 No Content** - Successful logout.
- **401 Unauthorized** - If the token is not provided or is invalid.

### GET /auth/google/redirect
**Purpose:** Redirect the user to the Google authentication page.
**Access:** public

**Responses:**
- **302 Found** - Redirect to `accounts.google.com`.

### GET /auth/google/callback
**Purpose:** Handle the callback from Google after authentication.
**Access:** public

**Query params:** `code`, `state`

**Responses:**
- **200 OK** - Returns a pair of tokens.
- **500 Internal Server Error** - Error when exchanging the code for a Google token.

## 4) Traceability Table
| RQ-ID | Endpoints |
|---|---|
| FR-01 | All endpoints |

## 5) Open Questions
- **[OPEN QUESTION]** What is the structure of JWT tokens and their expiration times (access, refresh)?
- **[OPEN QUESTION]** How and where should the client store tokens (cookie vs localStorage)?
- **[OPEN QUESTION]** What are the exact security policies for the password?
