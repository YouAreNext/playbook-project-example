### **Use Case Scenario**

**ID:** UC-01
**Scenario Name:** Generation of a personalized travel itinerary

**Actors:**
*   **User:** The initiator of the process, who enters a request and receives the result.
*   **"Localize" System:** The application that processes the request, orchestrates the process, and provides the interface.
*   **External AI Service:** A third-party system (e.g., OpenAI API) that generates the text description of the itinerary.

**Preconditions:**
1.  The user is successfully authenticated in the System.
2.  The user is on a screen where a field for entering a request to create an itinerary is available (e.g., the main dashboard).

---

### **Main Success Scenario:**

| Step | User Action | "Localize" System Action |
| :-- | :--- | :--- |
| 1 | Enters a text query into the corresponding field (e.g., "I want to go to Rome for 7 days in October. I'm interested in history and non-touristy restaurants. Medium budget.") | |
| 2 | Clicks the "Create Plan" button (or similar). | 2.1. Receives an HTTP request from the client application. <br>2.2. Validates the input data: checks that the user is authenticated and that the text length does not exceed 1000 characters. <br>2.3. Creates a new itinerary record in the database with a unique ID and a status of `PROCESSING`. |
| 3 | | 3.1. Places a generation task in an asynchronous message queue, passing the itinerary ID and the query text. <br>3.2. **Immediately** sends an `HTTP 202 Accepted` response to the client, confirming that the task has been accepted for processing. |
| 4 | Sees a loading indicator on the screen ("Your itinerary is being generated..."). | 4.1. The client application, having received the `202` response, displays a loading indicator. <br>4.2. The client application establishes a WebSocket connection to receive a notification of completion. |
| 5 | | 5.1. **(Asynchronously)** A worker picks up the task from the queue. <br>5.2. Forms a detailed prompt for the **External AI Service**. <br>5.3. Sends a request to the **External AI Service** and waits for a response. |
| 6 | | 6.1. Receives a text response from the **External AI Service**. <br>6.2. Parses the response, converting it into structured data (days, locations, times, descriptions, coordinates). <br>6.3. Updates the itinerary record in the database, saving the structured data and changing the status to `COMPLETED`. |
| 7 | | 7.1. Sends a notification via the WebSocket channel to the client that the itinerary with the specific ID is ready. |
| 8 | | 8.1. The client application receives the notification. <br>8.2. Automatically sends a new HTTP GET request to retrieve the data of the completed itinerary by its ID. |
| 9 | Sees the fully generated itinerary on the screen, presented as a list by day and marked on an interactive map. | 9.1. Receives the itinerary data. <br>9.2. Hides the loading indicator. <br>9.3. Displays the received information in the user interface. |

---

### **Alternative Scenarios and Extensions:**

**2a. Validation Error: Empty Request**
*   **Trigger:** At step 2, the User clicks the "Create Plan" button without entering any text in the query field.
*   **Scenario:**
    1.  The system on the client side (Frontend) determines that the field is empty.
    2.  The system displays an error message next to the input field (e.g., "Please describe your trip").
    3.  The request is not sent to the server. The process ends.

**2b. Validation Error: Character Limit Exceeded**
*   **Trigger:** At step 2, the User enters text that exceeds 1000 characters.
*   **Scenario:**
    1.  The system (on the client or server side) determines that the limit has been exceeded.
    2.  The system rejects the request and displays an error message to the User (e.g., "The request is too long. Maximum 1000 characters").
    3.  The process ends.

**5a. External AI Service Error**
*   **Trigger:** At step 5.3, the External AI Service is unavailable, returns an error (status 5xx), or the wait times out.
*   **Scenario:**
    1.  The "Localize" System (Worker) records the error.
    2.  The system updates the itinerary record in the database, setting the status to `FAILED` and saving information about the error.
    3.  The system sends a notification of the generation error to the client via the WebSocket channel.
    4.  The client application, upon receiving the notification, hides the loading indicator and displays a message to the User (e.g., "Failed to create itinerary. Please try again later").
    5.  The process ends.

**6a. AI Response Parsing Error**
*   **Trigger:** At step 6.2, the External AI Service returns a response in a format that the System cannot recognize and convert into structured data.
*   **Scenario:**
    1.  The "Localize" System (Worker) cannot parse the response.
    2.  The subsequent steps are similar to scenario **5a**: status `FAILED`, user notification of the error.

**A. User Leaves the Page During Generation**
*   **Trigger:** After step 4, the User closes the browser tab or navigates to another page.
*   **Scenario:**
    1.  The WebSocket connection is broken.
    2.  The generation process on the backend (steps 5-6) **continues** in the background.
    3.  When the User returns to the application, they will see the completed itinerary in their list of trips (if it was generated successfully) or will be able to see an error notification. The system does not lose the result of the work.
