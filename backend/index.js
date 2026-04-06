import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js'
import userRoutes from './routes/userRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import messageRoutes from './routes/messageRoutes.js'

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)

const app = express()

await connectDB()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send('Server is Live!'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})