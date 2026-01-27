# AI-Driven Code Reviewer Backend

This repository contains the backend for an **AI-Driven Code Reviewer** built with **FastAPI**. The backend provides endpoints to manage timelines, raise requests, review requests, and commit history for a software project. It uses **Pydantic models** for data validation and in-memory storage.

---

## Features

- **Timeline Management**: Add and view project timelines.
- **Raise Requests**: Submit and approve raise requests for code modules.
- **Review Requests**: Submit and approve code review requests with optional comments.
- **Commit History**: Track commits with author, message, timestamp, and commit ID.
- **RESTful API**: Fully functional API with `/docs` for interactive testing.

---

## Tech Stack

- **Python 3.11+**
- **FastAPI** for the backend framework
- **Pydantic** for data validation
- **Uvicorn** as ASGI server

---

## Installation

1. **Clone the repository**
git clone https://github.com/Pradeeshph23/ai-code-reviewer-backend.git
cd ai-code-reviewer-backend

2.Create a virtual environment

python -m venv venv
source venv/bin/activate    # Linux/macOS
venv\Scripts\activate       # Windows

3.Install dependencies


pip install fastapi uvicorn pydantic

Running the Backend
Start the FastAPI server:


uvicorn main:app --reload
The backend will run at http://127.0.0.1:8000/

Interactive API docs available at http://127.0.0.1:8000/docs

API Endpoints
Timeline
POST /timeline/ – Add a new timeline

GET /timeline/ – View all timelines

Raise Requests
POST /raise-request/ – Create a raise request

POST /raise-request/approve/ – Approve a raise request

GET /raise-request/ – View all raise requests

Review Requests
POST /review-request/ – Submit a review request

POST /review-request/approve/ – Approve a review request with comments

GET /review-request/ – View all review requests

Commit History
POST /commit/ – Add a commit

GET /commit-history/ – View all commits

Data Storage
Currently, all data is stored in-memory using Python lists (data_store.py).

Note: Data will reset when the server restarts. For production, integrate with a database (SQLite, PostgreSQL, MongoDB, etc.).

backend/
│
├─ main.py           # FastAPI app with all endpoints
├─ models.py         # Pydantic models for validation
├─ services.py       # Core functions to handle business logic
├─ data_store.py     # In-memory data storage
└─ README.md
Future Improvements
Add persistent database storage.

Implement authentication and user management.

Add detailed error handling for invalid requests.

Integrate with a frontend dashboard.
