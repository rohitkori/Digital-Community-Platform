# from bson.objectid import ObjectId
from fastapi import APIRouter, Response, status, HTTPException

from app.database import CommunityManager, User, Quest
from app.serializers.userSerializers import (communityManagerListEntity, communityManagerResponseEntity)
from app.serializers.questSerializers import (questCreationSerializer, 
                                              questRequestListSerializer , questListSerializer)

from .. import schemas
from datetime import datetime

router = APIRouter()

@router.post('/opening-request', status_code=status.HTTP_201_CREATED)
async def create_quest_opening_request(payload: schemas.QuestRequestSchema):
    # find all the community managers with the location as same in the payload
    community_managers = communityManagerListEntity(CommunityManager.find({'city':payload.city}))

    if not community_managers:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Community Manager not found')

    application = payload.dict()
    filter_query = {"city": payload.city}
    update_operation = {
        "$push": {
            "quest_openning_applications": application
        }
    }
    CommunityManager.update_many(filter_query, update_operation)

    return {"message": "Quest opening request created successfully", "community_managers": community_managers}

@router.post('/review-opening-requests', status_code=status.HTTP_200_OK)
async def get_quest_opening_requests(email: str):
    requests = CommunityManager.find_one({'email': email.lower()})
    print(requests)
    list_requests = communityManagerResponseEntity(requests)

    return {"status": "success", "requests": list_requests}

@router.post('/create-quest', status_code=status.HTTP_201_CREATED, response_model=schemas.QuestResponse)
async def create_quest(payload: schemas.QuestCreationSchema, email: str):
    community_manager = CommunityManager.find_one({'email': email.lower()})
    if not community_manager:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Community Manager not found')
    
    payload.community_manager = community_manager['email']
    payload.created_at = datetime.utcnow()
    payload.updated_at = payload.created_at
    result = Quest.insert_one(payload.dict())
    print(result.inserted_id)
    new_quest = questCreationSerializer(Quest.find_one({'_id': result.inserted_id}))

    return {"status": "success", "quest": new_quest}


@router.get('/quests', status_code=status.HTTP_200_OK)
async def get_quests():
    quests = Quest.find()
    list_quests = questListSerializer(quests)
    
    return {"status": "success", "quests": list_quests}