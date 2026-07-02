import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import generateRouter from './routes/generate'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '.env') })

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/api', generateRouter)

app.get('/health', (_req, res) => res.json({ ok: true }))

app.listen(PORT, () => {
  console.log(`🗾  Machimatch server → http://localhost:${PORT}`)
  if (!process.env.DEEPSEEK_API_KEY) {
    console.warn('⚠️  DEEPSEEK_API_KEY not set — copy server/.env.example to server/.env')
  }
})
