from pydantic import BaseModel
from datetime import date

class TimelineSchema(BaseModel):
    phase_name: str
    description: str
    start_date: date
    end_date: date
    status: str
