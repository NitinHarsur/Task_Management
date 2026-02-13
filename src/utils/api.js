const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(data.message || 'API request failed')
  }

  if (response.status === 204) return null
  return response.json()
}

export const taskApi = {
  getAll: () => request('/tasks'),
  create: (task) => request('/tasks', { method: 'POST', body: JSON.stringify(task) }),
  update: (task) => request(`/tasks/${task.id}`, { method: 'PUT', body: JSON.stringify(task) }),
  remove: (taskId) => request(`/tasks/${taskId}`, { method: 'DELETE' }),
}
