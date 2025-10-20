<img src="/images/discovery/prototype.jpg" />
<a href="https://www.figma.com/design/WVSyOSLI2GMRRWKfTxEbOr/prototype?node-id=0-1&t=aFFvGzyeWu8tqUog-1" target="_blank">Prototype figma</a>

## Example of a trip plan page concept

### **Concept 1: "Classic Split-View: Map + Timeline" (Focus on analysis and efficiency)**

*   **Main idea:** This approach uses a time-tested three-column layout that allows the user to see all necessary information at once without switching context. On the left is geography, in the center is chronology, and on the right are details. This is a powerful, "analytical" interface for the user who wants to quickly evaluate and refine a plan.

*   **Key elements:**
    1.  **Left Panel (Map):** An interactive map taking up ~30-40% of the screen. It displays pins and routes for the selected day.
    2.  **Center Panel (Timeline):** The main workspace (~40-50%). It is a vertical list of days (as tabs or an accordion). Within each day, there are event cards that can be dragged and dropped to change the order.
    3.  **Right Panel (Inspector/Details):** A contextual panel (~20-30%) that displays detailed information about the object selected on the map or in the timeline: photo, description of "why you will like it," opening hours, cost, reviews.

*   **Interaction:**
    1.  The user selects "Day 2" in the center panel.
    2.  The map on the left automatically updates to show the route for only that day.
    3.  He clicks on the "Azulejo Museum" card in the timeline. The card is highlighted, the map centers on the museum's pin, and the right panel instantly loads all information about it.
    4.  The user decides he wants to go to the museum after lunch. He simply drags the museum card below the restaurant card. The AI can then immediately recalculate the time and suggest updating the route on the map.
    *This is the most information-dense approach, minimizing clicks and switches between views.*

---
## Example of a user dashboard page concept

### **Concept 1: "Command Center" (Classic Dashboard)**

*   **Main idea:** This approach uses a familiar and effective dashboard layout, known from many web services (SaaS, productivity tools). The user immediately gets a full overview of all their activity and quick access to all key functions. This is a utilitarian, powerful, and clear interface for the user who has come to "get work done" — to plan.

*   **Key elements:**
    1.  **Left Navigation Panel (Sidebar):** A static menu for navigating the entire application: "Dashboard," "My Trips," "Inspiration," "Profile."
    2.  **Main Workspace:**
        *   **"Start Planning" Block:** The top and most prominent element. Contains a large text field for entering a query ("A 5-day trip to Lisbon...") and a "Create Plan" button.
        *   **"Upcoming Trips" Section:** A list of cards with plans the user is currently working on. Each card has a title, dates, and participant icons.
        *   **"Ideas for You" Section:** A dynamic block with suggestions and travel templates to inspire the user and demonstrate the AI's capabilities.

*   **Interaction:**
    1.  The user enters the page and immediately sees everything they need.
    2.  **If they want to create a new plan,** they use the main block at the top, enter a query, and click "Create." They are redirected to the **Main Planner Screen**.
    3.  **If they want to continue working on an existing plan,** they find the right card in the "Upcoming Trips" section and click on it to enter editing mode.
    4.  If they have no ideas, they can click on a card from the "Ideas" section, which will pre-fill the input field for them.

---
