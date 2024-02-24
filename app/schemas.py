from datetime import datetime
from pydantic import BaseModel, EmailStr, constr
from typing import Optional, List

class BaseSchema(BaseModel):
    name: str
    email: str
    city: Optional[str] = None
    contact: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class CommunityManagerSchema(BaseSchema):
    quest_openning_applications: Optional[List[str]] = None
    password: constr(min_length=1)
    passwordConfirm: str

class UserBaseSchema(BaseSchema):
    # photo: Optional[str] = None
    dob: Optional[datetime] = None
    # specializations is a list of strings
    specializations: Optional[List[str]] = None
    completed_quests: Optional[List[str]] = None
    contribution_points: Optional[str] = None

    class Config:
        orm_mode = True

class CreateUserSchema(UserBaseSchema):
    password: constr(min_length=1)
    passwordConfirm: str
    verified: bool = False

class LoginUserSchema(BaseModel):
    email: EmailStr
    password: constr(min_length=1)

class UserResponseSchema(UserBaseSchema):
    id: str
    pass 

class UserResponse(BaseModel):
    status: str
    user: UserResponseSchema