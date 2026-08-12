# Healtheon

Healtheon is a full-stack Healthcare Management Platform being developed to simplify and digitize healthcare workflows. The project focuses on building a secure, scalable, and reliable application using modern web technologies.

The objective of Healtheon is to provide a centralized platform where patients and healthcare providers can manage essential healthcare operations efficiently while maintaining security, privacy, and reliable access to information.

## Project Status

Healtheon is currently under active development.

### Current Progress

**Overall Project Progress: ~83%**

The core backend functionality has been completed. The remaining work is focused mainly on frontend integration, complete user flows, testing, UI/UX refinement, deployment, and final documentation.

### Completed

* Full project structure setup
* Next.js frontend setup
* React and Tailwind CSS configuration
* Express.js backend setup
* PostgreSQL database integration
* Environment variable configuration
* Modular backend architecture
* User registration
* User login
* Password hashing using bcrypt
* JWT-based authentication
* JWT verification middleware
* Protected API routes
* Role-based user data
* User profile retrieval
* User profile update
* Doctor management functionality
* Appointment creation
* Patient appointment retrieval
* Individual appointment retrieval
* Doctor appointment retrieval
* Appointment status management
* Medical record creation
* Patient medical record retrieval
* Individual medical record retrieval
* Patient ownership validation
* Appointment ownership and authorization checks
* Error handling for backend operations
* PostgreSQL database operations
* API testing using Thunder Client
* Git version control
* GitHub repository integration
* Regular commits and project version tracking

### Remaining

* Complete frontend-backend integration
* Complete patient dashboard functionality
* Complete doctor dashboard functionality
* Frontend authentication flows
* Frontend appointment management
* Frontend medical records interface
* Complete frontend role-based navigation and protection
* Loading and error states
* Responsive UI refinement
* Full end-to-end testing
* Final security review
* Production deployment
* Final documentation and handbook
* Final project cleanup and optimization

## Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* App Router

### Backend

* Node.js
* Express.js
* JavaScript ES Modules

### Database

* PostgreSQL
* pgAdmin

### Authentication & Security

* JSON Web Token (JWT)
* bcrypt
* Protected API routes
* Role-based authorization
* Resource ownership validation

### Development & Version Control

* Visual Studio Code
* Git
* GitHub
* Thunder Client
* Nodemon

## Project Structure

```text
Healtheon/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validators/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
├── frontend/
│
├── docs/
│
├── .gitignore
├── package.json
└── package-lock.json
```

## Backend Features

### Authentication

The authentication system provides:

* User registration
* User login
* Secure password hashing
* JWT token generation
* JWT token verification
* Protected API routes
* Authenticated profile access
* Profile updates
* Duplicate email handling
* Invalid credential handling

### User Management

Authenticated users can:

* Retrieve their profile
* Update permitted profile information
* Access information associated with their authenticated account

Sensitive information such as stored passwords is not returned through profile APIs.

### Doctor Management

The backend includes functionality for doctor-related operations and authenticated doctor access to relevant appointment information.

### Appointment Management

The appointment module provides functionality for:

* Creating appointments
* Retrieving patient appointments
* Retrieving individual appointments
* Retrieving doctor appointments
* Updating appointment status
* Patient ownership validation
* Doctor authorization
* JWT-protected access

### Medical Records

The medical records module provides:

* Creating medical records
* Retrieving patient medical records
* Retrieving individual medical records
* Patient ownership validation
* JWT-protected access
* PostgreSQL-based data storage

## Security

Security is an important part of Healtheon because the platform handles healthcare-related information.

The current backend implementation includes:

* Password hashing using bcrypt
* JWT-based authentication
* Protected API endpoints
* Role-based authorization
* Server-side identity verification
* Patient ownership validation
* Appointment authorization
* Environment variables for sensitive configuration
* Database-level data access
* Password exclusion from profile responses

The security implementation will undergo an additional review before production deployment.

## API Development

The Healtheon backend follows a modular REST API architecture.

The general request flow is:

```text
Client
   ↓
Route
   ↓
Authentication Middleware
   ↓
Controller
   ↓
Model
   ↓
PostgreSQL
   ↓
Response
```

This separation improves maintainability, readability, testing, and scalability.

## Current Backend API Modules

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### User Profile

```text
GET /api/users/profile
PUT /api/users/profile
```

### Medical Records

```text
POST /api/medical-records
GET /api/medical-records
GET /api/medical-records/:id
```

### Appointments

```text
POST /api/appointments
GET /api/appointments
GET /api/appointments/:id
```

Additional doctor appointment and appointment-status operations are implemented through the appointment module.

All protected endpoints require appropriate authentication and authorization.

## Testing

Backend APIs have been tested using Thunder Client.

Testing performed includes:

* User registration
* User login
* Invalid login credentials
* JWT generation
* JWT verification
* Protected profile access
* Profile updates
* Medical record creation
* Medical record retrieval
* Patient ownership validation
* Appointment creation
* Appointment retrieval
* Doctor appointment access
* Appointment status updates
* Invalid appointment requests
* Unauthorized access attempts

The core backend tests have passed successfully.

## Goals

The primary goals of Healtheon are:

* Build a practical full-stack healthcare application
* Implement secure authentication and authorization
* Develop real-world healthcare workflows
* Practice scalable backend architecture
* Maintain a clean and modular project structure
* Connect frontend and backend systems
* Gain practical experience with PostgreSQL
* Use professional Git and GitHub workflows
* Deploy the application
* Produce complete technical documentation

## Future Enhancements

Potential future improvements include:

* Real-time notifications
* Email or SMS appointment reminders
* Advanced doctor search
* Prescription management
* Advanced medical history
* Administrative dashboard
* Analytics and reporting
* Improved appointment scheduling
* Additional security enhancements
* Cloud deployment and production monitoring

## Installation

### Clone the Repository

```bash
git clone https://github.com/anushreeadyanthaya/Healtheon.git
```

### Navigate to the Project

```bash
cd Healtheon
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory and configure the required environment variables.

Start the backend development server:

```bash
npm run dev
```

The backend runs locally on:

```text
http://localhost:5000
```

### Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd Healtheon/frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend runs locally on:

```text
http://localhost:3000
```

## Version Control

Healtheon uses Git and GitHub for version control.

The complete full-stack project is maintained in a single repository.

Development follows a commit-based workflow where meaningful completed changes are committed and pushed to GitHub.

Repository:

```text
https://github.com/anushreeadyanthaya/Healtheon
```

## Documentation

Project documentation is maintained inside the `docs` directory.

The project handbook documents:

* Development environment setup
* Backend architecture
* Database design
* Authentication
* Authorization
* Medical records
* Appointment management
* Testing
* Version control
* Deployment
* Future enhancements

## Author

**Anushree Adyanthaya**

Second Year Computer Science Engineering Student
