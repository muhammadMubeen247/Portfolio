import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.intro import router as about_router

app = FastAPI()

# Comma-separated list of allowed frontend origins, e.g.
# "https://myportfolio.vercel.app,https://myportfolio-git-main-myuser.vercel.app"
# Set this via `fastapi cloud env set FRONTEND_ORIGINS "..."` in production.
_origins = os.environ.get("FRONTEND_ORIGINS", "")
allow_origins = [origin.strip() for origin in _origins.split(",") if origin.strip()] or [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(about_router)


@app.get("/")
async def greet():
    return "Hello"