from fastapi import FastAPI
from services import *
from data_store import timelines, raise_requests, review_requests, commit_history

app = FastAPI(title="AI Code Reviewer Backend")

@app.post("/timeline/")
def create_timeline(phase: str, deadline: str):
    add_timeline(phase, deadline)
    return {"message": "Timeline added"}

@app.get("/timeline/")
def view_timeline():
    return timelines

@app.post("/raise-request/")
def raise_request(module: str, description: str):
    create_raise_request(module, description)
    return {"message": "Raise request created"}

@app.post("/raise-request/approve/")
def approve_rr(index: int):
    approve_raise_request(index)
    return {"message": "Raise request approved"}

@app.get("/raise-request/")
def view_rr():
    return raise_requests

@app.post("/review-request/")
def review_request(module: str, reviewer: str):
    create_review_request(module, reviewer)
    return {"message": "Review request submitted"}

@app.post("/review-request/approve/")
def approve_review(index: int, comments: str = "Approved"):
    approve_review_request(index, comments)
    return {"message": "Review approved"}

@app.get("/review-request/")
def view_reviews():
    return review_requests

@app.post("/commit/")
def commit(message: str, author: str):
    add_commit(message, author)
    return {"message": "Commit added"}

@app.get("/commit-history/")
def view_commits():
    return commit_history

@app.get("/")
def home():
    return {
        "message": "AI-Driven Code Reviewer Backend is running",
        "docs": "Visit /docs for API documentation"
    }
