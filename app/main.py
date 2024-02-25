from fastapi import FastAPI

from app.router import auth, quest

app = FastAPI()

app.include_router(auth.router, tags=['Auth'], prefix='/api/auth')
app.include_router(quest.router, tags=['Quest'], prefix='/api/quest')
@app.get("/api/healthchecker")
def root():
    return {"message": "Welcome to FastAPI with MongoDB"}