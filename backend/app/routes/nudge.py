from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.firestore import db
from app.gemini_client import model
import json

router = APIRouter(prefix="/api/nudge", tags=["nudge"])

class NudgeRequest(BaseModel):
    userId: str
    context: str

@router.post("/")
async def generate_nudge(request: NudgeRequest):
    try:
        goals = db.collection("goals").where("userId", "==", request.userId).stream()
        goal_list = []
        for goal in goals:
            goal_list.append(goal.to_dict())
        
        if not goal_list:
            return {"message": "No goals found", "action": "Create a goal first"}
        
        goal = goal_list[0]
        
        prompt = f"""
        Generate a contextual nudge for this scenario:
        User: {request.userId}
        Context: {request.context}
        Goal: {goal['idealSelf']}
        
        Output JSON only:
        {{
            "message": "Your personalized nudge message",
            "action": "Suggested action"
        }}
        """
        
        response = model.generate_content(prompt)
        
        try:
            nudge = json.loads(response.text)
        except:
            nudge = {
                "message": f"Hey! Let's get back on track with your goal: {goal['idealSelf']}",
                "action": "Check your daily plan"
            }
        
        nudge_ref = db.collection("nudges").document()
        nudge_ref.set({
            "userId": request.userId,
            "goalId": goal.get("goalId", ""),
            "message": nudge["message"],
            "action": nudge["action"],
            "type": request.context,
            "sentAt": firestore.SERVER_TIMESTAMP,
            "isDismissed": False
        })
        
        return nudge
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))