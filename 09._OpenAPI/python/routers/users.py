from typing import Union
from fastapi import APIRouter, Query
from pydantic import BaseModel

router = APIRouter(tags=["Users"])

class User(BaseModel):
    id: int
    name: str
    age: int

users = [
    {"id": 1, "name": "John", "age": 25},
    {"id": 2, "name": "Jane", "age": 30},
]

@router.get("/users/{user_id}", summary="Get a user by id", response_model=User)
def get_user(user_id: int, show_id: Union[str, None] = Query("Default", max_length=50)):
    for user in users:
        if user["id"] == user_id:
            if show_id != "Default":
                return {"name": user["name"], "age": user["age"]}
            return user

@router.post("/users", summary="Create a new user", response_model=User)
def create_user(user: User):
    users.append(user)
    return user