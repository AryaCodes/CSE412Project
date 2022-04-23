const express = require('express')
const app = express()
const port = 5000

const dbRouter = require('./routes/dbRouter')

app.use('/db', dbRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})