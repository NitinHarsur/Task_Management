import { PRIORITY_STYLES } from '../utils/constants'

function TaskCard({ task, onDelete, onGenerateSubtasks, busySubtaskTaskId }) {
  const priorityStyle = PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.Medium

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/80 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/40">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-xl font-bold">{task.title}</h3>
        <span className={`rounded-full border px-2 py-1 text-xs font-bold uppercase tracking-wide shadow-sm ${priorityStyle}`}>
          {task.priority} priority
        </span>
      </div>

      {task.description && <p className="mt-2 text-base text-slate-600 dark:text-slate-300">{task.description}</p>}

      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          {task.estimate}
        </span>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          {task.category}
        </span>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          className="rounded-xl bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 shadow-md hover:bg-indigo-100 disabled:opacity-70 dark:bg-indigo-950/40 dark:text-indigo-300"
          disabled={busySubtaskTaskId === task.id}
          onClick={() => onGenerateSubtasks(task.id)}
          type="button"
        >
          {busySubtaskTaskId === task.id ? 'Generating...' : 'Generate Subtasks'}
        </button>
        <button
          className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 shadow-md hover:bg-rose-100 dark:bg-rose-950/30 dark:text-rose-300"
          onClick={() => onDelete(task.id)}
          type="button"
        >
          Delete
        </button>
      </div>

      {task.subtasks?.length > 0 && (
        <ul className="mt-3 list-disc space-y-1 rounded-xl border border-slate-200 bg-slate-50 p-3 pl-6 text-sm text-slate-700 shadow-inner dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          {task.subtasks.map((subtask, index) => (
            <li key={`${task.id}-${index}`}>{subtask}</li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default TaskCard
