import React, { useState } from 'react';

function ChatInterface({ article }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (!article) {
      alert("Please select an article first!");
      return;
    }
    if (input.trim() === '') return;

    // 1. Add user message to state
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // 2. Construct the prompt for the AI
    // Crucial step: Pre-load the AI with the article content
    const fullPrompt = `Based on the following historical article: "${article.content}". Answer the user's question: "${input}"`;

    // 3. (To be built later) Call your AI API with the fullPrompt
    // Example placeholder for the AI's response:
    const aiResponse = { text: `AI response about "${article.title}" to your question: "${input}"`, sender: 'ai' };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 4. Add AI response to state
    setMessages(prev => [...prev, aiResponse]);
  };

  return (
    <div className="chat-interface">
      {article ? (
        <>
          <h3>Article Context: {article.title}</h3>
          <p className="article-preview">{article.content.substring(0, 150)}...</p>
          <hr />
          
          {/* Chat History Area */}
          <div className="message-history">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <strong>{msg.sender === 'user' ? 'You:' : 'AI:'}</strong> {msg.text}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="chat-input-area">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask the AI about the article..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </>
      ) : (
        <p>Please select an article from the menu on the left to begin chatting.</p>
      )}
    </div>
  );
}

export default ChatInterface;