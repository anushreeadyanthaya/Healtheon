# Healtheon

Healtheon is a full-stack Healthcare Management Platform developed to simplify and digitize healthcare workflows. The project focuses on providing a secure, scalable, reliable, and user-friendly application using modern web technologies.

The objective of Healtheon is to provide a centralized platform where patients and healthcare providers can manage essential healthcare operations efficiently while maintaining security, privacy, and reliable access to information.

## 🌍 Live Website

https://healtheon-frontend.onrender.com

## Project Status

Healtheon has been **successfully completed, deployed, and verified as a working full-stack healthcare application**.

The production frontend is connected to the deployed backend API, and the major patient and doctor workflows have been tested successfully.

The project is considered complete in its current scope. Additional features and improvements may be introduced in the future as the project evolves.

## Completed Features

### Backend

* Full project structure setup
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
* Role-based authorization
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
* Backend error handling
* PostgreSQL database operations
* REST API architecture

### Frontend

* Next.js frontend setup
* React and Tailwind CSS configuration
* Login interface
* Registration interface
* Patient dashboard
* Profile interface
* Appointment interface
* Medical records interface
* Doctor dashboard
* Frontend authentication flow
* Protected-page handling
* Frontend appointment management
* Frontend medical records integration
* Doctor dashboard integration
* Role-based doctor access
* Loading and error states
* Frontend/backend API integration
* Centralized frontend API configuration
* Environment-based backend URL configuration
* TypeScript verification
* Production frontend build verification
* Static page generation verification

### Production

* Backend production deployment
* Frontend production deployment
* Production API configuration
* Production patient workflow verification
* Production doctor workflow verification
* Production appointment verification
* Production medical record verification
* Production profile verification
* Production authentication verification
* Production frontend/backend communication verification

### Testing & Version Control

* API testing using Thunder Client
* Authentication testing
* Authorization testing
* Protected route testing
* Patient ownership validation testing
* Appointment testing
* Medical record testing
* Doctor workflow testing
* Frontend navigation testing
* Browser verification
* Production build verification
* Git version control
* GitHub repository integration
* Regular commits and project version tracking

## Technology Stack

### Frontend

* Next.js 16.3.0
* React
* TypeScript
* Tailwind CSS
* App Router
* Turbopack

### Backend

* Node.js
* Express.js
* JavaScript ES Modules

### Database

* PostgreSQL
* pgAdmin
* `pg` Node.js PostgreSQL client

### Authentication & Security

* JSON Web Token (JWT)
* bcrypt
* Protected API routes
* Role-based authorization
* Resource ownership validation
* Environment variables for sensitive configuration

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
│   ├── src/
│   │   ├── app/
│   │   │   ├── appointments/
│   │   │   ├── dashboard/
│   │   │   ├── doctor-dashboard/
│   │   │   ├── login/
│   │   │   ├── medical-records/
│   │   │   ├── profile/
│   │   │   └── register/
│   │   │
│   │   └── lib/
│   │       └── api.ts
│   │
│   ├── package.json
│   └── .env.local
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

The backend provides functionality for doctor-related operations and authenticated doctor access to relevant appointment information.

Doctor authorization is enforced through authenticated user roles.

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

The implementation includes:

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

The production application has also undergone functional security and authorization verification as part of the release process.

## API Architecture

Healtheon follows a modular REST API architecture.

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

## Backend API Modules

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

Protected endpoints require appropriate authentication and authorization.

## Frontend

The Healtheon frontend provides separate interfaces for patients and doctors.

### Main Frontend Routes

```text
/
 /login
 /register
 /dashboard
 /profile
 /appointments
 /medical-records
 /doctor-dashboard
```

### Patient Functionality

Patients can:

* Register and log in
* Access their dashboard
* View their profile
* Request appointments
* View appointments
* View medical records
* Navigate between protected healthcare sections

### Doctor Functionality

Doctors can:

* Log in using an authenticated account
* Access the Doctor Dashboard
* View relevant appointments
* Update appointment status
* Access functionality based on doctor authorization

### Frontend API Configuration

The frontend uses a centralized API configuration:

```text
frontend/src/lib/api.ts
```

The API base URL is controlled through:

```text
NEXT_PUBLIC_API_URL
```

For local development:

```text
NEXT_PUBLIC_API_URL=http://localhost:5000
```

The production environment uses the deployed backend API URL.

This prevents application pages from directly hard-coding the backend URL and allows the frontend to communicate with different backend environments through configuration.

## Production Verification

The frontend production build was successfully verified using:

```bash
npm run build
```

The build completed successfully with:

```text
✓ Compiled successfully
✓ Finished TypeScript
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

The major application routes were successfully recognized during the production build.

Production verification also included:

* User authentication
* Patient dashboard access
* Patient profile functionality
* Appointment creation and retrieval
* Medical records access
* Doctor authentication
* Doctor dashboard access
* Doctor appointment access
* Appointment status management
* Frontend/backend communication

## Testing

Backend APIs were tested using Thunder Client.

Testing included:

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

Frontend verification included:

* Login page
* Registration page
* Dashboard
* Profile
* Appointments
* Medical Records
* Doctor Dashboard
* Frontend navigation
* Authentication flow
* Protected page behavior
* Frontend/backend API communication
* Browser verification
* Production build verification

The core application functionality has been successfully tested in both development and production environments.

## Version Control

Healtheon uses Git and GitHub for version control.

The complete full-stack project is maintained in a single repository.

Development follows a commit-based workflow where meaningful completed changes are committed and pushed to GitHub.

Repository:

```text
https://github.com/anushreeadyanthaya/Healtheon.git
```

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

For local development, configure:

```text
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm run dev
```

The frontend runs locally on:

```text
http://localhost:3000
```

For production deployment, `NEXT_PUBLIC_API_URL` should point to the deployed backend URL.

## Documentation

Project documentation is maintained inside the `docs` directory.

The project handbook covers:

* Development environment setup
* Backend architecture
* Database design
* Authentication
* Authorization
* Medical records
* Appointment management
* Frontend architecture
* Frontend/backend integration
* Testing
* Version control
* Deployment
* Future enhancements

## Future Enhancements

Although the current Healtheon project has been completed and deployed, the platform can continue to evolve.

Possible future enhancements include:

* Real-time notifications
* Email or SMS appointment reminders
* Advanced doctor search
* Prescription management
* Advanced medical history
* Administrative dashboard
* Analytics and reporting
* Improved appointment scheduling
* Additional security enhancements
* Expanded healthcare workflows
* Additional production monitoring and optimization

These are future possibilities and are not required for the current completed project scope.

## Conclusion

Healtheon successfully demonstrates the development of a complete full-stack healthcare management platform.

The project combines:

* A modern Next.js frontend
* A modular Express.js backend
* PostgreSQL database integration
* JWT authentication
* Role-based authorization
* Patient and doctor workflows
* Appointment management
* Medical record management
* Production deployment
* Git and GitHub version control

The application has been successfully developed, tested, deployed, and verified as a working full-stack project.

Future improvements may be introduced as the platform continues to evolve.

## Author

**Anushree Adyanthaya**

Second Year Computer Science Engineering Student
