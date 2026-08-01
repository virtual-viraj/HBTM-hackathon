from pydantic import BaseModel
from typing import Optional, List

class AspirationRequest(BaseModel):
    userId: str
    idealSelf: str
    currentSelf: str
    timeline: Optional[str] = "3 months"

class AspirationResponse(BaseModel):
    goalId: str
    parsedGoals: List[dict]
    suggestedTimeline: str