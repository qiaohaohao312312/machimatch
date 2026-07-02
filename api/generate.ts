import type { VercelRequest, VercelResponse } from '@vercel/node'
import { generateNeighborhoods } from '../server/services/deepseek'
import type { GenerateRequest } from '../server/types'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const body = req.body as GenerateRequest
  if (!body?.city || !body?.answers) {
    res.status(400).json({ error: 'Missing city or answers' })
    return
  }

  try {
    const neighborhoods = await generateNeighborhoods(body)
    res.status(200).json({ neighborhoods })
  } catch (err) {
    console.error('[generate]', err)
    res.status(500).json({ error: 'Generation failed. Check DEEPSEEK_API_KEY.' })
  }
}
