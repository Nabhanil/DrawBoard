import express from 'express'
import userRouter from './Routes/userRouter';

const app = express()

app.use(express.json());

app.use('/api/v1/user', userRouter)


app.listen(3001)