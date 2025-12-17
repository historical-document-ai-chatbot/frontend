import React from 'react';

function ArticleMenu({ articles, onSelect, selectedId }) {
  // Function to simulate a dropdown menu or simple list
  return (
    <div className="article-menu">
      <h2>Historical Articles</h2>
      {/* This can be styled as a dropdown or a simple list */}
      <select onChange={(e) => onSelect(Number(e.target.value))} defaultValue="">
        <option value="" disabled>Select an Article</option>
        {articles.map((article) => (
          <option key={article.id} value={article.id}>
            {article.title}
          </option>
        ))}
      </select>
      
   
    </div>
  );
}

export default ArticleMenu;