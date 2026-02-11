// so i can encrypt
/*
let crypto;
try {
    crypto = require('crypto');
} catch (err) {
    console.error('crypto support is disabled!');
}*/

document.addEventListener('DOMContentLoaded', function(){
    var settingsBar = document.getElementById("settingsBar");
    settingsBar.style.display = "none";
})

// function for when login button clicked
function validateLogin(){
    document.getElementById('loginButton').addEventListener('click', function(){
        var username = "admin";
        var password = passwordHash("pwd123");
        // retreiving user inputted data
        var usernameIn = document.getElementById('username');
        var passwordIn = document.getElementById('password');
        if (usernameIn.value == username){
            if(checkPassword(passwordIn)){
                // successful log in
                alert('Logged in!');
                document.getElementById("loginBox").remove();
                var logOut = document.createElement("option");
                logOut.text = "Log Out";
                document.getElementById("settingsButton").appendChild(logOut);
            }else{
                // incorrect password
                alert('Username or Password is incorrect');
            }
        }else{
            // incorrect username
            alert('Username or Password is incorrect');
        }
        
    })
};

function signUpPage(){
        document.addEventListener('DOMContentLoaded', function(){
            document.getElementById('signUpButton').addEventListener('click',function(){
            
        })
    }
)};

// opens drop down for settings
function settingsDropdown(){
    console.log("Settings button was clicked");
    var settingsBar = document.getElementById("settingsBar");
    if (settingsBar.style.display === "none"){
        settingsBar.style.display = "block";
    }else {
        settingsBar.style.display = "none";
    }
}

// change theme
document.getElementById('themeButton').addEventListener('click', function(){
    // main body
    document.body.classList.toggle('darkTheme');
    // login box
    const loginBox = document.getElementById('loginBox');
    loginBox.classList.toggle('darkTheme');
    // settings box
    const settingsBox = document.getElementById('settingsBar');
    settingsBox.classList.toggle('darkTheme');
})

    /*
    document.button.style.backgroundColor = 'green';
    document.button.classList.toggle('darkTheme');
    document.button.clickableText.classList.toggle('darkTheme', true);
    document.nav.classList.toggle('darkTheme',true);
*/
    



// function to hash the password
function passwordHash(password){
    // generate random salt w/ approved random generator
    const salt = crypto.randomBytes(16);

    // hashing the password
    var hash = crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) throw err;
        console.log(derivedKey.toString('hex'));
    });

    return hash;
}

// function to check password
function checkPassword(inputPassword){
    var inputHash = passwordHash(inputPassword);
    if (inputHash === password){
        return true;
    }else{
        return false;
    }
}