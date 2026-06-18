import requests
from pymongo import MongoClient

client = MongoClient("mongodb://127.0.0.1:27017/")
db = client["news_board_db"]
collection = db["articles"]

# --- NEW: Categorization Logic ---
def determine_category(title):
    title_lower = title.lower()
    
    # Define keywords for each category
    ai_keywords = ['ai', 'openai', 'llm', 'gpt', 'machine learning', 'intelligence', 'neural']
    big_tech_keywords = ['apple', 'google', 'microsoft', 'meta', 'amazon', 'windows', 'ios', 'android']
    dev_keywords = ['code', 'python', 'javascript', 'rust', 'api', 'database', 'git', 'framework', 'linux']
    
    # Check for matches
    if any(keyword in title_lower for keyword in ai_keywords):
        return "Artificial Intelligence"
    elif any(keyword in title_lower for keyword in big_tech_keywords):
        return "Big Tech"
    elif any(keyword in title_lower for keyword in dev_keywords):
        return "Software Development"
    else:
        return "General Tech"
# ---------------------------------

print("Fetching top stories from Hacker News...")
response = requests.get("https://hacker-news.firebaseio.com/v0/topstories.json")
top_10_ids = response.json()[:10]  

collection.delete_many({}) 

for story_id in top_10_ids:
    story_res = requests.get(f"https://hacker-news.firebaseio.com/v0/item/{story_id}.json")
    story_data = story_res.json()
    
    if story_data and "url" in story_data:
        title = story_data.get("title")
        
        # --- NEW: Get the category using our Python function ---
        category = determine_category(title)
        
        article = {
            "title": title,
            "url": story_data.get("url"),
            "score": story_data.get("score"),
            "author": story_data.get("by"),
            "category": category  # <-- NEW field saved to DB
        }
        collection.insert_one(article)
        print(f"Saved [{category}]: {title}")

print("Data successfully updated in MongoDB!")