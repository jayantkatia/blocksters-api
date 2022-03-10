// load environment variables
require('dotenv').config()

// imports
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

// Router imports
const studentsRoutes = require('./routes/student')
const instituteRoutes = require('./routes/institute')
const verificationRoutes = require('./routes/verification')

// Database
const db = require('./db/database')

db.authenticate()
  .then(()=>{
    console.log('DB Connected')
    return db.sync(
      // {force: true}
    )
  })
  .then(()=>console.log('DB Synced'))
  .catch(err=>{
    console.error(`Error: ${err}`)
  })


// Server
const app = express()
const port = process.env.PORT || 4000

// Middlewares
app.use(cors({credentials: true}))
app.use(express.json())
app.use(cookieParser())
console.log('hello')

// Routes
app.use('/api/students/', studentsRoutes)
app.use('/api/institute/', instituteRoutes)
app.use('/api/verify/', verificationRoutes)


// Application server listen
app.listen(port, () => {
  console.log(`Institute API listening at http://localhost:${port}`)
})