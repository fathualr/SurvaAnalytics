from pydantic import BaseModel
from typing import Literal, Optional, Dict

class UserPrompt(BaseModel):
    prompt: str

class APIResponse(BaseModel):
    status: Literal['success', 'fail']
    message: str
    data: Optional[Dict]
