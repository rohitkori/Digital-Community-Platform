# from bson.objectid import ObjectId
from fastapi import APIRouter, Response, status, HTTPException

from app.database import CommunityManager, User
from app.serializers.userSerializers import (communityManagerListEntity)
from app.serializers.questSerializers import (questCreationSerializer, 
                                              questRequestListSerializer , questRequestSerializer)

from .. import schemas

router = APIRouter()

@router.post('/opening-request', status_code=status.HTTP_201_CREATED)
async def create_quest_opening_request(payload: schemas.QuestRequestSchema):
    # print(payload.dict()['city'])
    # find all the community managers with the location as same in the payload
    community_managers = communityManagerListEntity(CommunityManager.find({'city':payload.city}))
    print(community_managers)
   
    # community_manager = CommunityManager.find_one({'location':payload.location})
    if not community_managers:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Community Manager not found')
    for community_manager in community_managers:
        print(community_manager)
        community_manager["quest_openning_applications"].append(payload.dict())
        # community_manager.save()

    return {"message": "Quest opening request created successfully", "community_managers": community_managers}
