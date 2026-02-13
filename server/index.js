import express from 'express'
import cors from 'cors'
import { getTasksCollection, initializeDb } from './db.js'

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

const removeMongoId = (task) => {
  const { _id, ...rest } = task
  return rest
}

app.get('/api/health', (_, response) => {
  response.json({ ok: true })
})

app.get('/api/tasks', async (_, response) => {
  try {
    const tasksCollection = await getTasksCollection()
    const rows = await tasksCollection.find({}).sort({ createdAt: -1 }).toArray()
    response.json(rows.map(removeMongoId))
  } catch {
    response.status(500).json({ message: 'Failed to load tasks' })
  }
})

app.post('/api/tasks', async (request, response) => {
  const { id, title, description = '', status, priority, estimate, category, subtasks = [], createdAt } = request.body

  if (!id || !title || !status || !priority || !estimate || !category || !createdAt) {
    return response.status(400).json({ message: 'Missing required task fields' })
  }

  try {
    const tasksCollection = await getTasksCollection()
    const newTask = { id, title, description, status, priority, estimate, category, subtasks, createdAt }
    await tasksCollection.insertOne(newTask)
    response.status(201).json(newTask)
  } catch {
    response.status(500).json({ message: 'Failed to create task' })
  }
})

app.put('/api/tasks/:id', async (request, response) => {
  const { id } = request.params
  const { title, description = '', status, priority, estimate, category, subtasks = [] } = request.body

  try {
    const tasksCollection = await getTasksCollection()
    const updateResult = await tasksCollection.updateOne(
      { id },
      {
        $set: { title, description, status, priority, estimate, category, subtasks },
      },
    )

    if (!updateResult.matchedCount) return response.status(404).json({ message: 'Task not found' })

    const updated = await tasksCollection.findOne({ id })
    response.json(removeMongoId(updated))
  } catch {
    response.status(500).json({ message: 'Failed to update task' })
  }
})

app.delete('/api/tasks/:id', async (request, response) => {
  try {
    const tasksCollection = await getTasksCollection()
    const result = await tasksCollection.deleteOne({ id: request.params.id })

    if (!result.deletedCount) return response.status(404).json({ message: 'Task not found' })
    response.status(204).send()
  } catch {
    response.status(500).json({ message: 'Failed to delete task' })
  }
})

initializeDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`API server running on http://localhost:${port}`)
    })
  })
  .catch(() => {
    console.error('Failed to connect to MongoDB. Check MONGODB_URI and try again.')
    process.exit(1)
  })
