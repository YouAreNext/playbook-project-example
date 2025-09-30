# Frontend: Authentication Pages

## 1) General Page Description
- **Purpose:** To allow the user to log in to the system or create a new account.
- **Routes/URLs:** `/login`, `/register`.
- **Layout:** The page contains a form with fields for data entry and buttons for login/registration, including a "Log in with Google" option.

## 2) Components
### Component: `AuthForm`
**Purpose:** A form for entering email and password.
**States:** `idle`, `submitting`, `error` (shows an error message).
**Events/Callbacks:** `onSubmit({ email, password })`.

### Component: `GoogleAuthButton`
**Purpose:** A button to initiate login with Google.
**States:** `idle`, `loading`.
**Events/Callbacks:** `onClick()`.

## 5) API Integration
| UI Action | Method | Endpoint | When Called | Errors/Behavior |
|---|---|---|---|---|
| Submit registration form | POST | `/auth/register` | `AuthForm.onSubmit` | 409: "User exists"; 422: "Invalid format". |
| Submit login form | POST | `/auth/login` | `AuthForm.onSubmit` | 401: "Invalid credentials". |
| Click Google button | GET | `/auth/google/redirect` | `GoogleAuthButton.onClick` | - |
| Log out | POST | `/auth/logout` | On click of "Log out" | - |

## 6) Traceability to Use Case and API
| UC Step | Component/State | API Endpoint(s) |
|---|---|---|
| UC-AUTH.2 | `AuthForm` | `/auth/login` or `/auth/register` |
| UC-AUTH.5 | `GoogleAuthButton` | `/auth/google/redirect` |
