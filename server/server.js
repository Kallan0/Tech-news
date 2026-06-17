const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors()); // Allows our React app to request data from this server

// Connect to the exact same database the Python script just created
mongoose.connect('mongodb://127.0.0.1:27017/news_board_db');

// Define the schema so Mongoose knows what the Python script saved
const ArticleSchema = new mongoose.Schema({
  title: String,
  url: String,
  score: Number,
  author: String
}, { collection: 'articles' }); // Crucial: matches the Python collection name

const Article = mongoose.model('Article', ArticleSchema);

// Create the single endpoint
app.get('/api/news', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

app.listen(5000, () => console.log('Backend server running on http://localhost:5000'));