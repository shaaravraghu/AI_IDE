🚀 Backend Project Management System

A FastAPI-based backend system to manage project timelines, raise requests, review requests, and Git commit history.
This project follows a clean modular architecture suitable for academic projects, internships, and real-world backend systems.

📌 Features

📅 Project Timeline Management

🚨 Raise Request Workflow

🔍 Review Request Handling

🌱 Git Commit History Tracking

🧩 Modular & Scalable Architecture

📄 Auto-generated API documentation (Swagger)

🛠 Tech Stack

Backend Framework: FastAPI

Language: Python 3.10+

Validation: Pydantic

Server: Uvicorn

Version Control: Git

📂 Project Structure
backend/
│── app/
│   ├── main.py
│   ├── database.py
│   ├── models/
│   │   ├── timeline.py
│   │   ├── raise_request.py
│   │   ├── review_request.py
│   │   └── commit_history.py
│   ├── schemas/
│   │   ├── timeline_schema.py
│   │   ├── raise_schema.py
│   │   └── review_schema.py
│   ├── services/
│   │   └── git_service.py
│   ├── routes/
│   │   ├── timeline_routes.py
│   │   ├── raise_routes.py
│   │   ├── review_routes.py
│   │   └── commit_routes.py
│── requirements.txt
│── README.md

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone <your-repository-url>
cd backend

2️⃣ Create Virtual Environment (Optional but Recommended)
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows

3️⃣ Install Dependencies
pip install -r requirements.txt

▶️ Running the Application
uvicorn app.main:app --reload


📍 Server will run at:
http://127.0.0.1:8000

📘 Swagger API Docs:
http://127.0.0.1:8000/docs

🔗 API Endpoints Overview
Timeline

POST /timeline/ – Add project phase

GET /timeline/ – View timeline

Raise Request

POST /raise-request/ – Create request

GET /raise-request/ – View requests

PUT /raise-request/{index}/approve – Approve request

Review Request

POST /review-request/ – Submit review

GET /review-request/ – View reviews

Commit History

GET /commit-history/ – View Git commit logs

🧠 Use Case

This system helps:

Track backend project progress

Manage developer requests and approvals

Handle mentor or reviewer feedback

Monitor Git commit history for auditing

🔮 Future Enhancements

Database integration (SQLite / PostgreSQL)

JWT Authentication & Role-based Access

GitHub API integration

Frontend integration (React / Vite)

Deployment with Docker

👨‍💻 Author

Pradeesh
Backend Developer
