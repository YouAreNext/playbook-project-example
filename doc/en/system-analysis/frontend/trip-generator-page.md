# Frontend: Trip Generator Page

## 1) General Page Description
- **Purpose:** To provide the user with the ability to create a new itinerary by entering a text query.
- **Routes/URLs:** `/` (main page).
- **Layout:** The main element is a large text field in the center of the screen with a "Create" button.

## 2) Components
### Component: `PromptInputForm`
**Purpose:** A form for entering text and submitting a generation request.
**States:**
- `idle`: The form is ready for input.
- `submitting`: The form has been submitted, the button is inactive, a global loading indicator is displayed.
- `error`: A validation error has occurred (e.g., empty text), an error message is displayed.

**Events/Callbacks:**
- `onSubmit(prompt: string)`: Called when the form is submitted.

## 5) API Integration
| UI Action | Method | Endpoint | When Called | Behavior |
|---|---|---|---|---|
| Submit request | POST | `/trips` | `PromptInputForm.onSubmit` | On success (202) - navigate to the trip viewer page in a loading state. On error (4xx) - display an error message. |
