class CommitHistoryModel:
    def __init__(self, commit_hash, author, message, timestamp):
        self.commit_hash = commit_hash
        self.author = author
        self.message = message
        self.timestamp = timestamp
