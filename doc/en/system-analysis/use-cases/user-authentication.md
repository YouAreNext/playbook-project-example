# Use Case Specification

## 1) Identifier and Attributes
- **ID:** UC-AUTH
- **Name:** User Authentication
- **Version:** 1.0
- **Priority:** High
- **Owner:** Product Team
- **Status:** Draft

## 2) Brief Description
This scenario describes how a new or existing user can log in to the "Localize" system using their email and password or through a Google provider. This allows the system to personalize the experience and save the user's itineraries.

## 3) Scope and Boundaries
- **Included:** Registration with Email/Password, Login with Email/Password, Login/Registration via Google (OAuth), Logout.
- **Excluded (Out of Scope):** Password recovery, password change, two-factor authentication.

## 4) Actors
- **User** (primary): Initiates all actions.
- **"Localize" System** (secondary): Processes requests, manages sessions.
- **Google** (external service): Authentication provider via OAuth 2.0.

## 5) Preconditions
- The user has access to the "Localize" application via a web browser.

## 6) Trigger and Frequency
- **Trigger:** The user clicks on the "Log In," "Sign Up," or "Log in with Google" button.
- **Frequency:** High, at each new session with the application.

## 7) Main Success Scenario

| # | Actor | Action / Response | State/Data/Statuses |
|---|---|---|---|
| 1 | User | Chooses a login/registration method. | - |
| 2 | User | **(If Email/Password)** Enters email and password, clicks "Continue." | - |
| 3 | System | Validates the data. Creates a new user record (on registration) or finds an existing one. Generates a pair of JWT tokens (access, refresh). | User status: `ACTIVE`. In DB: `users` record created/found. |
| 4 | System | Sends the tokens to the client and redirects to the main screen. | User is authenticated. |
| 5 | User | **(If Google)** Clicks "Log in with Google." | - |
| 6 | System | Redirects the user to the Google authentication page. | - |
| 7 | Google | Authenticates the user and requests their consent to share data. | - |
| 8 | Google | Redirects the user back to the application with an authorization code. | - |
| 9 | System | Receives the code, exchanges it for a Google access token, requests user data. Finds or creates the user in the DB. Generates a pair of JWT tokens. | User status: `ACTIVE`. In DB: `users` record created/found. |
| 10| System | Sends the tokens to the client and redirects to the main screen. | User is authenticated. |
| 11| User | Clicks "Log Out." | - |
| 12| System | Deletes the user's session (e.g., invalidates the refresh token) and redirects to the login page. | User is not authenticated. |

## 8) Alternative Flows and Extensions
- **E2.a (Invalid email/password format):** The system displays a validation error under the field.
- **E3.a (User already exists):** On registration, the system suggests logging in.
- **E3.b (User not found):** On login, the system displays an "Invalid credentials" error.
- **E8.a (Google OAuth error):** The system displays an error message.

## 9) Postconditions
- **Success:** The user is authenticated in the system and has an active session.
- **Failure:** The user remains unauthenticated.

## 10) Business Rules and Constraints
- The password must comply with security policies (length, characters). **[OPEN QUESTION]** What are the exact policies?

## 14) Requirements Traceability
| RQ-ID | Covering UC Steps |
|---|---|
| FR-01 | 2, 3, 5-10, 11, 12 |

## 16) Open Questions
- **[OPEN QUESTION]** What are the exact security policies for the password (minimum length, required characters)?
