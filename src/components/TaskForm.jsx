import { useState } from 'react'

function TaskForm({ onSubmit, loading }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!title.trim()) return

    await onSubmit({ title: title.trim(), description: description.trim() })
    setTitle('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-5 shadow-card">
      <h2 className="mb-3 text-lg font-semibold text-slate-800">Create New Task</h2>
      <div className="space-y-3">
        <input
          className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none ring-indigo-200 focus:ring"
          placeholder="Task title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <textarea
          className="h-24 w-full rounded-lg border border-slate-200 px-3 py-2 outline-none ring-indigo-200 focus:ring"
          placeholder="Description (optional)"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:opacity-60"
      >
        {loading ? 'Analyzing with AI...' : 'Add Task'}
      </button>
    </form>
  )
}

export default TaskForm
