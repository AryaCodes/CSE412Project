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

router.get('/banks', async (req, res) => {
  banks = await db_conn.getBank()
  console.log(banks)

  res.send(banks)
})

router.get('/userInfo/:email', async (req, res) => {
  let info = await db_conn.getUserInfo(req.params.email)
  console.log(info)

  res.send(info)
})

router.post('/createBankAccount', async (req, res) => {
  console.log(req.body)
  // create the bank account
  let bankAccountID = await db_conn.createAccount(req.body.bankId, req.body.accType)
  
  // link the account to the user
  link_account = await db_conn.linkAccount(req.body.email, bankAccountID.accountid)

  // return the bank account number
  if(link_account){
    console.log(bankAccountID)
    res.send({'accId': bankAccountID.accountid})
  }
  else{
    console.log('errror')
    res.send({'accId': -1})
  }
})

router.post('/deposit', async (req, res) => {
  console.log(req.body)
  // confirm this user has account
  let confirmAcc = await db_conn.hasAccount(req.body.email, req.body.accId)
  
  if(!confirmAcc){
    res.send({'status': -1, 'msg': 'This user does not own this account!'})
    return
  }

  // if they do, do the deposit
  let depositStatus = await db_conn.deposit(req.body.accId, req.body.amt)

  if(!depositStatus){
    res.send({'status': -1, 'msg': 'There was an error depositing the funds!'})
    return
  }

  // save the transaction in the transactions table
  let transactionStatus = await db_conn.recordTransaction(req.body.email, req.body.accId, req.body.amt, 'deposit')

  if(!transactionStatus){
    res.send({'status': -1, 'msg': 'There was an error depositing the funds!'})
    return
  }
  
  // return the bank account number
  console.log(depositStatus)
  res.send({'status': 0, 'msg': `Deposited $${req.body.amt} into acc #${req.body.accId}`})

})

router.post('/withdraw', async (req, res) => {
  console.log(req.body)
  // confirm this user has account
  let confirmAcc = await db_conn.hasAccount(req.body.email, req.body.accId)
  
  if(!confirmAcc){
    res.send({'status': -1, 'msg': 'This user does not own this account!'})
    return
  }

  // make sure they have enough funds
  let enoughFunds = await db_conn.enoughFunds(req.body.amt, req.body.accId)

  if(!enoughFunds){
    res.send({'status': -1, 'msg': 'You do not have enough funds to make this withdrawal!'})
    return
  }

  // if they do, do the withdrawal
  let withdrawalStatus = await db_conn.withdraw(req.body.accId, req.body.amt)

  if(!withdrawalStatus){
    res.send({'status': -1, 'msg': 'There was an error withdrawing the funds!'})
    return
  }

  // save the transaction in the transactions table
  let transactionStatus = await db_conn.recordTransaction(req.body.email, req.body.accId, req.body.amt, 'withdrawal')

  if(!transactionStatus){
    res.send({'status': -1, 'msg': 'There was an error withdrawing the funds!'})
    return
  }
  
  // return the bank account number
  console.log(withdrawalStatus)
  res.send({'status': 0, 'msg': `withdrawing $${req.body.amt} from acc #${req.body.accId}`})

})

router.post('/applyForCard', async (req, res) => {
  console.log(req.body)
  // confirm this bank is real
  let bankId = await db_conn.getBank(req.body.bankId)
  
  if(bankId.length <= 0){
    res.send({'status': -1, 'msg': 'This is not a real bank!'})
    return
  }

  // get the user
  let userInfo = await db_conn.getUserInfo(req.body.email)

  let qualifiesForAccount = bankId[0].credit_min <= userInfo.rep_income

  if(!qualifiesForAccount){
    res.send({'status': -1, 'msg': 'You do not make enough to qualify!'})
    return
  }
  
  console.log(qualifiesForAccount)
  res.send({'status': 0, 'msg': `you qualify to open a credit card at "${bankId[0].name}" please go in person to do so.`})

})

module.exports = router