from fastapi import FastAPI
from .routes.timeline_routes import router as timeline_router
from .routes.raise_routes import router as raise_router
from .routes.review_routes import router as review_router
from .routes.commit_routes import router as commit_router

app = FastAPI(title="Backend Project Tracker")

app.include_router(timeline_router)
app.include_router(raise_router)
app.include_router(review_router)
app.include_router(commit_router)
