import express from 'express'

import cors from 'cors'
import userRouter from './routes/userRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';

const app= express();

app.use(cors())
app.use(express.json())

app.use('/api/user',userRouter)
app.use('/api/doctor',doctorRoutes)


export default app;