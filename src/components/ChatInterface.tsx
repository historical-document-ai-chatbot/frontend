import React, { useState, useEffect } from "react";
import { Message, NewspaperDetails, ChatState } from "../types";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import NewspaperSelector from "./NewspaperSelector";
import "./ChatInterface.css";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000";

// --- HELPER: Date Formatter (e.g., "6th August 1904") ---
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // Fallback if invalid

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // Logic for st, nd, rd, th
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return `${day}${suffix} ${month} ${year}`;
};

const ChatInterface: React.FC = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  const [newspaperList, setNewspaperList] = useState<any[]>([]);
  const [selectedNewspaper, setSelectedNewspaper] =
    useState<NewspaperDetails | null>(null);
  const [loadingList, setLoadingList] = useState(true);

  // --- 1. LOAD NEWSPAPERS ---
  useEffect(() => {
    fetchNewspapers();
  }, []);

  const fetchNewspapers = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/newspapers`);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      console.log("Raw API Data:", data); // Debugging

      // Robust mapping: Handle inconsistent field names from backend
      const formattedData = data.map((item: any) => ({
        ...item,
        // Try 'name', then 'newspaper_name', then 'title', then fallback
        title:
          item.name ||
          item.newspaper_name ||
          item.title ||
          "Untitled Newspaper",
        // Format the date for the UI
        displayDate: formatDate(item.date),
        rawDate: item.date, // Keep original for logic if needed
      }));

      setNewspaperList(formattedData);
    } catch (err: any) {
      console.error(err);
      setChatState((prev) => ({
        ...prev,
        error: `Could not load list: ${err.message}`,
      }));
    } finally {
      setLoadingList(false);
    }
  };

  // --- 2. HANDLE SELECTION ---
  const handleSelectNewspaper = async (newspaper: any) => {
    // 1. Safety Check: Ensure we have an ID to start with
    if (!newspaper?.id) {
      console.error("Selection failed: Missing ID", newspaper);
      return;
    }

    setChatState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const res = await fetch(`${BACKEND_URL}/api/newspaper/${newspaper.id}`);
      if (!res.ok) throw new Error("Failed to load document details");

      const data = await res.json();

      // Merge the ID from the selection into the details
      // The backend details response might be missing the 'id' field
      const fullDetails = {
        ...data,
        id: newspaper.id, // FORCE THE ID HERE
        title: data.name || data.newspaper_name || newspaper.title,
        displayDate: formatDate(data.date),
      };

      console.log("Selected Newspaper set to:", fullDetails); // Debug log
      setSelectedNewspaper(fullDetails);

      setChatState({ messages: [], isLoading: false, error: null });
    } catch (err) {
      console.error(err);
      setChatState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Failed to load document.",
      }));
    }
  };

  // --- 3. SEND MESSAGE ---
  const handleSendMessage = async (content: string) => {
    // Validation: Ensure we have a valid ID before sending
    if (!selectedNewspaper || !selectedNewspaper.id) {
      setChatState((prev) => ({
        ...prev,
        error: "Error: No newspaper selected.",
      }));
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMsg],
      isLoading: true,
    }));

    try {
      const payload = {
        newspaper_id: selectedNewspaper.id,
        message: content,
        history: chatState.messages.map((m) => ({
          sender: m.sender,
          content: m.content,
        })),
      };

      console.log("Sending Payload:", payload); // Debugging

      const res = await fetch(`${BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // Try to read the error message from backend
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || `Server error ${res.status}`);
      }

      const data = await res.json();

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: "assistant",
        timestamp: new Date(),
      };

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, aiMsg],
        isLoading: false,
      }));
    } catch (err: any) {
      console.error("Chat Error:", err);
      setChatState((prev) => ({
        ...prev,
        isLoading: false,
        error: `AI Error: ${err.message || "Check console"}`,
      }));
    }
  };

  const handleOpenMarkdown = () => {
    if (!selectedNewspaper?.full_json_data?.Markdown) return;

    const newWindow = window.open("", "_blank");
    if (newWindow) {
      // We inject a script (marked.js) to convert MD to HTML on the fly
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${selectedNewspaper.title} - Full Text</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown-light.min.css">
            <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
            <style>
              body { box-sizing: border-box; min-width: 200px; max-width: 980px; margin: 0 auto; padding: 45px; }
              @media (max-width: 767px) { body { padding: 15px; } }
            </style>
          </head>
          <body class="markdown-body">
            <div id="content">Loading document...</div>
            <script>
              const rawMarkdown = ${JSON.stringify(
                selectedNewspaper.full_json_data.Markdown
              )};
              document.getElementById('content').innerHTML = marked.parse(rawMarkdown);
            </script>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <div className="chat-interface">
      {/* HEADER (Cleaned up) */}
      <div className="chat-header">
        <div className="header-content">
          {/* We use specific class names to help with CSS alignment */}
          <h1 className="chat-title">
            {selectedNewspaper ? selectedNewspaper.title : "Chat AC"}
          </h1>
          <p className="chat-subtitle">Historical Analysis Assistant</p>
        </div>
        {/* Removed the button from here */}
      </div>

      <div className="chat-main">
        {/* SIDEBAR */}
        <div className="chat-sidebar">
          <NewspaperSelector
            newspapers={newspaperList}
            selectedNewspaper={selectedNewspaper}
            onSelectNewspaper={handleSelectNewspaper}
            isLoading={loadingList}
          />

          {selectedNewspaper && (
            <div className="newspaper-details">
              <h3 className="details-title">Selected Newspaper</h3>
              <div className="details-content">
                <div className="detail-item">
                  <strong>Title:</strong> {selectedNewspaper.title}
                </div>
                <div className="detail-item">
                  <strong>Date:</strong> {selectedNewspaper.displayDate}
                </div>

                {/* MOVED BUTTON HERE */}
                <button
                  onClick={handleOpenMarkdown}
                  className="view-doc-btn"
                  style={{
                    marginTop: "15px",
                    width: "100%",
                    padding: "8px",
                    cursor: "pointer",
                  }}
                >
                  📄 Read Full Document
                </button>
              </div>
            </div>
          )}
        </div>

        {/* MESSAGES AREA */}
        <div className="chat-content">
          <MessageList
            messages={chatState.messages}
            isLoading={chatState.isLoading}
          />
          <MessageInput
            onSendMessage={handleSendMessage}
            isLoading={chatState.isLoading}
            selectedNewspaper={selectedNewspaper as any}
          />
        </div>
      </div>

      {chatState.error && (
        <div className="error-banner">
          <span>{chatState.error}</span>
          <button onClick={fetchNewspapers} className="retry-button">
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
