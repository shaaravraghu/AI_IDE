import subprocess

def get_commit_history(repo_path="."):
    try:
        result = subprocess.run(
            ["git", "log", "--pretty=format:%H|%an|%s|%ci"],
            cwd=repo_path,
            capture_output=True,
            text=True,
            check=True
        )

        commits = []
        for line in result.stdout.split("\n"):
            parts = line.split("|")
            if len(parts) == 4:
                commits.append({
                    "commit_hash": parts[0],
                    "author": parts[1],
                    "message": parts[2],
                    "timestamp": parts[3]
                })
        return commits
    except Exception as e:
        return {"error": str(e)}
