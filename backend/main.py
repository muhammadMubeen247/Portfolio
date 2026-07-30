from fastapi import FastAPI
from routes.intro import router as about_router

app = FastAPI()

app.include_router(about_router)


@app.get("/")
async def greet():
    return "Hello"