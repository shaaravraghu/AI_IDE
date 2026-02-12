#!/bin/bash
echo "Starting AI Code Reviewer Backend..."
cd "$(dirname "$0")"
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
