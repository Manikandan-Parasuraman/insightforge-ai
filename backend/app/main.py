from fastapi import FastAPI
from app.routes import upload
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="InsightForge AI",
    description="CSV Insight Generator",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router)

@app.get("/")
def root():
    return {"message": "InsightForge AI is running 🚀"}