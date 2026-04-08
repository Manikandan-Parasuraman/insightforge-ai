from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.csv_service import analyze_csv
from app.utils.file_validator import validate_file

router = APIRouter(prefix="/api", tags=["Upload"])

@router.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    validate_file(file)

    contents = await file.read()

    with open("temp.csv", "wb") as f:
        f.write(contents)

    insights = analyze_csv("temp.csv")

    return {"status": "success", "data": insights}