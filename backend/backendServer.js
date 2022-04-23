const express = require('express')
var cors = require('cors')

const app = express()
const port = 5000

const dbRouter = require('./routes/dbRouter')

let corsOptions = {
  origin : ['http://localhost:3000'],
}

app.use(cors(corsOptions))

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use('/db', dbRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})