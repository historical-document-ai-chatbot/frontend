import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import { User, Bot, Loader2 } from 'lucide-react';
import './MessageList.css';

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading = false }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const formatTime = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(timestamp);
  };

  return (
    <div className="message-list">
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Bot />
            </div>
            <h3 className="empty-title">Welcome to Chat AC</h3>
            <p className="empty-description">
              Select a newspaper from the dropdown above and start asking questions about its content.
              I can help you analyze articles, summarize key points, and answer questions about the news.
            </p>
            <div className="empty-suggestions">
              <p className="suggestions-title">Try asking:</p>
              <ul className="suggestions-list">
                <li>"What are the main topics covered in this newspaper?"</li>
                <li>"Summarize the most important articles"</li>
                <li>"What's the political stance on the infrastructure project?"</li>
              </ul>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender}`}
            >
              <div className="message-avatar">
                {message.sender === 'user' ? (
                  <User className="avatar-icon" />
                ) : (
                  <Bot className="avatar-icon" />
                )}
              </div>
              <div className="message-content">
                <div className="message-bubble">
                  {message.type === 'loading' ? (
                    <div className="loading-message">
                      <Loader2 className="loading-spinner" />
                      <span>Thinking...</span>
                    </div>
                  ) : (
                    <div className="message-text">
                      {message.content}
                    </div>
                  )}
                </div>
                <div className="message-meta">
                  <span className="message-time">
                    {formatTime(message.timestamp)}
                  </span>
                  <span className="message-sender">
                    {message.sender === 'user' ? 'You' : 'Assistant'}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="message assistant">
            <div className="message-avatar">
              <Bot className="avatar-icon" />
            </div>
            <div className="message-content">
              <div className="message-bubble">
                <div className="loading-message">
                  <Loader2 className="loading-spinner" />
                  <span>Analyzing newspaper content...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
