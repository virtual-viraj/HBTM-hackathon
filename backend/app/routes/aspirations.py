from fastapi import APIRouter, HTTPException
from app.models.aspirations import AspirationRequest, AspirationResponse
from app.firestore import db
from app.gemini_client import model
import json

router = APIRouter(prefix="/api/aspirations", tags=["aspirations"])

@router.post("/", response_model=AspirationResponse)
async def create_aspiration(request: AspirationRequest):
    try:
        prompt = f"""
        Parse this aspiration into structured goals:
        Ideal Self: {request.idealSelf}
        Current Self: {request.currentSelf}
        
        Output JSON only:
        {{
            "goals": [
                {{"name": "Goal 1", "status": "active"}},
                {{"name": "Goal 2", "status": "active"}}
            ],
            "timeline": "X months"
        }}
        """
        
        response = model.generate_content(prompt)
        
        try:
            parsed = json.loads(response.text)
        except:
            parsed = {
                "goals": [{"name": "Confidence", "status": "active"}],
                "timeline": "3 months"
            }
        
        goal_ref = db.collection("goals").document()
        goal_ref.set({
            "userId": request.userId,
            "idealSelf": request.idealSelf,
            "currentSelf": request.currentSelf,
            "parsedGoals": parsed["goals"],
            "timeline": parsed["timeline"],
            "progress": {"overall": 0},
            "status": "active",
            "createdAt": firestore.SERVER_TIMESTAMP
        })
        
        return AspirationResponse(
            goalId=goal_ref.id,
            parsedGoals=parsed["goals"],
            suggestedTimeline=parsed["timeline"]
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{userId}")
async def get_aspirations(userId: str):
    try:
        goals = db.collection("goals").where("userId", "==", userId).stream()
        result = []
        for goal in goals:
            data = goal.to_dict()
            data["goalId"] = goal.id
            result.append(data)
        return {"userId": userId, "goals": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))