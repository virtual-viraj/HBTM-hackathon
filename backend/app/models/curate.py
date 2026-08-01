from pydantic import BaseModel
from typing import List, Optional

class CurateRequest(BaseModel):
    goalId: str
    context: Optional[str] = "first week"

class Recommendation(BaseModel):
    title: str
    type: str
    url: Optional[str] = None
    description: Optional[str] = None

class CurateResponse(BaseModel):
    goalId: str
    media: List[Recommendation]
    knowledge: List[Recommendation]
    experiences: List[Recommendation]
    mentors: List[Recommendation]