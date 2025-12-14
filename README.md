# Task List App

A simple Task Management App with authentication, task CRUD, and tests. Built with **React + TypeScript (Vite)** for the frontend, **NestJS + TypeScript** for the backend, and **Firebase** as the cloud database. Includes **unit and E2E tests**.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Installation](#installation)  
- [Running the Project](#running-the-project)  
- [Running Tests](#running-tests)  
- [Authentication](#authentication)  
- [Notes](#notes)  

---

## Features

- User authentication (login/register)  
- Protected routes with token (PrivateRoute)  
- Create, edit, delete tasks  
- Mark tasks as done  
- Responsive UI with **Material UI**  
- Backend REST API protected by JWT  
- Unit tests with **Jest**  
- E2E tests with **Cypress**  

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

- Unit tests: Jest  
- E2E tests: Cypress  

---

## Installation

Clone the repository:

```bash
git clone https://github.com/SebaFretes/task-list.git
cd task-list

Backend
cd backend
yarn install

Frontend
cd frontend
yarn install

Running the Project
Backend
cd backend
yarn start:dev


Server will run at http://localhost:3000

Frontend
cd frontend
yarn dev


Frontend will run at http://localhost:5173

Running Tests
Unit Tests (Backend)
cd backend
yarn test

E2E Tests (Frontend)
cd frontend
yarn cypress open


Then select the tasks.cy.ts spec and run it.

The test will cover login, task creation, editing, marking done, and deletion.
