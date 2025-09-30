## Product Backlog: Localize MVP v1.0

### **Epic 1: User Authentication (FR-01)**

#### User Story 1: Email Registration
*   **Story:** As a new user, I want to create an account using my email and password so that I can save my generated itineraries.
*   **AC:**
    1.  The registration page has fields for "Email," "Password," and "Confirm Password."
    2.  The system validates that the entered email has a correct format.
    3.  The system validates that the password is at least 8 characters long.
    4.  The system validates that the passwords in the "Password" and "Confirm Password" fields match.
    5.  When trying to register with an existing email, the system displays the error "User with this email already exists."
    6.  After successful registration, the user is automatically logged in and redirected to the main screen (dashboard).
*   **Story Points:** 3

#### Technical Tasks:
*   `[Frontend]` Create a registration page component with a form (fields, button, error handling).
*   `[Frontend]` Implement client-side validation for the form fields.
*   `[Frontend]` Implement sending the request to the backend and handling the response (success/error).
*   `[Backend]` Create the `POST /api/auth/register` endpoint.
*   `[Backend]` Implement server-side data validation (email, password).
*   `[Backend]` Implement password hashing logic (bcrypt) and saving the new user to the DB.
*   `[Backend]` Implement JWT token generation for the session after successful registration.
*   `[QA]` Write test cases for successful and unsuccessful registration scenarios.

---
#### User Story 2: Email Login
*   **Story:** As a registered user, I want to log in to my account using my email and password to access my saved itineraries.
*   **AC:**
    1.  The login page has fields for "Email" and "Password."
    2.  When an incorrect email/password pair is entered, the system displays the error "Invalid login or password."
    3.  When trying to log in with an email that does not exist in the system, the same error is displayed.
    4.  After a successful login, the user is redirected to the main screen (dashboard).
*   **Story Points:** 2

#### Technical Tasks:
*   `[Frontend]` Create a login page component with a form.
*   `[Frontend]` Implement sending the request to the backend and handling the response.
*   `[Backend]` Create the `POST /api/auth/login` endpoint.
*   `[Backend]` Implement the logic for checking the email and comparing the password hash.
*   `[Backend]` Generate and return a JWT token on success.
*   `[QA]` Write test cases for successful and unsuccessful login scenarios.

---
#### User Story 3: Login and Registration via Google
*   **Story:** As a new or existing user, I want to log in/register via my Google account to avoid entering data manually and to speed up the process.
*   **AC:**
    1.  The login and registration pages have a "Log in with Google" button.
    2.  Clicking the button redirects the user to the standard Google authentication screen.
    3.  After successful authentication with Google, if the user with that email is new, an account is created for them in the system.
    4.  After successful authentication, the user is logged into the application and redirected to the main screen.
*   **Story Points:** 5

#### Technical Tasks:
*   `[Frontend]` Add a "Log in with Google" button to the login/registration forms.
*   `[Frontend]` Integrate the Google Sign-In for Websites SDK, configure the redirect.
*   `[Frontend]` Implement sending the token from Google to the backend for verification.
*   `[Backend]` Set up a project in the Google Cloud Console to get a Client ID and Client Secret.
*   `[Backend]` Create the `POST /api/auth/google` endpoint.
*   `[Backend]` Implement the logic for verifying the token from Google.
*   `[Backend]` Implement the "find or create" user logic in the DB based on data from Google.
*   `[DevOps]` Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to environment variables.
*   `[QA]` Test the full cycle of login and registration via Google.

---
### **Epic 2: Itinerary Generation and Viewing (FR-02, FR-03)**

#### User Story 4: Generate Itinerary from Text Query
*   **Story:** As a traveler, I want to describe my trip preferences in a text field to get a ready-made, personalized itinerary.
*   **AC:**
    1.  The main screen has a multi-line text field for entering the query.
    2.  The field has a 1000-character limit.
    3.  After clicking the "Create Itinerary" button and before receiving a response, a loading indicator is displayed (e.g., a spinner or animation).
    4.  If generation takes more than 15 seconds, the process is interrupted, and the user is shown an error message.
    5.  In case of a technical error from the AI service, the user is shown a friendly message with a suggestion to try again.
    6.  After successful generation, the user is redirected to the itinerary viewing screen.
*   **Story Points:** 8

#### Technical Tasks:
*   `[Frontend]` Create a main component with a text field and a button.
*   `[Frontend]` Implement a loading state.
*   `[Frontend]` Implement sending the request to the backend and handling the response (redirect or show error).
*   `[Backend]` Create the `POST /api/routes/generate` endpoint.
*   `[Backend]` Integrate the API of an external AI service (e.g., OpenAI API).
*   `[Backend]` Construct a system prompt for the AI, including the user's query and instructions for formatting the response.
*   `[Backend]` Implement parsing and validation of the response from the AI service to convert it into structured data (JSON).
*   `[Backend]` Configure timeouts for the external API request.
*   `[DevOps]` Ensure secure storage of the API key for the AI service.
*   `[QA]` Prepare a set of diverse queries to test the quality and stability of the generation.
*   `[QA]` Conduct load testing to verify compliance with the 15-second requirement.

---
#### User Story 5: View Generated Itinerary
*   **Story:** As a user, I want to see the generated itinerary in a convenient format with a breakdown by day and a display on a map to easily understand and evaluate my plan.
*   **AC:**
    1.  The viewing screen is divided into two main parts: a list of events and an interactive map.
    2.  The list of events is grouped by day, with switching between days implemented via tabs.
    3.  Within each day, an ordered list of locations is displayed with the time of visit.
    4.  The map displays pins only for the locations that belong to the selected day.
    5.  When a location in the list is clicked, the corresponding pin on the map is centered and highlighted (e.g., enlarged or changes color).
    6.  When a pin on the map is clicked, the corresponding item in the list is scrolled into view and highlighted.
    7.  The interface is displayed correctly on mobile, tablet, and desktop devices.
*   **Story Points:** 5

#### Technical Tasks:
*   `[Frontend]` Create an itinerary viewing page component.
*   `[Frontend]` Implement a tabs component for navigating by day.
*   `[Frontend]` Integrate a map library (e.g., Mapbox, Leaflet).
*   `[Frontend]` Implement the logic for drawing pins on the map based on the itinerary data for the active day.
*   `[Frontend]` Implement two-way state synchronization (highlighting) between the list and the map.
*   `[Frontend]` Adapt the layout for different screen sizes (mobile-first).
*   `[Backend]` Ensure that the generation endpoint and the itinerary retrieval endpoint return data in a format convenient for the frontend (including geo-coordinates).
*   `[QA]` Check the correct display of the itinerary and interactivity at all breakpoints.
*   `[QA]` Test the interaction with the list and the map (clicks, scroll).
