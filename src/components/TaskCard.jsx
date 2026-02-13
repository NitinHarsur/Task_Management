import { PRIORITY_STYLES } from '../utils/constants'

function TaskCard({ task, onDelete, onGenerateSubtasks, busySubtaskTaskId }) {
  const priorityStyle = PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.Medium

  return (
    <article draggable className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-800">{task.title}</h3>
      {task.description && <p className="mt-2 text-sm text-slate-600">{task.description}</p>}

      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <span className={`rounded-full border px-2 py-1 font-medium ${priorityStyle}`}>{task.priority} priority</span>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-slate-600">{task.estimate}</span>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-slate-600">{task.category}</span>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => onGenerateSubtasks(task.id)}
          className="rounded-md bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-100"
          disabled={busySubtaskTaskId === task.id}
        >
          {busySubtaskTaskId === task.id ? 'Generating...' : 'Generate Subtasks'}
        </button>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="rounded-md bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-100"
        >
          Delete
        </button>
      </div>

      {task.subtasks?.length > 0 && (
        <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-slate-700">
          {task.subtasks.map((subtask, index) => (
            <li key={`${task.id}-${index}`}>{subtask}</li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default TaskCard
