import requests
from pymongo import MongoClient

# 1. Connect to local MongoDB
client = MongoClient("mongodb://127.0.0.1:27017/")
db = client["news_board_db"]
collection = db["articles"]

print("Fetching top stories from Hacker News...")

# 2. The Hacker News API returns an array of the top 500 story IDs. We grab the first 10.
response = requests.get("https://hacker-news.firebaseio.com/v0/topstories.json")
top_10_ids = response.json()[:10]  

# 3. Clear out yesterday's news so we only show fresh data
collection.delete_many({}) 

# 4. Fetch details for each ID and save to MongoDB
for story_id in top_10_ids:
    story_res = requests.get(f"https://hacker-news.firebaseio.com/v0/item/{story_id}.json")
    story_data = story_res.json()
    
    # Ensure the story has a URL (sometimes text-only posts don't)
    if story_data and "url" in story_data:
        article = {
            "title": story_data.get("title"),
            "url": story_data.get("url"),
            "score": story_data.get("score"),
            "author": story_data.get("by")
        }
        collection.insert_one(article)
        print(f"Saved: {article['title']}")

print("Data successfully saved to MongoDB!")