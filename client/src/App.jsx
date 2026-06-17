import { useEffect, useState } from 'react';

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch the data from our Node/Express backend
    fetch('http://localhost:5000/api/news')
      .then(res => res.json())
      .then(data => setArticles(data));
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ borderBottom: '2px solid #eee', paddingBottom: '1rem' }}>Today's Top Tech News</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
        {articles.map((article, index) => (
          <div key={index} style={{ border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>
              <a href={article.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#0066cc' }}>
                {article.title}
              </a>
            </h3>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              <strong>{article.score}</strong> points | by {article.author}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;