from fastapi import APIRouter, HTTPException
from app.firestore import db

router = APIRouter(prefix="/api/identity", tags=["identity"])

@router.get("/{userId}")
async def get_identity(userId: str):
    try:
        goals = db.collection("goals").where("userId", "==", userId).stream()
        
        overall_progress = 0
        total_goals = 0
        dimensions = {}
        
        for goal in goals:
            data = goal.to_dict()
            total_goals += 1
            
            if "progress" in data and "overall" in data["progress"]:
                overall_progress += data["progress"]["overall"]
            
            if "parsedGoals" in data:
                for g in data["parsedGoals"]:
                    if g["status"] == "completed":
                        dimensions[g["name"]] = 100
                    else:
                        dimensions[g["name"]] = 50
        
        if total_goals > 0:
            overall_progress = overall_progress // total_goals
        
        return {
            "userId": userId,
            "progress": {
                "overall": overall_progress,
                "dimensions": dimensions
            },
            "history": [
                {"date": "2026-08-01", "overall": 40}
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))