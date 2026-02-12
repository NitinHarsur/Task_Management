const STORAGE_KEY = 'ai-kanban-board-data'

export const loadTasks = () => {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value ? JSON.parse(value) : []
  } catch (error) {
    console.error('Failed to load tasks from localStorage', error)
    return []
  }
}

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch (error) {
    console.error('Failed to save tasks to localStorage', error)
  }
}
