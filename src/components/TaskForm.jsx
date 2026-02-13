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
    <form className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/40" onSubmit={handleSubmit}>
      <h2 className="mb-4 text-2xl font-bold">Quick Create</h2>
      <div className="space-y-3">
        <input
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-indigo-300 transition focus:ring dark:border-slate-700 dark:bg-slate-800"
          onChange={(event) => setTitle(event.target.value)}
          placeholder="What needs to be done?"
          required
          value={title}
        />
        <textarea
          className="h-24 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-indigo-300 transition focus:ring dark:border-slate-700 dark:bg-slate-800"
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description (optional)"
          value={description}
        />
      </div>
      <button
        className="mt-4 w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-300/60 transition hover:bg-indigo-500 disabled:opacity-60"
        disabled={loading}
        type="submit"
      >
        {loading ? 'Analyzing with AI...' : '+ Add Task'}
      </button>
    </form>
  )
}

export default TaskForm
