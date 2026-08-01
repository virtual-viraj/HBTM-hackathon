from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.firestore import db

router = APIRouter(prefix="/api/feedback", tags=["feedback"])

class FeedbackRequest(BaseModel):
    userId: str
    recommendationId: str
    feedback: str
    rating: int = 0

@router.post("/")
async def submit_feedback(request: FeedbackRequest):
    try:
        feedback_ref = db.collection("feedback").document()
        feedback_ref.set({
            "userId": request.userId,
            "recommendationId": request.recommendationId,
            "feedback": request.feedback,
            "rating": request.rating,
            "createdAt": firestore.SERVER_TIMESTAMP
        })
        
        return {
            "status": "success",
            "message": "Feedback recorded"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))