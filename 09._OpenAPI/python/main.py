from fastapi import FastAPI

app = FastAPI()

from routers import spacecrafts_router
app.include_router(spacecrafts_router)

from routers import users_router
app.include_router(users_router)