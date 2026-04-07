import { Request, Response, NextFunction } from 'express'

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err)

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Validation error', error: err.message })
  }

  if (err.name === 'MongoError' || err.name === 'MongoServerError') {
    return res.status(500).json({ message: 'Database error', error: err.message })
  }

  res.status(500).json({ message: 'Internal server error', error: err.message })
}
