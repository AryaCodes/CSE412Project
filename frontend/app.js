const express = require('express')
const path = require('path')
const app = express()
const port = 3000

indexPath = path.join(__dirname, 'public')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(indexPath + "/index.html")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})