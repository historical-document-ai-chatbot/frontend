import React, { useState, useRef } from 'react';
import { Send, Paperclip } from 'lucide-react';
import './MessageInput.css';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  selectedNewspaper: any;
  placeholder?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  isLoading = false,
  selectedNewspaper,
  placeholder
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    if (!selectedNewspaper) {
      return 'Select a newspaper first to start chatting...';
    }
    return 'Ask me anything about the selected newspaper...';
  };

  const isDisabled = !selectedNewspaper || isLoading;

  return (
    <div className="message-input-container">
      <form onSubmit={handleSubmit} className="message-input-form">
        <div className="input-wrapper">
          <div className="input-field">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={getPlaceholder()}
              disabled={isDisabled}
              className={`message-textarea ${isDisabled ? 'disabled' : ''}`}
              rows={1}
            />
            
            {selectedNewspaper && (
              <div className="newspaper-indicator">
                <Paperclip className="indicator-icon" />
                <span className="indicator-text">
                  Analyzing: {selectedNewspaper.title}
                </span>
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isDisabled || !message.trim()}
            className={`send-button ${isDisabled || !message.trim() ? 'disabled' : ''}`}
          >
            <Send className="send-icon" />
          </button>
        </div>
        
        <div className="input-footer">
          <div className="footer-text">
            {!selectedNewspaper ? (
              <span className="warning-text">
                Please select a newspaper to start chatting
              </span>
            ) : (
              <span className="help-text">
                Press Enter to send, Shift+Enter for new line
              </span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
