import { useEffect, useMemo, useState } from 'react'
import KanbanColumn from './components/KanbanColumn'
import TaskForm from './components/TaskForm'
import { generateSubtasks, getTaskInsights } from './utils/ai'
import { COLUMNS } from './utils/constants'
import { taskApi } from './utils/api'

const THEME_KEY = 'kanban-theme'

const createTaskPayload = ({ title, description, suggestions }) => ({
const createTaskPayload = ({ title, description, suggestions }) => ({
import { loadTasks, saveTasks } from './utils/storage'

const createTask = ({ title, description, suggestions }) => ({
  id: crypto.randomUUID(),
  title,
  description,
  status: 'todo',
  priority: suggestions.priority || 'Medium',
  estimate: suggestions.estimate || 'Not provided',
  category: suggestions.category || 'General',
  subtasks: [],
  createdAt: new Date().toISOString(),
})

function App() {
  const [tasks, setTasks] = useState([])


})

function App() {
  const [tasks, setTasks] = useState(() => loadTasks())
  const [draggedTaskId, setDraggedTaskId] = useState(null)
  const [loadingTask, setLoadingTask] = useState(false)
  const [busySubtaskTaskId, setBusySubtaskTaskId] = useState(null)
  const [error, setError] = useState('')
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || 'light')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])


  useEffect(() => {
    const loadTasks = async () => {
      try {
        const dbTasks = await taskApi.getAll()
        setTasks(dbTasks)
      } catch {
        setError('Failed to load tasks from database. Start API server and try again.')
      }
    }

    loadTasks()
  }, [])

    saveTasks(tasks)
  }, [tasks])

  const tasksByColumn = useMemo(
    () =>
      COLUMNS.reduce((acc, column) => {
        acc[column.id] = tasks.filter((task) => task.status === column.id)
        return acc
      }, {}),
    [tasks],
  )

  const addTask = async (taskInput) => {
    setError('')
    setLoadingTask(true)

    try {
      const suggestions = await getTaskInsights(taskInput)
      const newTask = createTaskPayload({ ...taskInput, suggestions })
      const created = await taskApi.create(newTask)
      setTasks((previous) => [created, ...previous])
    } catch {
      setError('Task creation failed. Check AI/API server configuration and try again.')


      setTasks((previous) => [createTask({ ...taskInput, suggestions }), ...previous])
    } catch (aiError) {
      setError('AI insights unavailable. Task created with default values.')
      setTasks((previous) => [createTask({ ...taskInput, suggestions: {} }), ...previous])
    } finally {
      setLoadingTask(false)
    }
  }

  const moveTask = async (toStatus) => {
    if (!draggedTaskId) return
    const task = tasks.find((item) => item.id === draggedTaskId)
    if (!task) return

    const updatedTask = { ...task, status: toStatus }

    try {
      const saved = await taskApi.update(updatedTask)
      setTasks((previous) => previous.map((item) => (item.id === draggedTaskId ? saved : item)))
    } catch {
      setError('Failed to update task status in database.')
    } finally {
      setDraggedTaskId(null)
    }
  }

  const deleteTask = async (taskId) => {
    try {
      await taskApi.remove(taskId)
      setTasks((previous) => previous.filter((task) => task.id !== taskId))
    } catch {
      setError('Failed to delete task from database.')
    }


  const moveTask = (toStatus) => {
    if (!draggedTaskId) return

    setTasks((previous) =>
      previous.map((task) => (task.id === draggedTaskId ? { ...task, status: toStatus } : task)),
    )
    setDraggedTaskId(null)
  }

  const deleteTask = (taskId) => {
    setTasks((previous) => previous.filter((task) => task.id !== taskId))
  }

  const handleGenerateSubtasks = async (taskId) => {
    setError('')
    setBusySubtaskTaskId(taskId)

    try {
      const currentTask = tasks.find((task) => task.id === taskId)
      if (!currentTask) return

      const subtasks = await generateSubtasks(currentTask)
      const updated = await taskApi.update({ ...currentTask, subtasks })
      setTasks((previous) => previous.map((task) => (task.id === taskId ? updated : task)))
    } catch {
      setError('Failed to generate/save subtasks. Please check your AI key and API server.')


      setTasks((previous) =>
        previous.map((task) => (task.id === taskId ? { ...task, subtasks } : task)),
      )
    } catch {
      setError('Failed to generate subtasks. Please check your API key and try again.')
    } finally {
      setBusySubtaskTaskId(null)
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <header className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-xl shadow-slate-200/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-black/40 md:p-5">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-indigo-600 text-xl font-bold text-white shadow-lg shadow-indigo-300/60">
                K
              </div>
              <div>
                <h1 className="text-2xl font-extrabold">KanbanFlow AI</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">Streamline your productivity</p>
              </div>
            </div>

            <div className="flex-1" />

            <label className="flex min-w-[260px] items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 shadow-inner dark:border-slate-700 dark:bg-slate-800 md:min-w-[360px]">
              <span className="text-slate-500">🔎</span>
              <input
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                placeholder="Search tasks, projects or files..."
                type="text"
              />
            </label>

            <button
              type="button"
              onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold shadow-md hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
        </header>

        <section className="mt-6 grid gap-5 lg:grid-cols-2">
          <TaskForm onSubmit={addTask} loading={loadingTask} />

          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/40">
            <h2 className="text-2xl font-bold">✨ AI Insights</h2>
            <div className="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 shadow-md dark:border-indigo-900/50 dark:bg-indigo-950/30">
              <p className="text-lg font-medium">
                You can create, sort, and break down tasks instantly with AI-generated priorities and subtasks.
              </p>
            </div>
            {error && (
              <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700 shadow-md dark:border-amber-900/60 dark:bg-amber-950/20 dark:text-amber-300">
                {error}
              </p>
            )}
          </article>
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-3">

    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">AI-Powered Kanban Board</h1>
          <p className="mt-1 text-slate-600">Now backed by SQLite for durable task storage.</p>

          <p className="mt-1 text-slate-600">Manage work with drag-and-drop and instant AI suggestions.</p>
        </header>

        <div className="mb-6 grid gap-6 lg:grid-cols-[360px,1fr]">
          <TaskForm onSubmit={addTask} loading={loadingTask} />
          <div className="rounded-2xl bg-white p-5 shadow-card">
            <h2 className="text-lg font-semibold text-slate-800">How AI + Database helps</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
              <li>Auto-generates priority, category, and estimated time at task creation.</li>
              <li>Breaks large tasks into smaller subtasks with one click.</li>
              <li>Stores task state in SQLite via a lightweight API server.</li>

            <h2 className="text-lg font-semibold text-slate-800">How AI helps</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
              <li>Auto-generates priority, category, and estimated time at task creation.</li>
              <li>Breaks large tasks into smaller subtasks with one click.</li>
              <li>All task data persists locally in your browser.</li>
            </ul>
            {error && <p className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-700">{error}</p>}
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          {COLUMNS.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={tasksByColumn[column.id] || []}
              onDropTask={moveTask}
              draggedTaskId={draggedTaskId}
              setDraggedTaskId={setDraggedTaskId}
              onDelete={deleteTask}
              onGenerateSubtasks={handleGenerateSubtasks}
              busySubtaskTaskId={busySubtaskTaskId}
            />
          ))}
        </section>
      </div>
    </main>
  )
}

export default App
