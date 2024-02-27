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

# Download NLTK punkt tokenizer and stopwords
nltk.download('punkt')
nltk.download('stopwords')

# Connect to MongoDB
collection = Quest
collection_user = User

# Load stopwords
custom_stopwords = set(stopwords.words("english"))

# Porter Stemmer for stemming
stemmer = PorterStemmer()

# Vectorizer with adjusted parameters
vectorizer = TfidfVectorizer(
    stop_words=list(custom_stopwords),  # Convert set to list
    min_df=0.05,  
    max_df=0.95, 
    ngram_range=(1, 2)  
)

# Preprocess function to clean, tokenize, and stem text
def preprocess(text):
    tokens = word_tokenize(text.lower())
    tokens = [stemmer.stem(word) for word in tokens if word.isalnum() and word not in custom_stopwords]
    return " ".join(tokens)

# Retrieve and preprocess quests
processed_quests = []
for quest in collection.find():
    processed_title = preprocess(quest['title'])
    processed_description = preprocess(quest['description'])
    processed_reward = quest['rewards']  # No need to preprocess reward
    processed_city = preprocess(quest['city'])
    processed_leisure_activity = preprocess(" ".join(quest['leisure_activity']))
    
    processed_quests.append({
        'title': processed_title,
        'description': processed_description,
        'reward': processed_reward,
        'city': processed_city,
        'leisure_activity': processed_leisure_activity
    })

# Vectorize quest descriptions
quest_texts = [quest['title'] + ' ' + quest['description'] for quest in processed_quests]
quest_vectors = vectorizer.fit_transform(quest_texts)

# Process user query
def process_query(query):
    tokens = word_tokenize(query.lower())
    tokens = [stemmer.stem(word) for word in tokens if word.isalnum() and word not in custom_stopwords]
    return " ".join(tokens)

# Calculate cosine similarity between query and quests
def find_related_quests(query, processed_quests, quest_vectors, vectorizer):
    query_vector = vectorizer.transform([query])
    similarities = cosine_similarity(query_vector, quest_vectors)
    ranked_indices = similarities.argsort()[0][::-1]
    related_quests = [(processed_quests[i], similarities[0][i]) for i in ranked_indices]
    return related_quests

# User query
def search(query):
    user_query = query

    # Find related quests
    processed_query = process_query(user_query)
    related_quests = find_related_quests(processed_query, processed_quests, quest_vectors, vectorizer)

    # Extract relevant quests
    relevant_quests = [quest for quest, _ in related_quests]

    return relevant_quests
