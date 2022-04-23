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


module.exports = {
  confirmUser,
  createUser,
  uniqueEmail
}