import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoutes from './routes/userRoutes'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/users', userRoutes)

mongoose.connect('mongodb://127.0.0.1:27017/inspirer')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err))

app.listen(3001, () => {
  console.log('Server running on port 3001')
})