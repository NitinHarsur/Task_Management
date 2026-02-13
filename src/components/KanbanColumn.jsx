import TaskCard from './TaskCard'

function KanbanColumn({
  column,
  tasks,
  onDropTask,
  draggedTaskId,
  setDraggedTaskId,
  onDelete,
  onGenerateSubtasks,
  busySubtaskTaskId,
}) {
  return (
    <section
      className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-xl shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/40"
      onDragOver={(event) => event.preventDefault()}
      onDrop={() => onDropTask(column.id)}
    >
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{column.title}</h2>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600 shadow-sm dark:bg-slate-800 dark:text-slate-300">
          {tasks.length}
        </span>
      onDragOver={(event) => event.preventDefault()}
      onDrop={() => onDropTask(column.id)}
      className="rounded-2xl bg-slate-50 p-4"
    >
      <header className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">{column.title}</h2>
        <span className="rounded-full bg-white px-2 py-0.5 text-xs text-slate-500">{tasks.length}</span>
      </header>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} draggable onDragStart={() => setDraggedTaskId(task.id)}>
            <TaskCard
              busySubtaskTaskId={busySubtaskTaskId}
              onDelete={onDelete}
              onGenerateSubtasks={onGenerateSubtasks}
              task={task}

              task={task}
              onDelete={onDelete}
              onGenerateSubtasks={onGenerateSubtasks}
              busySubtaskTaskId={busySubtaskTaskId}
            />
          </div>
        ))}

        {!tasks.length && (
          <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm font-semibold text-slate-400 shadow-inner dark:border-slate-700 dark:bg-slate-800/70">
            NEW TASK

          <div className="rounded-lg border border-dashed border-slate-300 p-3 text-center text-xs text-slate-400">
            Drop tasks here
          </div>
        )}
      </div>
    </section>
  )
}

export default KanbanColumn
