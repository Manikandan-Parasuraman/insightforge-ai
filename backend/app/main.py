from fastapi import FastAPI
from app.routes import upload

app = FastAPI(
    title="InsightForge AI",
    description="CSV Insight Generator",
    version="1.0.0"
)

app.include_router(upload.router)

@app.get("/")
def root():
    return {"message": "InsightForge AI is running 🚀"}