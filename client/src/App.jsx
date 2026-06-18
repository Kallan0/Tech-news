import { useEffect, useState } from 'react';

function App() {
  const [articles, setArticles] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All'); // <-- NEW: State for current filter

  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then(res => res.json())
      .then(data => setArticles(data));
  }, []);

  // --- NEW: Filter logic ---
  const categories = ['All', 'Artificial Intelligence', 'Big Tech', 'Software Development', 'General Tech'];
  
  const filteredArticles = activeFilter === 'All' 
    ? articles 
    : articles.filter(article => article.category === activeFilter);
  // -------------------------

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ borderBottom: '2px solid #eee', paddingBottom: '1rem' }}>Today's Top Tech News</h1>
      
      {/* --- NEW: Filter Buttons UI --- */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveFilter(cat)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              border: '1px solid #ddd',
              cursor: 'pointer',
              backgroundColor: activeFilter === cat ? '#0066cc' : '#fff',
              color: activeFilter === cat ? '#fff' : '#333',
              fontWeight: 'bold',
              transition: 'all 0.2s'
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* ----------------------------- */}
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
        {filteredArticles.map((article, index) => (
          <div key={index} style={{ border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', position: 'relative' }}>
            
            {/* --- NEW: Category Badge UI --- */}
            <span style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              fontSize: '0.75rem',
              padding: '0.25rem 0.6rem',
              borderRadius: '4px',
              backgroundColor: '#f0f4f8',
              color: '#4a5568',
              fontWeight: 'bold',
              border: '1px solid #e2e8f0'
            }}>
              {article.category || 'General Tech'}
            </span>
            {/* ------------------------------ */}

            <h3 style={{ margin: '0 0 10px 0', paddingRight: '150px' }}>
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