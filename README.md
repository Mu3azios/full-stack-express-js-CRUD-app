# Full Stack Express.js CRUD Application

A full-stack CRUD application built with **Express.js**, **MySQL**, and a modern **React** frontend.  
This project demonstrates clean API design, proper validation, scalable architecture, and effective state management.

## Tech Stack

### Backend
- Node.js
- Express.js
- MySQL
- Zod — request validation
- RESTful API architecture

### Frontend
- React
- Redux Toolkit — global state management
- Axios — API communication

## Backend Overview

### Database
- Uses MySQL as the primary database.
- Includes an `items` table with the following schema:
  - `id` — Primary key, auto-incremented
  - `name` — String, required, maximum 100 characters
  - `description` — String, optional, maximum 500 characters
  - `price` — Decimal, required, must be positive
  - `createdAt` — Timestamp, defaults to the current time
  - `updatedAt` — Timestamp, automatically updated on modification

### API Endpoints
- `POST /api/items` — Create a new item
- `GET /api/items` — Retrieve all items
- `GET /api/items/:id` — Retrieve a single item by ID
- `PUT /api/items/:id` — Update an existing item by ID
- `DELETE /api/items/:id` — Delete an item by ID

### Validation
- Incoming requests are validated using Zod to ensure data consistency and prevent invalid payloads.

### Code Organization
- Designed with a modular and scalable folder structure to support maintainability and future expansion.

## Frontend Overview

### Features
- Create new items using a form
- View all items in a structured table or list
- Edit existing items through a pre-filled update form
- Delete items with a confirmation prompt

### API Integration
- Communicates with the backend using Axios for asynchronous HTTP requests.

### State Management
- Uses Redux Toolkit to manage global application state in a predictable and efficient manner.
