from pydantic import BaseModel

class RaiseRequestSchema(BaseModel):
    module_name: str
    description: str
    raised_by: str
