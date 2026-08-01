from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from app.firestore import save_document
from ai_service import analyze_journal

router = APIRouter(prefix="/api", tags=["journal"])

class JournalRequest(BaseModel):
    user_id: Optional[str] = "demo_user"
    journal_entry: str

@router.post("/journal")
async def process_journal(payload: JournalRequest):
    if not payload.journal_entry:
        raise HTTPException(status_code=400, detail="journal_entry field is required.")
        
    analysis = analyze_journal(payload.journal_entry)
    user_id = payload.user_id or "demo_user"
    
    save_document("journals", f"{user_id}_latest", {
        "user_id": user_id,
        "entry": payload.journal_entry,
        "analysis": analysis
    })
    
    return {
        "status": "success",
        "user_id": user_id,
        "analysis": analysis
    }
