import express from 'express'
import cors from 'cors'
import postRoutes from './routes/postRoutes'
import userRoutes from './routes/userRoutes'
import statsRoutes from './routes/statsRoutes'
import { errorHandler } from './middleware/errorHandler'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)
app.use('/api/stats', statsRoutes)

app.use(errorHandler)

export default app
