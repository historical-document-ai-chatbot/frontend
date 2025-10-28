import React, { useState, useEffect } from 'react';
import { Message, Newspaper, ChatState } from '../types';
import { fetchNewspapers } from '../data/mockData';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import NewspaperSelector from './NewspaperSelector';
import './ChatInterface.css';

const ChatInterface: React.FC = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    selectedNewspaper: null,
    isLoading: false,
    error: null
  });
  const [newspapers, setNewspapers] = useState<Newspaper[]>([]);
  const [loadingNewspapers, setLoadingNewspapers] = useState(true);

  useEffect(() => {
    loadNewspapers();
  }, []);

  const loadNewspapers = async () => {
    try {
      setLoadingNewspapers(true);
      const fetchedNewspapers = await fetchNewspapers();
      setNewspapers(fetchedNewspapers);
    } catch (error) {
      console.error('Failed to load newspapers:', error);
      setChatState(prev => ({
        ...prev,
        error: 'Failed to load newspapers'
      }));
    } finally {
      setLoadingNewspapers(false);
    }
  };

  const handleSelectNewspaper = (newspaper: Newspaper | null) => {
    setChatState(prev => ({
      ...prev,
      selectedNewspaper: newspaper,
      messages: newspaper ? prev.messages : [],
      error: null
    }));
  };

  const handleSendMessage = async (content: string) => {
    if (!chatState.selectedNewspaper) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true
    }));

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateMockResponse(content, chatState.selectedNewspaper!),
        sender: 'assistant',
        timestamp: new Date(),
        type: 'text'
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false
      }));
    }, 1500);
  };

  const generateMockResponse = (userMessage: string, newspaper: Newspaper): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('summar') || message.includes('overview')) {
      return `Based on the "${newspaper.title}" from ${newspaper.date}, here are the key highlights:

${newspaper.articles.map((article, index) => 
  `${index + 1}. **${article.title}** (${article.section || 'General'})
   ${article.content.substring(0, 150)}...`
).join('\n\n')}

The newspaper covers ${newspaper.articles.length} main articles focusing on ${newspaper.articles.map(a => a.section).filter(Boolean).join(', ')}. Would you like me to elaborate on any specific article?`;
    }
    
    if (message.includes('topic') || message.includes('subject')) {
      const sections = Array.from(new Set(newspaper.articles.map(a => a.section).filter(Boolean)));
      return `The main topics covered in "${newspaper.title}" include:

${sections.map(section => `• **${section}**: ${newspaper.articles.filter(a => a.section === section).length} article(s)`)
.join('\n')}

The newspaper provides comprehensive coverage across these areas, with particular focus on ${sections[0] || 'general news'}.`;
    }
    
    if (message.includes('author') || message.includes('writer')) {
      const authors = Array.from(new Set(newspaper.articles.map(a => a.author).filter(Boolean)));
      return `The articles in "${newspaper.title}" are written by: ${authors.join(', ')}.

Each author contributes their expertise to different sections of the newspaper, ensuring diverse perspectives and comprehensive coverage of the news.`;
    }
    
    return `I can help you analyze the "${newspaper.title}" newspaper from ${newspaper.date}. 

This publication contains ${newspaper.articles.length} articles covering various topics. You can ask me to:
- Summarize the main articles
- Explain specific topics or themes
- Provide details about authors and sections
- Analyze the content structure

What would you like to know more about?`;
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <div className="header-content">
          <h1 className="chat-title">Chat AC</h1>
          <p className="chat-subtitle">Newspaper Analysis Assistant</p>
        </div>
      </div>

      <div className="chat-main">
        <div className="chat-sidebar">
          <NewspaperSelector
            newspapers={newspapers}
            selectedNewspaper={chatState.selectedNewspaper}
            onSelectNewspaper={handleSelectNewspaper}
            isLoading={loadingNewspapers}
          />
          
          {chatState.selectedNewspaper && (
            <div className="newspaper-details">
              <h3 className="details-title">Selected Newspaper</h3>
              <div className="details-content">
                <div className="detail-item">
                  <strong>Title:</strong> {chatState.selectedNewspaper.title}
                </div>
                <div className="detail-item">
                  <strong>Date:</strong> {chatState.selectedNewspaper.date}
                </div>
                <div className="detail-item">
                  <strong>Source:</strong> {chatState.selectedNewspaper.source}
                </div>
                <div className="detail-item">
                  <strong>Articles:</strong> {chatState.selectedNewspaper.articles.length}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="chat-content">
          <MessageList 
            messages={chatState.messages} 
            isLoading={chatState.isLoading}
          />
          <MessageInput
            onSendMessage={handleSendMessage}
            isLoading={chatState.isLoading}
            selectedNewspaper={chatState.selectedNewspaper}
          />
        </div>
      </div>

      {chatState.error && (
        <div className="error-banner">
          <span>{chatState.error}</span>
          <button onClick={loadNewspapers} className="retry-button">
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
