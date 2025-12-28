export interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  type?: string;
}

// What the backend returns for the sidebar list
export interface NewspaperSummary {
  id: string;
  name: string;
  date: string;
  // Added these so TypeScript knows they might exist after we format the data
  displayDate?: string;
  title?: string;
}

// What the backend returns when you select a specific paper
export interface NewspaperDetails extends NewspaperSummary {
  full_json_data: {
    Markdown: string;
    Content: any[];
    metadata: {
      newspaper_name: string;
      [key: string]: any;
    };
  };
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}
