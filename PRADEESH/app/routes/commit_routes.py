from fastapi import APIRouter
from ..services.git_service import get_commit_history

router = APIRouter(prefix="/commit-history", tags=["Commit History"])

@router.get("/")
def commit_history():
    return get_commit_history()
