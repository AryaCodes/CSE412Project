const { Client } = require('pg');

function confirmUser(email,pword){

  const client = new Client({
    user: 'postgres',
    host: 'cse412-bank-app.ceyczuyfxexi.us-west-1.rds.amazonaws.com',
    database: 'cse412-bank',
    password: 'cse412-password',
    port: 5432,
  });

  client.connect();

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

function confirmExists(email,pword){

  const client = new Client({
    user: 'postgres',
    host: 'cse412-bank-app.ceyczuyfxexi.us-west-1.rds.amazonaws.com',
    database: 'cse412-bank',
    password: 'cse412-password',
    port: 5432,
  });

  client.connect();

  const query = `
  SELECT * FROM users WHERE email='${email}';
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

function createUser(email,pword, name, address, age, income){

  const client = new Client({
    user: 'postgres',
    host: 'cse412-bank-app.ceyczuyfxexi.us-west-1.rds.amazonaws.com',
    database: 'cse412-bank',
    password: 'cse412-password',
    port: 5432,
  });

  client.connect();

  const query = `
  INSERT INTO users
  VALUES('${email}', '${name}', '${address}', '${pword}', ${age}, ${income});
  `
  console.log(query)

  return client
  .query(query)
  .then(res => {
    return true
    // return res.rows.length > 0
  })
  .catch(err => {
    console.log('There was a problem with the db')
    return false
  })
  .finally(() => {
    client.end()
  })
}

module.exports = {
  confirmUser,
  createUser,
  confirmExists
}
