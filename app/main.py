from fastapi import FastAPI

from app.router import auth

app = FastAPI()

app.include_router(auth.router, tags=['Auth'], prefix='/api/auth')

@app.get("/api/healthchecker")
def root():
    return {"message": "Welcome to FastAPI with MongoDB"}