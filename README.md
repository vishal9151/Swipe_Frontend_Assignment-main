# Swipe_Frontend_Assignment

# Project Setup
To set up the project, follow these steps:
- Clone the repository.
- Navigate to the project directory in your terminal.
- Run the command npm install to install all the required dependencies.
- Start the project using ```npm start```.

# Code Flow
The project follows a structured flow to manage and edit invoices. Here's an overview:

# Landing Page
- Edit Invoices Button
   - Clicking the "Edit Invoices" button on the landing page triggers a modal.
- Modal Actions:
   - Select Invoices:
     - Users can choose invoices they want to edit in bulk.
   - Delete Selected Items:
     - Deletes the selected invoices from the available invoice list.
- Bulk Edit:
   - Clicking the "Edit Selected Items" button navigates the user to a different route ```http://localhost:3000/bulkEdit```.
   - Users can edit the selected invoices in bulk on this route.
  
# Invoice Details
- Individual Invoices:
   - Each invoice has an associated button.
   - Clicking the button opens a modal displaying items associated with that specific invoice.
- Modal Actions:
   - Bulk Edit Items:
     - Users can edit items in bulk within the modal.
     - Options to delete and add new items are available.
- Update Item List:
   - Clicking the "Update Item List" button closes the modal.
- Save Edit Changes:
   - After making edits, clicking the "Save Edit Changes" button redirects the user to the main page with the updated invoice list.

# Initial Data Display
- Random invoices are generated and displayed initially on the landing page to provide users with a realistic view.

# Deployment
- Link: <https://swipe-frontend-assignment.vercel.app/>

