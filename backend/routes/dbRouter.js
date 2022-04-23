const db_conn = require('../js/connectToDB')

const express = require('express')
const router = express.Router()


// define the home page route
router.get('/', (req, res) => {
  res.send('HelloDB!')
})

router.get('/userlogin/:email-:password', async (req, res) => {
  user_exists = await db_conn.confirmUser(req.params.email, req.params.password)
  console.log(user_exists)
  res.send(user_exists)
})



module.exports = router