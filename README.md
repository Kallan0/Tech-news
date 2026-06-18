📰 Automated Daily Tech News Board

A full-stack web application that bridges a Python-based data gathering pipeline with a MERN stack (MongoDB, Express, React, Node.js) web interface.

This project automatically fetches the top stories from Hacker News, uses a Python script to analyze and categorize the text, stores the processed data in MongoDB, and serves it through a dynamic, filterable React dashboard.

🏗️ Architecture & Tech Stack

This project is divided into three distinct, decoupled layers communicating via a shared database and REST APIs:

Python Scraper (/scraper): * Uses the requests library to fetch live data from the Hacker News public API.

Implements a custom Natural Language Processing (NLP) rule-engine to categorize articles based on title keywords (e.g., "Artificial Intelligence", "Big Tech").

Uses pymongo to interface directly with the NoSQL database.

Backend API (/server):

Built with Node.js and Express.js.

Uses Mongoose to define schemas and fetch the categorized data from MongoDB.

Serves the data to the frontend via a RESTful JSON endpoint (/api/news).

Frontend UI (/client):

Built with React (Vite).

Fetches data dynamically on component mount.

Features an interactive UI allowing users to filter news in real-time based on the Python-generated categories.

Database: * MongoDB Community Edition (Local instance).

✨ Features

Automated Data Harvesting: Bypasses manual entry by scraping top tech news programmatically.

Intelligent Categorization: Automatically tags articles based on semantic keywords found in the title.

Real-time UI Filtering: Instantly sort the news feed by categories without reloading the page.

Decoupled System Design: The scraper, backend API, and frontend UI operate independently, demonstrating microservice-like architecture.

🚀 Getting Started

Prerequisites

Before running this project, ensure you have the following installed on your machine:

Node.js (v14 or higher)

Python (v3.8 or higher)

MongoDB Community Server (Running locally on port 27017)

Installation & Setup

Clone the repository (or create your master folder).

Set up the Database & Scraper:

cd scraper
pip install requests pymongo
# Run the script once to populate your local MongoDB with fresh data
python fetch_news.py


Set up the Backend Server:

cd ../server
npm install
# Start the Express API (runs on port 5000)
node server.js


Set up the Frontend Client:

cd ../client
npm install
# Start the React development server (usually runs on port 5173)
npm run dev


🏃 Running the Application

To view the app, ensure your MongoDB is running, execute python fetch_news.py to get the latest data, start the Express server, and finally open the local React URL (e.g., http://localhost:5173) in your browser.

(Optional: If you set up the concurrently package in the root folder, you can start the entire stack simply by running npm run dev from the root directory).

🔮 Future Enhancements

[ ] Implement a "Fetch Now" button on the React UI to trigger the Python script via
