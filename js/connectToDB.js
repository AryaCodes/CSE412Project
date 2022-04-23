const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'cse412-bank-app.ceyczuyfxexi.us-west-1.rds.amazonaws.com',
    database: 'cse412-bank',
    password: 'cse412-password',
    port: 5432,
});

client.connect();

function confirmUser(email,pword){
  const query = `
  SELECT * FROM users WHERE email='${email}' AND upassword='${pword}';
  `
  console.log(query)

  return client
  .query(query)
  .then(res => {
    return res.rows.length > 0
  })
  .catch(err => {
    console.log('There was a problem with the db')
    console.log(err)
  })
  .finally(() => {
    client.end()
  })
}

module.exports = {
  confirmUser
}
