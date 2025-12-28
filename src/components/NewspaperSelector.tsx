import React, { useState } from "react";
import { Calendar, FileText, ChevronDown } from "lucide-react";
import "./NewspaperSelector.css";

// We define loose types here to prevent errors since we are
// transitioning from Mock Data to Real Data
interface NewspaperSelectorProps {
  newspapers: any[];
  selectedNewspaper: any | null;
  onSelectNewspaper: (newspaper: any) => void;
  isLoading: boolean;
}

const NewspaperSelector: React.FC<NewspaperSelectorProps> = ({
  newspapers,
  selectedNewspaper,
  onSelectNewspaper,
  isLoading = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (newspaper: any) => {
    onSelectNewspaper(newspaper);
    setIsOpen(false);
  };

  return (
    <div className="newspaper-selector">
      <div className="selector-header">
        <FileText className="selector-icon" size={20} />
        <span className="selector-label">Select Edition</span>
      </div>

      <div className="dropdown-container">
        {/* MAIN TRIGGER BUTTON */}
        <button
          className={`dropdown-trigger ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          disabled={isLoading}
        >
          <div className="trigger-content">
            {selectedNewspaper ? (
              <div className="selected-newspaper">
                {/* For the selected view, we keep Title prominent */}
                <span className="newspaper-title">
                  {selectedNewspaper.name || selectedNewspaper.title}
                </span>
                {/* Use displayDate if available (e.g., "6th August"), else fallback to raw date */}
                <span className="newspaper-date">
                  {selectedNewspaper.displayDate || selectedNewspaper.date}
                </span>
              </div>
            ) : (
              <span className="placeholder">
                {isLoading ? "Loading archives..." : "Choose a date..."}
              </span>
            )}
          </div>
          <ChevronDown
            className={`chevron ${isOpen ? "rotated" : ""}`}
            size={16}
          />
        </button>

        {/* DROPDOWN MENU */}
        {isOpen && (
          <div className="dropdown-menu">
            <div className="menu-header">
              <span className="menu-title">Available Dates</span>
              <button
                className="clear-button"
                onClick={() => handleSelect(null)}
              >
                Clear
              </button>
            </div>

            <div className="newspaper-list">
              {newspapers.length === 0 && !isLoading ? (
                <div className="empty-state">No newspapers found.</div>
              ) : (
                newspapers.map((newspaper) => (
                  <div
                    key={newspaper.id}
                    className={`newspaper-item ${
                      selectedNewspaper?.id === newspaper.id ? "selected" : ""
                    }`}
                    onClick={() => handleSelect(newspaper)}
                  >
                    <div className="newspaper-info">
                      {/* LIST ITEM LAYOUT: Date is King here */}
                      <div className="newspaper-header">
                        <Calendar
                          className="meta-icon"
                          size={14}
                          style={{ marginRight: "6px" }}
                        />
                        <span
                          className="item-title"
                          style={{ fontSize: "1rem", fontWeight: "600" }}
                        >
                          {/* Use formatted date for the list item */}
                          {newspaper.displayDate || newspaper.date}
                        </span>
                      </div>

                      <div className="newspaper-meta">
                        {/* Title is secondary info now */}
                        <span className="item-source">
                          {newspaper.name || newspaper.title || "Unknown Title"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {isLoading && !selectedNewspaper && (
        <div className="loading-indicator">
          <span>Syncing with archives...</span>
        </div>
      )}
    </div>
  );
};

export default NewspaperSelector;
