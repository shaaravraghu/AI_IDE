from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.timeline_routes import router as timeline_router
from .routes.raise_routes import router as raise_router
from .routes.review_routes import router as review_router
from .routes.commit_routes import router as commit_router

app = FastAPI(title="Backend Project Tracker")

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://localhost:*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(timeline_router)
app.include_router(raise_router)
app.include_router(review_router)
app.include_router(commit_router)
