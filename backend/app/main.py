from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import aspirations, curate, identity, feedback, nudge

app = FastAPI(title="Self-Sculptor API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(aspirations.router)
app.include_router(curate.router)
app.include_router(identity.router)
app.include_router(feedback.router)
app.include_router(nudge.router)

@app.get("/")
async def root():
    return {
        "message": "Self-Sculptor API Running",
        "status": "ready",
        "endpoints": [
            "/api/aspirations",
            "/api/curate",
            "/api/identity/{userId}",
            "/api/feedback",
            "/api/nudge"
        ]
    }