from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, Dict, Any
from app.firestore import save_document, get_document
from ai_service import generate_nudge

router = APIRouter(prefix="/api", tags=["nudge"])

class NudgeRequest(BaseModel):
    user_id: Optional[str] = "demo_user"
    context: Optional[Dict[str, Any]] = None

@router.post("/nudge")
async def get_nudge(payload: NudgeRequest):
    user_id = payload.user_id or "demo_user"
    context = payload.context
    
    if not context:
        user_data = get_document("users", user_id)
        profile = user_data.get("profile", {}) if user_data else {}
        context = {
            "goal": profile.get("goal", "AI Engineer"),
            "weekly_progress": 65,
            "days_inactive": 1,
            "mood": "Motivated"
        }
        
    nudge_res = generate_nudge(context)
    
    save_document("users", user_id, {
        "latest_nudge": nudge_res
    })
    
    return {
        "status": "success",
        "user_id": user_id,
        "nudge": nudge_res
    }