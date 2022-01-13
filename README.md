# Inventory-Basics
A CRUD app made using REACT to manage inventory


## How To Run

### Prerequisites

1. Install NodeJs from https://nodejs.org/en/download/

### How to run
1. Clone the repository to your machine
2. Open 2 terminals and CD both terminals into the cloned folder
3. On the first terminal. CD into the client folder
    a. run `npm install`
    b. Then run `npm start`
4. On the second terminal. 
    a. CD into the server folder
    b. Set environement variables in the terminal. Paste the commands below in the second terminal 
        `export USER=kpuxdxflpigfhe`
        `export HOST=ec2-52-44-58-234.compute-1.amazonaws.com`
        `export DB=datt8mulmo4vhl`
        `export PASSWWORD=2bb74977aad1899cd2ffaa21692e07f81dbf08c53d93054212f64190542f1359`
        `export PORT=5432`
    c. run `node index.js`
    
    
    ### How to Use
    
    1. After running both the client and the server. The app will start on http://localhost:3000/
    2. Open a browser and navigate to http://localhost:3000/
    NOTE: Clicking on the blue "Inventory Basics" header redirects back to the home page (http://localhost:3000/)
    3. Here, a NEW ITEM can be added to the Inventory by filling in the form (make sure to fill in the required fields) and clicking on the "Add to Inventory" button
    4. Clicking on the "Expand Inventory Button +" displays a list of the items in the inventory. This list is displayed in a table
    5. Clicking on the "Download Inventory" button downloads the data as a CSV file.
    6. For each item row there are 2 options; Update and Delete
    7. Clicking on the "Delete" button removes the corresponding item from the inventory
    8. Clicking on the "Update" Button redirects to an update page for the corresponding item.
        a. It is mandatory to press the "Load Data" button to proceed, this fills in pre-existing information about the item
        b. Changes can be made the displayed fields. However, leaving a mandatory field empty would result in no updates being applied to the record.
        c. Clicking on the "Update Record" button will process the request on the backend. A success alert will be shown if the update is applied.
        d. Users can return to the main page by clicking on the blue "Inventory Basics" header
    
