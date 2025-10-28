import React from 'react';
import { NewspaperSelectorProps, Newspaper } from '../types';
import { Calendar, FileText, ChevronDown } from 'lucide-react';
import './NewspaperSelector.css';

const NewspaperSelector: React.FC<NewspaperSelectorProps> = ({
  newspapers,
  selectedNewspaper,
  onSelectNewspaper,
  isLoading = false
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (newspaper: Newspaper | null) => {
    onSelectNewspaper(newspaper);
    setIsOpen(false);
  };

  return (
    <div className="newspaper-selector">
      <div className="selector-header">
        <FileText className="selector-icon" />
        <span className="selector-label">Select Newspaper</span>
      </div>
      
      <div className="dropdown-container">
        <button
          className={`dropdown-trigger ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          disabled={isLoading}
        >
          <div className="trigger-content">
            {selectedNewspaper ? (
              <div className="selected-newspaper">
                <span className="newspaper-title">{selectedNewspaper.title}</span>
                <span className="newspaper-date">{selectedNewspaper.date}</span>
              </div>
            ) : (
              <span className="placeholder">Choose a newspaper to analyze...</span>
            )}
          </div>
          <ChevronDown className={`chevron ${isOpen ? 'rotated' : ''}`} />
        </button>

        {isOpen && (
          <div className="dropdown-menu">
            <div className="menu-header">
              <span className="menu-title">Available Newspapers</span>
              <button
                className="clear-button"
                onClick={() => handleSelect(null)}
              >
                Clear Selection
              </button>
            </div>
            
            <div className="newspaper-list">
              {newspapers.map((newspaper) => (
                <div
                  key={newspaper.id}
                  className={`newspaper-item ${
                    selectedNewspaper?.id === newspaper.id ? 'selected' : ''
                  }`}
                  onClick={() => handleSelect(newspaper)}
                >
                  <div className="newspaper-info">
                    <div className="newspaper-header">
                      <span className="item-title">{newspaper.title}</span>
                      <span className="item-source">{newspaper.source}</span>
                    </div>
                    <div className="newspaper-meta">
                      <Calendar className="meta-icon" />
                      <span className="item-date">{newspaper.date}</span>
                      <span className="item-count">
                        {newspaper.articles.length} articles
                      </span>
                    </div>
                    {newspaper.summary && (
                      <p className="item-summary">{newspaper.summary}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <span>Loading newspapers...</span>
        </div>
      )}
    </div>
  );
};

export default NewspaperSelector;
