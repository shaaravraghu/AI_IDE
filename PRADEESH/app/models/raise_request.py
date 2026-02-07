from datetime import datetime

class RaiseRequestModel:
    def __init__(self, module_name, description, raised_by):
        self.module_name = module_name
        self.description = description
        self.raised_by = raised_by
        self.status = "Open"
        self.created_at = datetime.now()
