from fastapi import APIRouter, HTTPException
from app.models.curate import CurateRequest, CurateResponse, Recommendation
from app.firestore import db
from app.gemini_client import model
import json

router = APIRouter(prefix="/api/curate", tags=["curate"])

@router.post("/", response_model=CurateResponse)
async def curate_recommendations(request: CurateRequest):
    try:
        goal_ref = db.collection("goals").document(request.goalId)
        goal_doc = goal_ref.get()
        
        if not goal_doc.exists:
            raise HTTPException(status_code=404, detail="Goal not found")
        
        goal = goal_doc.to_dict()
        
        prompt = f"""
        Based on these goals: {goal['parsedGoals']}
        Recommend:
        1. 2 media resources (videos, articles, podcasts)
        2. 1 knowledge resource (book, framework, concept)
        3. 1 experience (challenge, project, habit)
        4. 1 mentor (person to follow, community to join)
        
        Output JSON only:
        {{
            "media": [
                {{"title": "Title", "type": "video", "url": "https://..."}}
            ],
            "knowledge": [
                {{"title": "Title", "type": "book", "description": "Summary"}}
            ],
            "experiences": [
                {{"title": "Title", "type": "challenge", "description": "Details"}}
            ],
            "mentors": [
                {{"title": "Name", "type": "mentor", "description": "Platform"}}
            ]
        }}
        """
        
        response = model.generate_content(prompt)
        
        try:
            recommendations = json.loads(response.text)
        except:
            recommendations = {
                "media": [{"title": "Ted Talk on Public Speaking", "type": "video"}],
                "knowledge": [{"title": "The Pyramid Principle", "type": "book"}],
                "experiences": [{"title": "Join Toastmasters", "type": "challenge"}],
                "mentors": [{"title": "Simon Sinek", "type": "mentor"}]
            }
        
        media = [Recommendation(**item) for item in recommendations.get("media", [])]
        knowledge = [Recommendation(**item) for item in recommendations.get("knowledge", [])]
        experiences = [Recommendation(**item) for item in recommendations.get("experiences", [])]
        mentors = [Recommendation(**item) for item in recommendations.get("mentors", [])]
        
        return CurateResponse(
            goalId=request.goalId,
            media=media,
            knowledge=knowledge,
            experiences=experiences,
            mentors=mentors
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))