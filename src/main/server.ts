import express from 'express'

import { env } from '@/infra/env'

import { routesUsers } from './routes/users'
import { routesTasks } from './routes/tasks'

const app = express()

app.use(express.json())
app.use(routesUsers)  
app.use(routesTasks)

app.listen(env.PORT, () => {
    console.log('Server is running!')
})