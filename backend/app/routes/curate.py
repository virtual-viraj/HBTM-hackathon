from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any
from app.firestore import save_document, get_document
from ai_service import generate_recommendations

router = APIRouter(prefix="/api", tags=["curate"])

class CurateRequest(BaseModel):
    user_id: Optional[str] = "demo_user"
    user_profile: Optional[Dict[str, Any]] = None

@router.post("/curate")
async def curate_resources(payload: CurateRequest):
    user_id = payload.user_id or "demo_user"
    profile = payload.user_profile
    
    if not profile:
        user_data = get_document("users", user_id)
        if user_data and "profile" in user_data:
            profile = user_data["profile"]
        else:
            profile = {
                "goal": "Software Engineer",
                "current_skills": ["Python", "Git"],
                "daily_commitment": "2 hours",
                "preferences": ["YouTube videos", "Hands-on projects"]
            }
            
    recommendations = generate_recommendations(profile)
    
    save_document("users", user_id, {
        "recommendations": recommendations
    })
    
    return {
        "status": "success",
        "user_id": user_id,
        "recommendations": recommendations
    }