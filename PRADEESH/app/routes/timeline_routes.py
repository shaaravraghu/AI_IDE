from fastapi import APIRouter
from ..schemas.timeline_schema import TimelineSchema
from ..models.timeline import TimelineModel
from ..database import timeline_db

router = APIRouter(prefix="/timeline", tags=["Timeline"])

@router.post("/")
def create_timeline(data: TimelineSchema):
    timeline = TimelineModel(**data.dict())
    timeline_db.append(timeline.__dict__)
    return {"message": "Timeline added successfully"}

@router.get("/")
def get_timeline():
    return timeline_db
