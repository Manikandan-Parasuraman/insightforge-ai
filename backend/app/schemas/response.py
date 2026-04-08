from pydantic import BaseModel
from typing import Dict, Any

class InsightResponse(BaseModel):
    status: str
    data: Dict[str, Any]