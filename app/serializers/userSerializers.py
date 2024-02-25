def userEntity(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "city": user["city"],
        "dob": user["dob"],
        "contact": user["contact"],
        # "role": user["role"],
        # "photo": user["photo"],
        "specializations": user["specializations"],
        "completed_quests": user["completed_quests"],
        "contribution_points": user["contribution_points"],
        "verified": user["verified"],
        "password": user["password"],
        "created_at": user["created_at"],
        "updated_at": user["updated_at"]
    }


def userResponseEntity(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "city": user["city"],
        "dob": user["dob"],
        "contact": user["contact"],
        # "role": user["role"],
        # "photo": user["photo"],
        "specializations": user["specializations"],
        "completed_quests": user["completed_quests"],
        "contribution_points": user["contribution_points"],
        "created_at": user["created_at"],
        "updated_at": user["updated_at"]
    }

def embeddedUserResponse(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        # "photo": user["photo"]
    }

def userListEntity(users) -> list:
    return [userResponseEntity(user) for user in users]

def communityManagerEntity(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "city": user["city"],
        "contact": user["contact"],
        "quest_openning_applications": user["quest_openning_applications"],
        "password": user["password"],
        "passwordConfirm": user["passwordConfirm"],
        "created_at": user["created_at"],
        "updated_at": user["updated_at"]
    }

def communityManagerResponseEntity(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "city": user["city"],
        "contact": user["contact"],
        "quest_openning_applications": user["quest_openning_applications"],
        "created_at": user["created_at"],
        "updated_at": user["updated_at"]
    }

def communityManagerListEntity(users) -> list:
    return [communityManagerResponseEntity(user) for user in users]