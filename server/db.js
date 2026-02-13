import { MongoClient } from 'mongodb'

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017'
const dbName = process.env.MONGODB_DB_NAME || 'ai_kanban'

const client = new MongoClient(mongoUri)
let database

export const initializeDb = async () => {
  if (database) return database

  await client.connect()
  database = client.db(dbName)

  await database.collection('tasks').createIndex({ id: 1 }, { unique: true })
  await database.collection('tasks').createIndex({ createdAt: -1 })

  return database
}

export const getTasksCollection = async () => {
  const db = await initializeDb()
  return db.collection('tasks')
}
