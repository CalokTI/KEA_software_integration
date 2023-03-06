from typing import Union
from fastapi import APIRouter, Query
from pydantic import BaseModel

router = APIRouter(tags=["Spacecrafts"])

class Spacecraft(BaseModel):
    id: int
    name: str

spacecrafts = [
    {"id": 1, "name": "Voyager 1"},
    {"id": 2, "name": "Voyager 2"},
    {"id": 3, "name": "Cassini"},
    {"id": 4, "name": "Pioneer 10"},
    {"id": 5, "name": "Pioneer 11"},
    {"id": 6, "name": "New Horizons"},
    {"id": 7, "name": "Juno"},
    {"id": 8, "name": "Rosetta"},
    {"id": 9, "name": "Cassini"},
    {"id": 10, "name": "Viking 1"},
]

@router.get("/spacecrafts", summary="Get all spacecrafts", response_model=list[Spacecraft])
def get_spacecrafts():
    return spacecrafts

@router.get("/spacecrafts/{spacecraft_id}", summary="Get a spacecraft by id", response_model=Spacecraft)
async def get_spacecraft(spacecraft_id: int, show_id: Union[str, None] = Query("Default", max_length=50)):
    for spacecraft in spacecrafts:
        if spacecraft["id"] == spacecraft_id:
            if show_id != "Default":
                return {"name": spacecraft["name"]}
            return spacecraft

@router.post("/spacecrafts", summary="Create a new spacecraft", response_model=Spacecraft)
def create_spacecraft(spacecraft: Spacecraft):
    spacecrafts.append(spacecraft)
    return spacecraft