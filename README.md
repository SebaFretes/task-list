# Task List App

A simple **Task Management App** with authentication, task CRUD, and tests. Built with **React + TypeScript (Vite)** for the frontend, **NestJS + TypeScript** for the backend, and **Firebase** as the cloud database. Includes **unit and E2E tests**.  

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Installation](#installation)
- [IMPORTANT](#important)  
- [Running the Project](#running-the-project)  
- [Running Tests](#running-tests)  
- [Authentication & Logout](#authentication--logout)
- [Notes](#notes)  

---

## Features

- User authentication (login/register)  
- Protected routes using **JWT** (PrivateRoute)  
- Create, edit, delete tasks  
- Mark tasks as done  
- Logout functionality  
- Responsive UI with **Material UI**  
- Backend REST API protected by JWT  
- Unit tests with **Jest** (backend)  
- E2E tests with **Cypress** (frontend)  

---

## Tech Stack

**Frontend:**  

- React + TypeScript + Vite  
- React Router DOM  
- Material UI  
- Axios  

**Backend:**  

- NestJS + TypeScript  
- Firebase Firestore  
- JWT Authentication  
- Jest for unit tests  

**Testing:**  

- **Unit tests:** Jest (login, task CRUD)  
- **E2E tests:** Cypress (login, task creation, edit, mark done, deletion)  

---

## Installation

Clone the repository:

```bash
git clone https://github.com/SebaFretes/task-list.git
cd task-list

```

---

## IMPORTANT

Before running the backend, make sure to create a `.env` file in the `backend` folder with your Firebase credentials:

```env
FB_PROJECT_ID=your_project_id
FB_CLIENT_EMAIL=your_client_email
FB_PRIVATE_KEY=your_private_key
FIREBASE_API_KEY=your_firebase_api_key
```

---

## Running the Project

Backend
```bash
cd backend
yarn install
yarn start:dev
```

Frontend
```bash
cd frontend
yarn install
yarn dev
```

---

## Running Tests
Unit Tests (Backend)
```bash
cd backend
yarn test
```

Covers login, task CRUD operations, and validation.

E2E Tests (Frontend)
```bash
cd frontend
yarn cypress open
```

Select the tasks.cy.ts spec and run it.
Covers login, task creation, editing, marking done, and deletion.

---

## Authentication & Logout

User login/register handled via Firebase Authentication

Protected routes implemented with PrivateRoute

JWT stored in localStorage after login

Logout: clears the token from localStorage and redirects to login

---


## Notes

All tasks are currently visible to any logged-in user. For production, tasks should be associated with the logged-in user.

Cloud Firestore is used as the backend database.

Material UI ensures responsive design across devices.

Code is structured for clarity, maintainability, and readability.

Unit and E2E tests validate main functionalities.
