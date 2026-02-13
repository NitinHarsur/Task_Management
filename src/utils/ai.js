const OPENAI_URL = import.meta.env.VITE_OPENAI_BASE_URL || 'https://api.openai.com/v1/chat/completions'
const OPENAI_MODEL = import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini'

const getHeaders = () => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY

  if (!apiKey) {
    throw new Error('Missing VITE_OPENAI_API_KEY in .env file')
  }

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  }
}

const parseJsonFromResponse = (text, fallback) => {
  try {
    return JSON.parse(text)
  } catch {
    return fallback
  }
}

export const getTaskInsights = async (task) => {
  // AI integration logic: ask the model for structured metadata when user creates a task.
  const prompt = `Analyze this task and return JSON only with keys: priority (Low|Medium|High), estimate, category.\nTitle: ${task.title}\nDescription: ${task.description || 'N/A'}`

  const response = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      model: OPENAI_MODEL,
      temperature: 0.2,
      messages: [
        { role: 'system', content: 'You are a task planning assistant. Return strict JSON only.' },
        { role: 'user', content: prompt },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to get AI suggestions')
  }

  const data = await response.json()
  const content = data?.choices?.[0]?.message?.content || '{}'

  return parseJsonFromResponse(content, {
    priority: 'Medium',
    estimate: 'Not provided',
    category: 'General',
  })
}

export const generateSubtasks = async (task) => {
  // AI integration logic: break a larger task into concrete, actionable subtasks.
  const prompt = `Break the task into 4-6 concise subtasks. Return JSON only with key subtasks as array of strings.\nTitle: ${task.title}\nDescription: ${task.description || 'N/A'}`

  const response = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      model: OPENAI_MODEL,
      temperature: 0.3,
      messages: [
        { role: 'system', content: 'You create implementation checklists. Return strict JSON only.' },
        { role: 'user', content: prompt },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to generate subtasks')
  }

  const data = await response.json()
  const content = data?.choices?.[0]?.message?.content || '{}'
  const parsed = parseJsonFromResponse(content, { subtasks: [] })

  return Array.isArray(parsed.subtasks) ? parsed.subtasks : []
}
