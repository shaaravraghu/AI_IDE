from datetime import date

class TimelineModel:
    def __init__(self, phase_name, description, start_date, end_date, status):
        self.phase_name = phase_name
        self.description = description
        self.start_date = start_date
        self.end_date = end_date
        self.status = status
