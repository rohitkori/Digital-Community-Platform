# from bson.objectid import ObjectId
from fastapi import APIRouter, Response, status, HTTPException
from bson.objectid import ObjectId

from app.database import CommunityManager, User, Quest
from app.serializers.userSerializers import (communityManagerListEntity, communityManagerResponseEntity)
from app.serializers.questSerializers import (questCreationSerializer, questViewForUserSerializer,
                                              questRequestListSerializer , questListSerializer, questViewForUserListSerializer)

from .. import schemas
from datetime import datetime
import app.router.search as search
import app.router.quest_suggestion as suggestion

router = APIRouter()

@router.post('/opening-request', status_code=status.HTTP_201_CREATED)
async def create_quest_opening_request(payload: schemas.QuestRequestSchema):
    # find all the community managers with the location as same in the payload
    community_managers = communityManagerListEntity(CommunityManager.find({'city':payload.city}))

    if not community_managers:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Community Manager not found')

    application = payload.dict()
    application['status'] = 'pending'
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
async def create_quest(payload: schemas.QuestCreationSchema, email: str, application_id: str):
    community_manager = CommunityManager.find_one({'email': email.lower()})
    if not community_manager:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Community Manager not found')
    
    payload.community_manager = community_manager['email']
    payload.created_at = datetime.utcnow()
    payload.updated_at = payload.created_at
    result = Quest.insert_one(payload.dict())
    print(result.inserted_id)
    new_quest = questCreationSerializer(Quest.find_one({'_id': result.inserted_id}))
    community_manager.update_one({'quest_openning_applications._id': ObjectId(application_id)}, {'$set': {'quest_openning_applications.$.status': 'accepted'}})

    return {"status": "success", "quest": new_quest}


@router.get('/quests', status_code=status.HTTP_200_OK)
async def get_quests():
    quests = Quest.find()
    list_quests = questListSerializer(quests)

    return {"status": "success", "quests": list_quests}


@router.get('/apply-in-quest', status_code=status.HTTP_200_OK)
async def apply_in_quest(id: str, email: str):
    quest = Quest.find_one({'_id': ObjectId(id)})
    user = User.find_one({'email': email.lower()})
    if not quest:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Quest not found')
    
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')
    
    filter_query = {"_id": ObjectId(id)}
    upate_applications = {
        "$push": {
            "pending_applications": user['email']
        }
    }
    Quest.update_one(filter_query, upate_applications)

    return {"message": "Application submitted successfully"}

@router.get('/review-applications', status_code=status.HTTP_200_OK)
async def review_applications(id: str):
    quest = Quest.find_one({'_id': ObjectId(id)})
    if not quest:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Quest not found')
    
    return {"status": "success", "quest": quest}

@router.post('/accept-application', status_code=status.HTTP_200_OK)
async def accept_application(id: str, email: str):
    quest = Quest.find_one({'_id': ObjectId(id)})
    if not quest:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Quest not found')
    
    if email.lower() not in quest['pending_applications']:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Application not found')

    filter_query = {"_id": ObjectId(id)}
    
    update_operation = {
        "$pull": {
            "pending_applications": email.lower()
        },
        "$push": {
            "accepted_applications": email.lower()
        }
    }
    Quest.update_one(filter_query, update_operation)

    return {"message": "Application accepted successfully"}

@router.post('/reject-application', status_code=status.HTTP_200_OK)
async def reject_application(id: str, email: str):
    quest = Quest.find_one({'_id': ObjectId(id)})
    if not quest:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Quest not found')
    
    if email.lower() not in quest['pending_applications']:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Application not found')
    
    filter_query = {"_id": ObjectId(id)}
    
    update_operation = {
        "$pull": {
            "pending_applications": email.lower()
        },
        "$push": {
            "rejected_applications": email.lower()
        }
    }
    Quest.update_one(filter_query, update_operation)

    return {"message": "Application rejected successfully"}

@router.post('/search', status_code=status.HTTP_200_OK)
async def search_query(query: str):
    search_list = search.search(query)

    return search_list

@router.post('/suggestion', status_code=status.HTTP_200_OK)
async def quest_suggestion_using_profile(email: str):
    quest_suggestion_list = suggestion.quest_suggestion(email)

    return quest_suggestion_list

@router.post('/user-applications', status_code=status.HTTP_200_OK)
async def get_applications(payload: schemas.UserEmailSchema):
    user = User.find_one({'email': payload.email.lower()})
    # print(user)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')

    pending_applications = questViewForUserListSerializer(Quest.find({'accepted_applications': user['email']}))
    # print(pending_applications)
    accepted_applications = questViewForUserListSerializer(Quest.find({'accepted_applications': user['email']}))
    rejected_applications = questViewForUserListSerializer(Quest.find({'rejected_applications': user['email']}))

    return {"pending_applications": pending_applications, "accepted_applications": accepted_applications, "rejected_applications": rejected_applications}

@router.post('/community-manager-quests', status_code=status.HTTP_200_OK)
async def get_community_manager_quests(payload: schemas.UserEmailSchema):
    community_manager = CommunityManager.find_one({'email': payload.email.lower()})
    if not community_manager:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Community Manager not found')
    
    quests = questListSerializer(Quest.find({'community_manager': community_manager['email']}))

    return {"status": "success", "quests": quests}

@router.post('/user-quest-request', status_code=status.HTTP_200_OK)
async def get_user_quest_requests(payload: schemas.UserEmailSchema):
    user = User.find_one({'email': payload.email.lower()})
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')
    
    quests = questRequestListSerializer(CommunityManager.find({'quest_openning_applications': {'$elemMatch': {'email': user['email']}}}))
    pending_request = []
    accepted_request = []
    rejected_request = []
    for quest in quests:
        if quest['status'] == 'pending':
            pending_request.append(quest)
        elif quest['status'] == 'accepted':
            accepted_request.append(quest)
        else:   
            rejected_request.append(quest)

    print(quests)
    
    return {"status": "success", "pending_request": pending_request, "accepted_request": accepted_request, "rejected_request": rejected_request}
    
