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
              task={task}
              onDelete={onDelete}
              onGenerateSubtasks={onGenerateSubtasks}
              busySubtaskTaskId={busySubtaskTaskId}
            />
          </div>
        ))}

        {!tasks.length && (
          <div className="rounded-lg border border-dashed border-slate-300 p-3 text-center text-xs text-slate-400">
            Drop tasks here
          </div>
        )}
      </div>
    </section>
  )
}

export default KanbanColumn
