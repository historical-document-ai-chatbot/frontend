import React, { useState } from 'react';
import ArticleMenu from './components/ArticleMenu';
import ChatInterface from './components/ChatInterface';
import './App.css'; // For the two-column layout

// Example dummy data for the menu
const historicalArticles = [
  { id: 1, title: 'The Fall of Rome', content: 'In 476 AD...' },
  { id: 2, title: 'The Industrial Revolution', content: 'Beginning in the 18th century...' },
  { id: 3, title: 'The Space Race', content: 'During the Cold War...' },
];

function App() {
  // 1. State to store the currently selected article object
  const [selectedArticle, setSelectedArticle] = useState(null); 

  // 2. Handler function to update the state when the user clicks a menu item
  const handleArticleSelect = (articleId) => {
    const article = historicalArticles.find(a => a.id === articleId);
    setSelectedArticle(article);
  };

  return (
    <div className="container">
      {/* LEFT SIDE: Menu */}
      <div className="sidebar">
        <ArticleMenu 
          articles={historicalArticles} 
          onSelect={handleArticleSelect} 
          selectedId={selectedArticle ? selectedArticle.id : null}
        />
      </div>

      {/* RIGHT SIDE: Chat */}
      <div className="main-content">
        <ChatInterface 
          article={selectedArticle} // Pass the selected article to the chat component
        />
      </div>
    </div>
  );
}

export default App;