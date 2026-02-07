from datetime import datetime

class ReviewRequestModel:
    def __init__(self, module_name, reviewer, comments=None):
        self.module_name = module_name
        self.reviewer = reviewer
        self.comments = comments
        self.status = "Reviewed"
        self.reviewed_at = datetime.now()
