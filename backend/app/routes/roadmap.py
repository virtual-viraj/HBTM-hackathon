from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, Dict, Any
from app.firestore import save_document, get_document
from ai_service import generate_roadmap

router = APIRouter(prefix="/api", tags=["roadmap"])

class RoadmapRequest(BaseModel):
    user_id: Optional[str] = "demo_user"
    user_profile: Optional[Dict[str, Any]] = None

@router.post("/roadmap")
async def create_roadmap(payload: RoadmapRequest):
    user_id = payload.user_id or "demo_user"
    profile = payload.user_profile
    
    if not profile:
        user_data = get_document("users", user_id)
        if user_data and "profile" in user_data:
            profile = user_data["profile"]
        else:
            profile = {
                "goal": "AI Engineer",
                "current_skills": ["Python", "Git"],
                "daily_commitment": "2 hours"
            }
            
    roadmap_data = generate_roadmap(profile)
    
    save_document("users", user_id, {
        "roadmap": roadmap_data
    })
    
    return {
        "status": "success",
        "user_id": user_id,
        "roadmap": roadmap_data
    }
