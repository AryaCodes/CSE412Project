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

router.get('/userexists/:email', async (req, res) => {
  user_exists = await db_conn.confirmExists(req.params.email)
  console.log(user_exists)

  res.send(user_exists)
})

router.post('/usercreate', async (req, res) => {
  console.log(req.body)
  user_status = await db_conn.createUser(req.body.email, 
    req.body.password,
    req.body.name, req.body.address, req.body.age, req.body.income)
  
    console.log(user_status)
  res.send(user_status)
})



module.exports = router