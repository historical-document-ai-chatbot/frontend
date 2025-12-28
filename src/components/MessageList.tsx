import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Message } from "../types";
import { Bot, Sparkles, BookOpen, History } from "lucide-react"; // Make sure you have lucide-react installed
import "./MessageList.css";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // --- THE NEW MODERN EMPTY STATE ---
  if (messages.length === 0 && !isLoading) {
    return (
      <div className="empty-state-container">
        <div className="empty-state-content">
          <div className="icon-wrapper">
            <Bot size={48} className="bot-icon" />
          </div>
          <h2 className="welcome-title">Welcome to Historical AI</h2>
          <p className="welcome-subtitle">
            Select a newspaper from the archive to start analyzing history.
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <BookOpen className="feature-icon" />
              <h3>Summarize</h3>
              <p>Get concise summaries of long articles and reports.</p>
            </div>
            <div className="feature-card">
              <Sparkles className="feature-icon" />
              <h3>Analyze</h3>
              <p>Extract key themes, sentiment, and historical context.</p>
            </div>
            <div className="feature-card">
              <History className="feature-icon" />
              <h3>Explore</h3>
              <p>Ask about specific dates, people, or events in the text.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="message-list">
      {messages.map((msg) => (
        <div key={msg.id} className={`message-row ${msg.sender}`}>
          <div className="avatar">
            {msg.sender === "assistant" ? (
              <Bot size={20} />
            ) : (
              <div className="user-avatar">U</div>
            )}
          </div>
          <div className="message-bubble">
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="message-row assistant">
          <div className="avatar">
            <Bot size={20} />
          </div>
          <div className="message-bubble typing">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
