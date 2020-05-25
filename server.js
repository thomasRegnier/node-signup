const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const adminRouter = require('./routers/adminRouter').router
const authRouter = require('./routers/authRouter').router

const app = express()

const cors = require('cors')



app.use(helmet())
app.use(bodyParser.json())
app.use(cors())


app.use('/admin/', adminRouter)
app.use('/auth/', authRouter)

app.listen(8080, () => console.log('Serveur lancé sur le port 8080'))