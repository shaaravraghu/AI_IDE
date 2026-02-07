from fastapi import APIRouter, HTTPException
from ..schemas.raise_schema import RaiseRequestSchema
from ..models.raise_request import RaiseRequestModel
from ..database import raise_requests_db

router = APIRouter(prefix="/raise-request", tags=["Raise Request"])

@router.post("/")
def create_raise_request(data: RaiseRequestSchema):
    request = RaiseRequestModel(**data.dict())
    raise_requests_db.append(request.__dict__)
    return {"message": "Raise request created"}

@router.get("/")
def get_raise_requests():
    return raise_requests_db

@router.put("/{index}/approve")
def approve_request(index: int):
    if index >= len(raise_requests_db):
        raise HTTPException(status_code=404, detail="Request not found")
    raise_requests_db[index]["status"] = "Approved"
    return {"message": "Request approved"}
