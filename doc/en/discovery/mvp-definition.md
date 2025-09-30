### **Example: MVP and DoD for the AI Planner "Localize"**
*Below is an example result of **Prompt #1** based on the artifacts from the Discovery phase.*

---

### **Part 1: MVP Features (MoSCoW)**

#### **Must-have**
*   **Generate itinerary from a text query:** Solves the main user "pain" — eliminates manual planning.
*   **View itinerary on a map and as a list:** Allows for a clear view of the plan both geographically and as a sequence of steps.
*   **User registration and authentication:** Necessary for saving generated plans.

#### **Should-have**
*   **Ability to edit the itinerary (delete points):** Gives the user flexibility and control, significantly increasing value.
*   **Save itineraries to the user profile:** Creates a reason to return to the product.

#### **Could-have**
*   **Share itinerary via a public link:** A potential channel for viral growth.
*   **Responsive design for mobile devices:** Improves usability during a trip.

#### **Won't-have (for this release)**
*   **Collaborative itinerary editing:** A technically complex feature for future versions.
*   **Offline mode:** Requires significant resources; an online version is sufficient for the start.

---

### **Part 2: Definition of Done (DoD) for the MVP**

*The team considers the MVP "Done" only if all items on this checklist are completed:*

#### **Functional Criteria**
- [ ] The user can register and log in to the system.
- [ ] The user can enter a text query and receive a generated itinerary.
- [ ] The itinerary is displayed on a map and as a list.
- [ ] The user can log out of their account.

#### **Code Quality Criteria**
- [ ] The code is covered by unit tests by at least 60%.
- [ ] All new components have undergone Code Review.
- [ ] There are no commented-out sections or hardcoded values in the code.

#### **Non-functional Criteria**
- [ ] **Performance:** The average itinerary generation time does not exceed 15 seconds.
- [ ] **Security:** User passwords are hashed.

#### **Testing Criteria**
- [ ] There are no bugs that block the main user scenario.
- [ ] The product has been tested and works correctly in the latest versions of Chrome and Safari.
