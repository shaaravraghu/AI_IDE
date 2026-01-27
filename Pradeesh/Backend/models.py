from pydantic import BaseModel
from typing import List
from datetime import datetime

class Timeline(BaseModel):
    phase: str
    deadline: str
    status: str = "Pending"

class RaiseRequest(BaseModel):
    module: str
    description: str
    status: str = "Pending"

class ReviewRequest(BaseModel):
    module: str
    reviewer: str
    status: str = "Pending"
    comments: str = ""

class CommitHistory(BaseModel):
    commit_id: str
    message: str
    author: str
    timestamp: datetime
