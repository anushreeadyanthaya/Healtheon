# Healtheon

Healtheon is a full-stack Healthcare Management Platform developed to simplify and digitize healthcare workflows. The project focuses on building a secure, scalable, reliable, and user-friendly application using modern web technologies.

The objective of Healtheon is to provide a centralized platform where patients and healthcare providers can manage essential healthcare operations efficiently while maintaining security, privacy, and reliable access to information.

## Project Status

Healtheon is currently in the **finalization and deployment stage**.

### Current Progress

**Overall Project Progress: ~90%**

The core backend and frontend application have been completed and integrated successfully. The frontend has also been made production-buildable with configurable backend API connectivity.

The remaining work is focused mainly on:

* Final handbook and technical documentation
* Production deployment
* Final production/release verification
* Final project cleanup where required

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
* Login frontend interface
* Registration frontend interface
* Patient dashboard
* Profile interface
* Appointment interface
* Medical records interface
* Doctor dashboard
* Frontend authentication flow
* Frontend protected-page handling
* Frontend appointment management
* Frontend medical records integration
* Frontend doctor dashboard integration
* Frontend role-based doctor access
* Frontend loading and error states
* Frontend/backend API integration
* Centralized frontend API configuration
* Environment-based frontend backend URL configuration
* Production frontend build verification
* Frontend TypeScript verification
* Frontend static page generation verification
* Frontend changes committed to Git
* Frontend changes pushed to GitHub

### Remaining

* Production deployment
* Final production/release verification
* Final handbook and technical documentation completion
* Final project cleanup and optimization where required

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

The backend includes functionality for doctor-related operations and authenticated doctor access to relevant appointment information.

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

The current implementation includes:

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

A final security review will be performed before production deployment.

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

Local development uses:

```text
NEXT_PUBLIC_API_URL=http://localhost:5000
```

This prevents application pages from directly hard-coding the backend URL and makes the frontend suitable for deployment with a production backend URL.

The local environment file is excluded from Git using:

```text
.env*
```

## Frontend Production Verification

The frontend production build was successfully verified using:

```bash
npm run build
```

The build completed successfully with:

```text
✓ Compiled successfully
✓ Finished TypeScript
✓ Collecting page data
✓ Generating static pages (11/11)
✓ Finalizing page optimization
```

All major application routes were successfully recognized during the production build.

No frontend build errors were reported.

A Next.js workspace-root warning related to multiple `package-lock.json` files remains, but it does not prevent successful production compilation.

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

Frontend verification includes:

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
* Browser console verification
* Production build verification

The core application functionality has been successfully tested.

## Version Control

Healtheon uses Git and GitHub for version control.

The complete full-stack project is maintained in a single repository.

Development follows a commit-based workflow where meaningful completed changes are committed and pushed to GitHub.

Repository:

```text
https://github.com/anushreeadyanthaya/Healtheon.git
```

The latest frontend production-readiness changes were committed using:

```text
Make frontend API URL configurable
```

and successfully pushed to the `main` branch.

## Current Project Completion

| Area                           |   Status |
| ------------------------------ | -------: |
| Backend                        |     100% |
| Frontend                       |     100% |
| Database & APIs                |     100% |
| Authentication & Authorization |     100% |
| Appointments                   |     100% |
| Medical Records                |     100% |
| Doctor Functionality           |     100% |
| Frontend–Backend Integration   |     100% |
| Core Testing                   |     100% |
| Documentation                  |     ~75% |
| Deployment                     |  Pending |
| **Overall Project**            | **~90%** |

The application itself is essentially complete. The remaining project work is primarily release-oriented.

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

The following features are considered potential future enhancements and are **not part of the current completion scope**:

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

These features should only be considered after the current Healtheon release is completed.

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

The project handbook documents:

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

The handbook will be finalized as part of the remaining project completion work.

## Deployment

Production deployment has not yet been completed.

The deployment phase will include:

* Deploying the backend
* Configuring production environment variables
* Deploying the frontend
* Connecting the frontend to the production backend URL
* Verifying production API communication
* Performing final production testing
* Confirming authentication and protected routes in production

## Final Release Checklist

Before declaring Healtheon fully complete:

* [ ] Complete final handbook/documentation
* [ ] Deploy backend
* [ ] Deploy frontend
* [ ] Configure production API URL
* [ ] Verify production authentication
* [ ] Verify production appointments
* [ ] Verify production medical records
* [ ] Verify doctor functionality
* [ ] Perform final production security review
* [ ] Perform final end-to-end production verification
* [ ] Confirm final GitHub state

## Author

**Anushree Adyanthaya**

Second Year Computer Science Engineering Student
