import { Router, Request, Response } from 'express'
import { generateNeighborhoods } from '../services/deepseek'
import type { GenerateRequest } from '../types'

const router = Router()

router.post('/generate', async (req: Request, res: Response) => {
  try {
    const body = req.body as GenerateRequest
    if (!body.city || !body.answers) {
      res.status(400).json({ error: 'Missing city or answers' })
      return
    }
    const neighborhoods = await generateNeighborhoods(body)
    res.json({ neighborhoods })
  } catch (err) {
    console.error('[generate]', err)
    res.status(500).json({ error: 'Generation failed. Check DEEPSEEK_API_KEY.' })
  }
})

export default router
