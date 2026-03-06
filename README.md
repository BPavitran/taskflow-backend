# TaskFlow Backend API

TaskFlow is a task management backend API built with NestJS.  
It provides authentication, role-based authorization, and task management features with filtering, sorting, pagination, and search.

The project demonstrates clean backend architecture suitable for production-ready REST APIs.

---

## Tech Stack

- NestJS
- TypeORM
- PostgreSQL
- JWT (Authentication)
- Passport
- Swagger API Documentation
- Class Validator
- Class Transformer

---

## Features

### Authentication
- User registration
- User login
- JWT based authentication
- Protected routes using guards

### Authorization
- Role-based access control
- Admin vs User permissions

### Task Management
- Create tasks
- Update tasks
- Delete tasks
- View tasks

### Advanced API Capabilities
- Pagination (offset + limit)
- Filtering (status)
- Sorting (sortBy + order)
- Search (title)
- QueryBuilder for flexible queries

---

## API Documentation

Swagger documentation is available at:

```
http://localhost:3000/api
```

The port can be configured using the `PORT` environment variable.
---

## Environment Variables

Create a `.env` file based on the example:

```bash
cp .env.example .env
```

Then update the values according to your local environment.

---

## Prerequisites

- Node.js
- PostgreSQL

## Installation

Clone the repository:

```bash
git clone <repo-url>
```

Install dependencies:

```bash
npm install
```

---

## Running the Application

Start the development server:

```bash
npm run start:dev
```

The server will run at:

```bash
http://localhost:3000
```

The port can be configured using the `PORT` environment variable.

---

## Example API Endpoint

### Get Tasks

```
GET /tasks
```

Supports query parameters:
- search
- status
- sortBy
- order
- offset
- limit


Example request:

```
GET /tasks?search=meeting&status=OPEN&sortBy=createdAt&order=DESC&offset=0&limit=10
```

---

## Future Improvements

- Unit testing with Jest
- Rate limiting
- Docker support
- CI/CD pipeline

---

## Project Structure

```
src/
 ├── auth/
 ├── users/
 ├── tasks/
 └── common/
```