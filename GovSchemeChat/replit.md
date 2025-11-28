# Government Schemes Assistant Chatbot

An AI-powered chatbot that helps Indian citizens discover government schemes they qualify for. Uses RAG (Retrieval-Augmented Generation) technology to search through government scheme documents and provide accurate, instant answers.

## Overview

This application helps users find information about:
- Student scholarships and education loans
- Farmer welfare schemes (PM-KISAN, crop insurance)
- Women entrepreneurship programs
- Housing assistance (PM Awas Yojana)
- Health insurance schemes (Ayushman Bharat)
- Employment and skill development programs
- Senior citizen pensions and benefits
- Startup and business loans

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **UI Components**: Shadcn/UI + Tailwind CSS
- **Backend**: Express.js
- **AI Integration**: OpenAI GPT-5 (with fallback for missing API key)
- **State Management**: TanStack Query
- **Routing**: Wouter

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── CategoryCard.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── SchemeCard.tsx
│   │   │   ├── SuggestionChip.tsx
│   │   │   ├── ThemeProvider.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   └── TypingIndicator.tsx
│   │   ├── pages/          # Page components
│   │   │   ├── Chat.tsx    # Chat interface
│   │   │   ├── Landing.tsx # Landing page
│   │   │   └── not-found.tsx
│   │   ├── App.tsx
│   │   └── index.css       # Tailwind + Theme variables
├── server/                 # Backend Express server
│   ├── routes.ts           # API endpoints
│   ├── schemes.ts          # Government schemes database
│   ├── openai.ts           # OpenAI integration
│   └── storage.ts          # In-memory storage
├── shared/
│   └── schema.ts           # Shared TypeScript types and Zod schemas
└── design_guidelines.md    # UI/UX design system
```

## API Endpoints

- `POST /api/chat` - Main chat endpoint (RAG-powered)
- `GET /api/schemes` - Get all schemes (with optional category filter)
- `GET /api/schemes/:id` - Get single scheme by ID
- `GET /api/search?q=` - Search schemes by keyword
- `GET /api/health` - Health check

## Key Features

1. **Smart Search**: Keyword-based scheme matching with category awareness
2. **Rich Scheme Cards**: Display benefits, eligibility, documents, and application process
3. **Conversation Context**: Maintains chat history for follow-up questions
4. **Dark Mode**: Full theme support with localStorage persistence
5. **Responsive Design**: Optimized for mobile and desktop
6. **Graceful Fallback**: Works even without OpenAI API key (with limited responses)

## Environment Variables

- `OPENAI_API_KEY` - Required for AI-powered responses (optional, has fallback)

## Running the Application

The application runs on port 5000:
- Frontend: Vite dev server with HMR
- Backend: Express server with API routes

## Government Schemes Database

Currently includes 16+ major Central Government schemes:

**Students**: PM Vidyalakshmi, National Scholarship Portal, PM YASASVI
**Farmers**: PM-KISAN, PM Fasal Bima Yojana, Kisan Credit Card
**Women**: PM Mudra Yojana, Stand Up India, Mahila Samman Savings
**Housing**: PM Awas Yojana (Urban & Gramin)
**Health**: Ayushman Bharat, Janani Suraksha Yojana
**Employment**: MGNREGA, PM Kaushal Vikas Yojana
**Senior Citizens**: PM Vaya Vandana, Indira Gandhi Old Age Pension
**Entrepreneurs**: Startup India, PMEGP

## User Preferences

- Government-themed blue color scheme with saffron accent
- Inter font family for readability
- Material Design-inspired components
- High contrast for accessibility

## Future Enhancements

- State Government schemes database
- User profile-based eligibility checking
- Multi-language support
- Admin dashboard for scheme management
- Voice input/output
- Scheme comparison feature
