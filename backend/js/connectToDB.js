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

function getUserACC(email){

  const client = new Client({
    user: 'postgres',
    host: 'cse412-bank-app.ceyczuyfxexi.us-west-1.rds.amazonaws.com',
    database: 'cse412-bank',
    password: 'cse412-password',
    port: 5432,
  });

  client.connect();

  const query = `
  select * from acc_holders where uemail='${email}';
  `
  console.log(query)

  return client
  .query(query)
  .then(res => {
    return res.rows
  })
  .catch(err => {
    console.log('There was a problem with the db')
    console.log(err)
  })
  .finally(() => {
    client.end()
  })
}

function getAccount(accID){

  const client = new Client({
    user: 'postgres',
    host: 'cse412-bank-app.ceyczuyfxexi.us-west-1.rds.amazonaws.com',
    database: 'cse412-bank',
    password: 'cse412-password',
    port: 5432,
  });

  client.connect();

  const query = `
  select * from accounts where accountid='${accID}';
  `
  console.log(query)

  return client
  .query(query)
  .then(res => {
    return res.rows
  })
  .catch(err => {
    console.log('There was a problem with the db')
    console.log(err)
  })
  .finally(() => {
    client.end()
  })
}

function getBank(bankID='NOBANK'){

  const client = new Client({
    user: 'postgres',
    host: 'cse412-bank-app.ceyczuyfxexi.us-west-1.rds.amazonaws.com',
    database: 'cse412-bank',
    password: 'cse412-password',
    port: 5432,
  });

  client.connect();

  let query = ""
  if(bankID=='NOBANK'){
    query = `
    select * from banks;
    `
  }
  else{ 
    query = `
  select * from banks where bankid='${bankID}';
  `
}
  console.log(query)

  return client
  .query(query)
  .then(res => {
    return res.rows
  })
  .catch(err => {
    console.log('There was a problem with the db')
    console.log(err)
  })
  .finally(() => {
    client.end()
  })
}

function createAccount(bankID, accType){

  const client = new Client({
    user: 'postgres',
    host: 'cse412-bank-app.ceyczuyfxexi.us-west-1.rds.amazonaws.com',
    database: 'cse412-bank',
    password: 'cse412-password',
    port: 5432,
  });

  client.connect();

  const query = `
  insert into accounts (balance, type, bankid) values (0.0, '${accType}', ${bankID}) RETURNING accountid;
  `
  console.log(query)

  return client
  .query(query)
  .then(res => {
    console.log(res)
    return res.rows[0]
  })
  .catch(err => {
    console.log(err)
    console.log('There was a problem with the db')
    return false
  })
  .finally(() => {
    client.end()
  })
}

function linkAccount(email, accountId){

  const client = new Client({
    user: 'postgres',
    host: 'cse412-bank-app.ceyczuyfxexi.us-west-1.rds.amazonaws.com',
    database: 'cse412-bank',
    password: 'cse412-password',
    port: 5432,
  });

  client.connect();

  const query = `
  insert into acc_holders (uemail, accid) values ('${email}', ${accountId});
  `
  console.log(query)

  return client
  .query(query)
  .then(res => {
    console.log(res)
    return true
  })
  .catch(err => {
    console.log(err)
    console.log('There was a problem with the db')
    return false
  })
  .finally(() => {
    client.end()
  })
}

function hasAccount(email, accId){

  const client = new Client({
    user: 'postgres',
    host: 'cse412-bank-app.ceyczuyfxexi.us-west-1.rds.amazonaws.com',
    database: 'cse412-bank',
    password: 'cse412-password',
    port: 5432,
  });

  client.connect();

  const query = `
  select * from acc_holders where uemail='${email}' and accid=${accId};
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

function deposit(accId, amt){

  const client = new Client({
    user: 'postgres',
    host: 'cse412-bank-app.ceyczuyfxexi.us-west-1.rds.amazonaws.com',
    database: 'cse412-bank',
    password: 'cse412-password',
    port: 5432,
  });

  client.connect();

  const query = `
  UPDATE accounts SET balance = balance + ${amt} WHERE accountid = ${accId};
  `
  console.log(query)

  return client
  .query(query)
  .then(res => {
    return true
  })
  .catch(err => {
    console.log('There was a problem with the db')
    console.log(err)
    return false
  })
  .finally(() => {
    client.end()
  })
}

function withdraw(accId, amt){

  const client = new Client({
    user: 'postgres',
    host: 'cse412-bank-app.ceyczuyfxexi.us-west-1.rds.amazonaws.com',
    database: 'cse412-bank',
    password: 'cse412-password',
    port: 5432,
  });

  client.connect();

  const query = `
  UPDATE accounts SET balance = balance - ${amt} WHERE accountid = ${accId};
  `
  console.log(query)

  return client
  .query(query)
  .then(res => {
    return true
  })
  .catch(err => {
    console.log('There was a problem with the db')
    console.log(err)
    return false
  })
  .finally(() => {
    client.end()
  })
}

function recordTransaction(email, accountId, amt, transType){

  const client = new Client({
    user: 'postgres',
    host: 'cse412-bank-app.ceyczuyfxexi.us-west-1.rds.amazonaws.com',
    database: 'cse412-bank',
    password: 'cse412-password',
    port: 5432,
  });

  client.connect();

  const query = `
  insert into transactions (uemail, accid, type, amount) values ('${email}', ${accountId}, '${transType}', ${amt});
  `
  console.log(query)

  return client
  .query(query)
  .then(res => {
    console.log(res)
    return true
  })
  .catch(err => {
    console.log(err)
    console.log('There was a problem with the db')
    return false
  })
  .finally(() => {
    client.end()
  })
}

function enoughFunds(amt, accountId){

  const client = new Client({
    user: 'postgres',
    host: 'cse412-bank-app.ceyczuyfxexi.us-west-1.rds.amazonaws.com',
    database: 'cse412-bank',
    password: 'cse412-password',
    port: 5432,
  });

  client.connect();

  const query = `
  select balance from accounts where accountid = ${accountId};
  `
  console.log(query)

  return client
  .query(query)
  .then(res => {
    console.log(res)
    let currentBalance = res.rows[0].balance
    return amt <= currentBalance
  })
  .catch(err => {
    console.log(err)
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
  confirmExists,
  getUserACC,
  getAccount,
  getBank,
  createAccount,
  linkAccount,
  hasAccount,
  deposit,
  withdraw,
  recordTransaction,
  enoughFunds
}
