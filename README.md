# AI Powered Kanban Board

A clean, modern Kanban board built with **React + Vite + Tailwind CSS**, enhanced with AI-generated task insights and backed by a **MongoDB database** through a lightweight Express API.

## Features

- Three Kanban lanes: **To Do**, **In Progress**, **Done**
- Add tasks with title and optional description
- Drag and drop tasks across columns
- Delete tasks
- Persistent storage in **MongoDB**
- AI task enrichment on creation:
  - Suggested priority (**Low / Medium / High**)
  - Suggested completion estimate
  - Suggested category (Development, Research, Testing, etc.)
- AI subtask generation on demand
- Responsive, modern UI with rounded cards and soft shadows
- Color-coded priorities

## Tech Stack

- React (Vite)
- Tailwind CSS
- Express API + MongoDB (`mongodb` Node driver)
- OpenAI-compatible Chat Completions API

## Project Structure

```txt
.
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── .gitignore
├── .env.example
├── README.md
├── server
│   ├── db.js
│   └── index.js
└── src
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── components
    │   ├── KanbanColumn.jsx
    │   ├── TaskCard.jsx
    │   └── TaskForm.jsx
    └── utils
        ├── ai.js
        ├── api.js
        ├── constants.js
        └── storage.js
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in project root (or copy `.env.example`):

```env
VITE_OPENAI_API_KEY=your_api_key_here
VITE_OPENAI_MODEL=gpt-4o-mini
VITE_OPENAI_BASE_URL=https://api.openai.com/v1/chat/completions
VITE_API_BASE_URL=http://localhost:4000/api
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB_NAME=ai_kanban
```

3. Start MongoDB locally or provide a hosted MongoDB URI.

4. Start backend API server:

```bash
npm run server
```

5. In another terminal, start frontend:

```bash
npm run dev
```

6. Build for production:

```bash
npm run build
```

## API Key Security Notes

- Do **not** hardcode API keys in source files.
- Keep keys only in `.env`.
- `.env` is ignored via `.gitignore`.
- For production, keep AI calls behind a secure backend proxy.

## Database Notes

- Backend connects using `MONGODB_URI` and stores tasks in `MONGODB_DB_NAME`.
- Task IDs are app-generated UUIDs, and MongoDB also maintains its internal `_id` per document.

## License

MIT
