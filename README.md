# Task Manager

A Full-Stack Task Management Application built using React, Node.js, and Express.js.

The application allows users to create, update, delete, search, and manage tasks through a clean and responsive interface.

## Live Demo

Frontend:
https://task-managerproject9.netlify.app

Backend:
https://task-manager-yots.onrender.com

---

## Features

### Task Management
- Create tasks
- Edit tasks
- Delete tasks
- Mark tasks as completed/incomplete
- View all tasks

### Search Functionality
- Real-time task search
- Search suggestions dropdown
- Keyword highlighting

### User Experience
- Dark Mode / Light Mode
- Task statistics dashboard
- Form validation
- Success and error notifications
- Responsive design

---

## Technology Stack

### Frontend
- React.js
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- CORS

### Deployment
- Netlify
- Render

---

## Project Structure

```bash
Task-Manager/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── data/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── App.css
│   │
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## API Endpoints

### Get All Tasks

```http
GET /tasks
```

### Create Task

```http
POST /tasks
```

```json
{
  "title": "Learn React"
}
```

### Update Task

```http
PUT /tasks/:id
```

```json
{
  "title": "Updated Task"
}
```

### Delete Task

```http
DELETE /tasks/:id
```

### Toggle Task Status

```http
PATCH /tasks/:id/toggle
```

---

## Edge Cases Handled

- Empty task title validation
- Minimum character validation
- Maximum character validation
- Duplicate task prevention
- Invalid task ID handling
- Delete non-existing task
- Update non-existing task

---

## Installation and Setup

### Clone Repository

```bash
git clone https://github.com/Mdshahnawaz9/Task-Manager.git
cd Task-Manager
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

Runs on:

```bash
http://localhost:5000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Runs on:

```bash
http://localhost:5173
```

---

## Feature Status

| Feature | Status |
|----------|---------|
| Create Task | Completed |
| Read Tasks | Completed |
| Update Task | Completed |
| Delete Task | Completed |
| Toggle Status | Completed |
| Search Tasks | Completed |
| Search Suggestions | Completed |
| Statistics Dashboard | Completed |
| Dark Mode | Completed |
| Responsive Design | Completed |

---

## Author

Mohammed Shahnawaz

GitHub:
https://github.com/Mdshahnawaz9

LinkedIn:
https://www.linkedin.com/in/mohammed-shahnawaz0965

---

## License

This project was developed for learning, practice, and assessment purposes.
