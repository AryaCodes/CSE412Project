import "./css/styles.css";

var user_email;
window.user_login = user_login;
window.user_signup = user_signup;
window.user_update = user_update;
window.display_user_info = display_user_info;
window.deposit = deposit;
window.withdraw = withdraw;

function user_login() {
    var login_email = document.getElementById("login_email").value;
    var login_password = document.getElementById("login_password").value;
    console.log(login_email);

    var email_is_valid = true;
    // Write the sql query here that checks the email and password against the ones in our database. 
    // If it is valid then set the above email_is_valid to True else False.
    // For the query you can use login_email and login_password.

    if(email_is_valid){
        // console.log("Here");
        user_email = login_email;
        // alert("User " + user_email +" has logged in.");
        window.location.href = "user.html";
    }

    else
    {
        alert("Incorrect Email or Password.");
    }

}

function user_signup() {
    var signup_email = document.getElementById("signup_email").value;
    var signup_password = document.getElementById("signup_password").value;
    var signup_confirm_password = document.getElementById("signup_confirm_password").value;
    var signup_name = document.getElementById("signup_name").value;
    var signup_address = document.getElementById("signup_address").value;
    var signup_age = document.getElementById("signup_age").value;
    var signup_income = document.getElementById("signup_income").value;

    signup_age = parseInt(signup_age);
    signup_income = parseInt(signup_income);

    var email_is_unique = true;
    // Query here that checks if a user with this email already exists. If it does set email_is_unique to false.

    var passwords_match = true;
    if(signup_password != signup_confirm_password)
    {
        passwords_match = false;
    }

    if(email_is_unique && passwords_match)
    {
        //Query here that creates a new row in the User table with the above extracted data.
        // alert("Here!");
        user_email = signup_email;
        window.location.href = "user.html";
    }
    else if(!email_is_unique)
    {
        alert("User with this email already exists.");
    }
    else if(!passwords_match)
    {
        alert("The passwords don't match");
    }
    else
    {
        alert("This should never happen");
    }

}

function user_update(){
    var update_password = document.getElementById("update_password").value;
    var update_confirm_password = document.getElementById("update_confirm_password").value;
    var update_name = document.getElementById("update_name").value;
    var update_address = document.getElementById("update_address").value;
    var update_age = document.getElementById("update_age").value;
    var update_income = document.getElementById("update_income").value;

    // alert("here");

    var passwords_match = true;
    if(update_password != update_confirm_password)
    {
        passwords_match = false;
    }

    if(passwords_match)
    {
        // Update the user information here using the global variable user_email as email and the above as other fields.
        // alert("Here!");
        window.location.href = "user.html";
    }
    else if(!passwords_match)
    {
        alert("The passwords don't match");
    }
    else
    {
        alert("This should never happen");
    }

}

function display_user_info(params) {
    var update_password = "Default";
    var update_confirm_password = "Default";
    var update_name = "Default";
    var update_address = "Default";
    var update_age = "Default";
    var update_income = "Default";

    //Query here that extracts the above info from database using user_email as primary key.
    // Save them in the above vars

    // alert("Here");

    document.getElementById("update_password").value = update_password;
    document.getElementById("update_confirm_password").value= update_confirm_password;
    document.getElementById("update_name").value = update_name;
    document.getElementById("update_address").value = update_address;
    document.getElementById("update_age").value = update_age;
    document.getElementById("update_income").value = update_income;

    // alert("Here");
}

function deposit(params) {
    var account_id = document.getElementById("trans_account_id").value;
    var amount = document.getElementById("trans_amount").value;

    var acc_is_linked = true;
    //Write a query here that checks the account is linked to the user in the has table. if not make this false.

    if(!acc_is_linked)
    {
        alert("this account isn't linked")
    }
    else
    {
        //Write a query here that updates the accounts amount (presumably defaulted to zero at some point)
    }

    // alert("Here");
}

function withdraw(params) {
    var account_id = document.getElementById("trans_account_id").value;
    var amount = document.getElementById("trans_amount").value;

    var acc_is_linked = true;
    //Write a query here that checks the account is linked to the user in the has table. if not make this false.
    var has_enough_money = true;
    //Write a query to check if the account has enough money. if not make this false

    if(!acc_is_linked)
    {
        alert("this account isn't linked")
    }
    else if(!has_enough_money)
    {
        alert("The account doesn't have enough money")
    }
    else
    {
        //Write a query here that updates the accounts amount (presumably defaulted to zero at some point)
    }

    // alert("Here");
}


module.exports = {
    user_login,
    user_signup,
    user_update,
    display_user_info,
    deposit,
    withdraw
}
