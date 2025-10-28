export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  type?: 'text' | 'error' | 'loading';
}

export interface Newspaper {
  id: string;
  title: string;
  date: string;
  source: string;
  summary?: string;
  articles: Article[];
}

export interface Article {
  id: string;
  title: string;
  content: string;
  author?: string;
  section?: string;
  page?: number;
}

export interface ChatState {
  messages: Message[];
  selectedNewspaper: Newspaper | null;
  isLoading: boolean;
  error: string | null;
}

export interface NewspaperSelectorProps {
  newspapers: Newspaper[];
  selectedNewspaper: Newspaper | null;
  onSelectNewspaper: (newspaper: Newspaper | null) => void;
  isLoading?: boolean;
}
