const axios = require('axios')



function confirmUser(email, password){

if(email == ''){
  email = 'FAKEEMAIL'
}
if(password == ''){
  password = 'FAKEPASSWORD'
}

return axios.get(`http://localhost:5000/db/userlogin/${email}-${password}`)
  .then(function (response) {
    // handle success
    return response.data
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

function uniqueEmail(email){
  
  return axios.get(`http://localhost:5000/db/userexists/${email}`)
    .then(function (response) {
      // handle success
      if(response.data){
        return false
      } else {
        return true
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}


function createUser(email,pword, name, address, age, income){
  return axios.post('http://localhost:5000/db/usercreate/', {
    email: email,
    password: pword,
    name: name,
    address: address,
    age: age,
    income: income
  })
  .then(function (response) {
    return response
  })
  .catch(function (error) {
    console.log(error);
  });
}

function getAccountsForUser(email){
  return axios.get(`http://localhost:5000/db/userAcc/${email}`)
  .then(function (response) {
    // handle success
    return response.data
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

function getBanks(){
  return axios.get(`http://localhost:5000/db/banks/`)
  .then(function (response) {
    // handle success
    return response.data
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

function createBankAccount(email, bankid, accType){
  return axios.post(`http://localhost:5000/db/createBankAccount/`, {
    email: email,
    bankId: bankid,
    accType: accType
  })
  .then(function (response) {
    // handle success
    return response.data
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

function deposit(email, accId, amt){
  return axios.post(`http://localhost:5000/db/deposit/`, {
    email: email,
    accId: accId,
    amt: amt
  })
  .then(function (response) {
    // handle success
    return response.data
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

function withdraw(email, accId, amt){
  return axios.post(`http://localhost:5000/db/withdraw/`, {
    email: email,
    accId: accId,
    amt: amt
  })
  .then(function (response) {
    // handle success
    return response.data
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

function getUserInfo(email){
  return axios.get(`http://localhost:5000/db/userInfo/${email}`)
  .then(function (response) {
    // handle success
    return response.data
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

// Added by WH {

function updateUserInfo(email, pword, name, address, age, income) {
    return axios.post('http://localhost:5000/db/userupdate/', {
        email: email,
        password: pword,
        name: name,
        address: address,
        age: age,
        income: income
    })
    .then(function (response) {
        return response
    })
    .catch(function (error) {
        console.log(error);
    });
}

// }

function applyForCard(email, bankId){
  return axios.post(`http://localhost:5000/db/applyForCard/`, {
    email: email,
    bankId: bankId,
  })
  .then(function (response) {
    // handle success
    return response.data
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

function getTransactions(email){
  return axios.get(`http://localhost:5000/db/transactions/${email}`)
  .then(function (response) {
    // handle success
    return response.data
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}


module.exports = {
  confirmUser,
  createUser,
  updateUserInfo,
  uniqueEmail,
  getAccountsForUser,
  getBanks,
  createBankAccount,
  deposit,
  withdraw,
  getUserInfo,
  applyForCard,
  getTransactions
}