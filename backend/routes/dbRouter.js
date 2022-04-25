const db_conn = require('../js/connectToDB')

const express = require('express')
const { info } = require('console')
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

router.get('/userAcc/:email', async (req, res) => {

  user_acc = await db_conn.getUserACC(req.params.email)
  let info = []

  if(user_acc != undefined && user_acc.length > 0){
    for(acc of user_acc){
      accountInfo = await db_conn.getAccount(acc.accid)
      bankInfo = await db_conn.getBank(accountInfo[0].bankid)

      info.push({
        'bankName':bankInfo[0].name,
        'accountId':accountInfo[0].accountid,
        'balance':accountInfo[0].balance
      })
    }
  }

  console.log(info)
  // res.send(user_acc)
  res.send(info)
})



module.exports = router