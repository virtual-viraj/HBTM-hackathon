from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from app.firestore import save_document, get_document
from ai_service import parse_aspiration

router = APIRouter(prefix="/api", tags=["aspirations"])

class AspirationRequest(BaseModel):
    user_id: Optional[str] = "demo_user"
    user_input: str

@router.post("/aspirations")
async def create_aspiration(payload: AspirationRequest):
    if not payload.user_input:
        raise HTTPException(status_code=400, detail="user_input field is required.")
    
    parsed_profile = parse_aspiration(payload.user_input)
    
    user_id = payload.user_id or "demo_user"
    save_document("users", user_id, {
        "profile": parsed_profile,
        "raw_aspiration": payload.user_input
    })
    
    return {
        "status": "success",
        "user_id": user_id,
        "profile": parsed_profile
    }

@router.get("/aspirations/{user_id}")
async def get_aspiration(user_id: str):
    data = get_document("users", user_id)
    if not data:
        return {"status": "not_found", "profile": None}
    return {"status": "success", "profile": data.get("profile")}