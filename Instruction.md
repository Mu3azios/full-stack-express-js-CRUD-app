Project Documentation
Setup Instructions
1. Install Dependencies
From the root directory:

For the Backend:



cd backend
npm install
For the Frontend:



cd frontend
npm install
2. Database Setup

* Schema and Configuration:
The database schema is provided in the schema.sql file, located in the backend directory. Use this file to create and initialize the database.
A .env file is also included in the backend directory. Configure it with your database connection details:
plaintext

> DB_HOST=your_database_host
> DB_USER=your_database_user
> DB_PASSWORD=your_database_password
> DB_NAME=your_database_name
> DB_PORT=your_database_port
 Replace the placeholders with your actual database credentials.

3. Running the Backend Server
Ensure that nodemon is installed globally or locally in the project. To start the backend server:



``` npx nodemon app.js
The server will run at http://localhost:8080.

4. Running the Frontend
To start the frontend development server:



`npm run dev`

The frontend will run at the port specified in your development environment (e.g., http://localhost:5173).


# API Endpoints

- POST `http://localhost:8080/api/items`: Create a new item.
- GET `http://localhost:8080/api/items`: Retrieve all items.
- GET `http://localhost:8080/api/item/:id`: Retrieve an item by its ID.
- PUT `http://localhost:8080/api/item/:id`: Update an existing item by its ID.
- DELETE `http://localhost:8080/api/item/:id`: Delete an item by its ID.

Replace :id with the item's unique identifier.

# Technologies Used

- Frontend:
Material-UI: For UI components and styling.
Redux Toolkit: For state management.
- Backend:
Zod Library: For request validation and schema enforcement.
# Additional Notes
- Ensure both backend and frontend servers are running simultaneously to access the full functionality of the application.
- If you encounter any issues, double-check your .env configuration and ensure that all dependencies are installed.