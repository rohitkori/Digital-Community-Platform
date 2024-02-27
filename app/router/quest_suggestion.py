from pymongo import MongoClient
import random
from bson import ObjectId
from datetime import datetime
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from app.database import CommunityManager, User, Quest
import app.router.search as search

collection_user = User 

#Retrieve the user document based on a unique identifier (e.g., email)
def get_user_document(email):
    user_document = collection_user.find_one({'email': email})
    return user_document

# Step 2: Extract the specializations from the retrieved user document
def extract_specializations(user_document):
    if user_document:
        specializations = user_document.get('specializations', [])
        return specializations
    else:
        return []

# Step 3: Construct a query using the extracted specializations
def construct_query_from_specializations(specializations):
    # Join specializations into a single string query
    query = ' '.join(specializations)
    return query

# Step 4: Search for relevant quests using the constructed query
def search_quests_by_specializations(query):
    relevant_quests = search.search(query)
    return relevant_quests

def quest_suggestion(user_email):
    # Example usage:
    user_document = get_user_document(user_email)
    if user_document:
        user_specializations = extract_specializations(user_document)
        query_from_specializations = construct_query_from_specializations(user_specializations)
        relevant_quests = search_quests_by_specializations(query_from_specializations)
        # print("Relevant quests based on user specializations:")
        # for quest in relevant_quests:
        #     print(quest)
        return relevant_quests
    else:
        print("User not found.")
