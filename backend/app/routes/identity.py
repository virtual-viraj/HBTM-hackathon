from fastapi import APIRouter
from app.firestore import get_document, save_document

router = APIRouter(prefix="/api", tags=["identity"])

@router.get("/identity/{user_id}")
async def get_identity(user_id: str):
    user_data = get_document("users", user_id) or {}
    
    profile = user_data.get("profile", {
        "goal": "AI Engineer",
        "target_role": "AI / ML Engineer",
        "current_skills": ["Python", "Git"],
        "target_skills": ["PyTorch", "Transformers", "System Design", "FastAPI"]
    })
    
    # Return identity avatar, level, mastery map & metrics
    identity_map = {
        "user_id": user_id,
        "identity_name": "AI Engineer Apprentice",
        "current_level": 4,
        "xp_current": 1450,
        "xp_next_level": 2000,
        "aspire_score": 78,
        "streak_days": 5,
        "traits": [
            {"name": "Consistency", "score": 85},
            {"name": "Problem Solving", "score": 72},
            {"name": "Curiosity", "score": 90},
            {"name": "Code Mastery", "score": 68}
        ],
        "node_map": [
            {"id": "node_1", "title": "Python & Git Fundamentals", "completed": True, "type": "foundation"},
            {"id": "node_2", "title": "Math & Linear Algebra", "completed": True, "type": "foundation"},
            {"id": "node_3", "title": "PyTorch & Neural Networks", "completed": False, "in_progress": True, "type": "core"},
            {"id": "node_4", "title": "LLM Fine-Tuning & Prompting", "completed": False, "type": "advanced"},
            {"id": "node_5", "title": "Production Deployment", "completed": False, "type": "capstone"}
        ],
        "profile": profile
    }
    
    return {
        "status": "success",
        "identity": identity_map
    }