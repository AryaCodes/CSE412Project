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



module.exports = {
  confirmUser
}