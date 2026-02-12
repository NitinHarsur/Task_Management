# AI Powered Kanban Board

A clean, modern Kanban board built with **React + Vite + Tailwind CSS**, enhanced with AI-generated task insights and subtasks.

## Features

- Three Kanban lanes: **To Do**, **In Progress**, **Done**
- Add tasks with title and optional description
- Drag and drop tasks across columns
- Delete tasks
- Persistent local data using `localStorage`
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
- OpenAI-compatible Chat Completions API
- localStorage for persistence

## Project Structure

```txt
.
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── .gitignore
├── README.md
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
        ├── constants.js
        └── storage.js
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in project root:

```env
VITE_OPENAI_API_KEY=your_api_key_here
VITE_OPENAI_MODEL=gpt-4o-mini
# Optional: if using another provider endpoint
VITE_OPENAI_BASE_URL=https://api.openai.com/v1/chat/completions
```

3. Start development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## API Key Security Notes

- Do **not** hardcode API keys in source files.
- Keep keys only in `.env`.
- `.env` is ignored via `.gitignore`.
- For production, route API calls through a backend proxy to avoid exposing keys in browser code.

## AI Integration Notes

- AI metadata and subtasks are requested in `src/utils/ai.js`.
- Prompt responses are expected as strict JSON for simple parsing.
- Fallback values are used if the AI request fails.

## License

MIT
