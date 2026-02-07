from fastapi import APIRouter
from ..schemas.review_schema import ReviewRequestSchema
from ..models.review_request import ReviewRequestModel
from ..database import review_requests_db

router = APIRouter(prefix="/review-request", tags=["Review Request"])

@router.post("/")
def create_review(data: ReviewRequestSchema):
    review = ReviewRequestModel(**data.dict())
    review_requests_db.append(review.__dict__)
    return {"message": "Review submitted"}

@router.get("/")
def get_reviews():
    return review_requests_db
