from models import Timeline, RaiseRequest, ReviewRequest, CommitHistory
from data_store import timelines, raise_requests, review_requests, commit_history
from datetime import datetime
import uuid

def add_timeline(phase, deadline):
    timelines.append(Timeline(phase=phase, deadline=deadline))

def create_raise_request(module, description):
    raise_requests.append(RaiseRequest(module=module, description=description))

def approve_raise_request(index):
    raise_requests[index].status = "Approved"

def create_review_request(module, reviewer):
    review_requests.append(ReviewRequest(module=module, reviewer=reviewer))

def approve_review_request(index, comments="Approved"):
    review_requests[index].status = "Approved"
    review_requests[index].comments = comments

def add_commit(message, author):
    commit_history.append(
        CommitHistory(
            commit_id=str(uuid.uuid4())[:8],
            message=message,
            author=author,
            timestamp=datetime.now()
        )
    )
