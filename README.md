# Healtheon

Healtheon is a full-stack Healthcare Management Platform being developed to simplify and digitize healthcare workflows. The project focuses on building a secure, scalable, and production-ready application using modern web technologies.

The objective of this project is to provide a centralized platform where healthcare providers and patients can manage essential healthcare operations efficiently while maintaining security and reliability.

## Project Status

This project is currently under active development.

### Completed

* Backend project setup
* Express server configuration
* PostgreSQL database integration
* Environment variable configuration
* User registration and login
* Password hashing using bcrypt
* JWT-based authentication
* Protected API routes
* User profile API
* Role-based user data
* Doctor management API
* Appointment management API
* Appointment creation and retrieval
* Medical records API
* Patient ownership validation for medical records
* Modular backend architecture using controllers, models, routes, and middlewares
* Git and GitHub version control

### In Progress / Upcoming

* Frontend integration
* Patient dashboard
* Doctor dashboard
* Complete role-based access control
* Appointment frontend
* Medical records frontend
* Notifications
* Error handling improvements
* Production deployment
* Final testing and optimization

## Technology Stack

### Frontend

* Next.js
* React
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

### Authentication

* JSON Web Token (JWT)
* bcrypt

### Development Tools

* Git
* GitHub
* Thunder Client
* Visual Studio Code

## Project Structure

```text
Healtheon
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   └── validators
│   │
│   ├── package.json
│   └── .env
│
├── frontend
│
└── docs
```

## Backend Features

### Authentication

The authentication system provides:

* User registration
* User login
* Password hashing
* JWT token generation
* Protected routes
* Authenticated user profile access

### Doctor Management

The backend includes APIs for managing doctor information and doctor-related operations.

### Appointment Management

The appointment module provides functionality for:

* Creating appointments
* Retrieving patient appointments
* Retrieving individual appointments
* Authenticated appointment access

### Medical Records

The medical records module provides:

* Creating medical records
* Retrieving patient medical records
* Retrieving individual medical records
* Patient ownership validation
* JWT-protected access

## Goals

The primary goals of this project are:

* Build a production-ready full-stack application
* Learn scalable backend architecture
* Implement secure authentication and authorization
* Practice clean code and modular project structure
* Build real-world healthcare workflows
* Gain experience with deployment and version control

## Installation

Clone the repository

```bash
git clone https://github.com/anushreeadyanthaya/Healtheon.git
```

Navigate to the backend

```bash
cd Healtheon/backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file and configure the required environment variables.

Start the development server

```bash
npm run dev
```

## Author

Anushree Adyanthaya

Second Year Computer Science Engineering Student

```
```
