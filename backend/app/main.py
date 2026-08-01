import sys
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Ensure ai package directory is in sys.path
backend_dir = Path(__file__).resolve().parent.parent
root_dir = backend_dir.parent
ai_dir = root_dir / "ai"
if str(ai_dir) not in sys.path:
    sys.path.insert(0, str(ai_dir))

from app.routes import aspirations, curate, roadmap, nudge, journal, identity

app = FastAPI(
    title="Self-Sculptor (AspireFlow) API",
    description="FastAPI Backend integrating Gemini AI engine for personalized skill growth & roadmap orchestration.",
    version="1.0.0"
)

# CORS Middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(aspirations.router)
app.include_router(curate.router)
app.include_router(roadmap.router)
app.include_router(nudge.router)
app.include_router(journal.router)
app.include_router(identity.router)

@app.get("/")
async def root():
    return {
        "app": "Self-Sculptor (AspireFlow) Backend API",
        "status": "online",
        "endpoints": [
            "/api/aspirations",
            "/api/curate",
            "/api/roadmap",
            "/api/nudge",
            "/api/journal",
            "/api/identity/{user_id}",
            "/docs"
        ]
    }