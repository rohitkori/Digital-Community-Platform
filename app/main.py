from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.router import auth, quest

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, tags=['Auth'], prefix='/api/auth')
app.include_router(quest.router, tags=['Quest'], prefix='/api/quest')
@app.get("/api/healthchecker")
def root():
    return {"message": "Welcome to FastAPI with MongoDB"}