from datetime import datetime
from pydantic import BaseModel, EmailStr, constr
from typing import Optional

class UserBaseSchema(BaseModel):
    name: str
    email: str
    photo: str
    # declare role as optional
    role: Optional[str] = None
    # role: str | None = None # this is generating error
    created_at: Optional[datetime] = None
    # created_at: datetime | None = None
    updated_at: Optional[datetime] = None
    # updated_at: datetime | None = None

    class Config:
        orm_mode = True

class CreateUserSchema(UserBaseSchema):
    password: constr(min_length=8)
    passwordConfirm: str
    verified: bool = False

class LoginUserSchema(BaseModel):
    email: EmailStr
    password: constr(min_length=8)

class UserResponseSchema(UserBaseSchema):
    id: str
    pass 

class UserResponse(BaseModel):
    status: str
    user: UserResponseSchema