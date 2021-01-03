
import express from 'express'
import morgan from 'morgan'

import {createRoles} from './libs/initialSetup'

import productRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'

const app = express()
createRoles()

app.use(morgan('dev'))
app.use(express.json())

app.get('/',(req, res) => {
    res.json({
        "autor": "Miguel Angel Tomairo",
        "version": "1.0.0"
    })
})

app.use('/api/products',productRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

export default app