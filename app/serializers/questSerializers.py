def questRequestSerializer(data) -> dict:
    return {
        "id": str(data["_id"]),
        "title": data["title"],
        "description": data["description"],
        "start_date": data["start_date"],
        "end_date": data["end_date"],
        "city": data["city"],
        "leisure_activity": data["leisure_activity"],
        "local_events": data["local_events"],
        "rewards": data["rewards"],
        "points": data["points"],
        "total_required": data["total_required"],
        "created_at": data["created_at"],
        "updated_at": data["updated_at"],
        "created_by": data["created_by"]
    }

def questCreationSerializer(data) -> dict:
    return {
        "id": str(data["_id"]),
        "title": data["title"],
        "description": data["description"],
        "start_date": data["start_date"],
        "end_date": data["end_date"],
        "city": data["city"],
        "leisure_activity": data["leisure_activity"],
        "local_events": data["local_events"],
        "rewards": data["rewards"],
        "points": data["points"],
        "community_manager": data["community_manager"],
        "total_required": data["total_required"],
        "pending_applications": data["pending_applications"],
        "accepted_applications": data["accepted_applications"],
        "rejected_applications": data["rejected_applications"],
        "created_at": data["created_at"],
        "updated_at": data["updated_at"],
    }

def questRequestListSerializer(requests) -> list:
    return [questRequestSerializer(request) for request in requests]

def questListSerializer(quests) -> list:
    return [questCreationSerializer(quest) for quest in quests]

def questViewForUserSerializer(data) -> dict:
    return {
        "id": str(data["_id"]),
        "title": data["title"],
        "description": data["description"],
        "start_date": data["start_date"],
        "end_date": data["end_date"],
        "city": data["city"],
        "leisure_activity": data["leisure_activity"],
        "local_events": data["local_events"],
        "rewards": data["rewards"],
        "points": data["points"],
        "community_manager": data["community_manager"],
        "total_required": data["total_required"],
    }

def questViewForUserListSerializer(quests) -> list:
    return [questViewForUserSerializer(quest) for quest in quests]