from fastapi import APIRouter
from app.src.schemas.survey_structure_generation import UserPrompt, APIResponse
from app.src.services.survey_structure_generation_service import generate

router = APIRouter(prefix="/survey-structure", tags=["SurveyStructureGeneration"])

@router.post("/generate", response_model=APIResponse)
def generate_survey_structure(payload: UserPrompt):
    result = generate(payload.prompt)
    return APIResponse(status="success", message="Generated successfully", data=result)
