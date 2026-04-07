import { Request, Response } from 'express'
import * as statsService from '../services/statsService'

export const getStats = async (_req: Request, res: Response) => {
  try {
    const stats = await statsService.getStats()
    res.json(stats)
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}