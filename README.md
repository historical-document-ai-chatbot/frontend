# Chat AC - Newspaper Analysis Interface

A React frontend for analyzing historical Chilean newspapers. Currently using mock data but designed to connect to a backend API.

## Setup

```bash
npm install
npm start
```

Open `http://localhost:3000`

## What It Does

Users select a newspaper (Chilian Times, VWCM, Valparaiso Review, or Star of Chile) and ask questions about its contents. The interface displays the conversation history.

## Current State

The app uses mock data stored in `src/data/mockData.ts`. It simulates:
- Loading newspapers from a database
- Sending chat messages
- Receiving AI-generated responses

## Backend Integration

To connect the real backend, update these files:

### 1. Replace Mock Data (`src/data/mockData.ts`)

Replace the `fetchNewspapers` function with an actual API call:

```typescript
export const fetchNewspapers = async (): Promise<Newspaper[]> => {
  const response = await fetch('http://your-backend/newspapers');
  return response.json();
};
```

### 2. Update Chat API Call (`src/components/ChatInterface.tsx`)

Find the `handleSendMessage` function and replace the mock response with:

```typescript
const response = await fetch('http://your-backend/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: content,
    newspaperId: selectedNewspaper?.id
  })
});

const data = await response.json();
// Add data.response to messages
```

### 3. API Endpoints Expected

- `GET /newspapers` - Returns array of Newspaper objects (see `src/types/index.ts`)
- `POST /chat` - Accepts `{ message: string, newspaperId: string }`, returns `{ response: string }`

### 4. Data Types

The interface expects these structures (see `src/types/index.ts`):

```typescript
interface Newspaper {
  id: string;
  title: string;
  date: string; // ISO format
  source: string;
  summary?: string;
  articles: Article[];
}

interface Article {
  id: string;
  title: string;
  content: string;
  author?: string;
  section?: string;
  page?: number;
}
```

## Project Structure

```
src/
├── components/        # UI components
├── data/             # Mock data (replace with API calls)
├── types/            # TypeScript definitions
└── App.tsx           # Main component
```

## Notes for Backend

- All API errors should be caught and displayed in the chat
- Loading states are already implemented
- The app expects JSON responses matching the TypeScript interfaces
- You might want to add authentication headers to the fetch calls
- Consider adding CORS headers if frontend and backend run on different ports
