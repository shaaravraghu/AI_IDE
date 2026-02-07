from pydantic import BaseModel
from typing import Optional

class ReviewRequestSchema(BaseModel):
    module_name: str
    reviewer: str
    comments: Optional[str] = None
