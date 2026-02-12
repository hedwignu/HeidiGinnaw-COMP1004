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
    if (localStorage.getItem('theme') === 'dark'){
        themeButton();
    }
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
    var settingsBar = document.getElementById("settingsBar");
    if (settingsBar.style.display === "none"){
        settingsBar.style.display = "block";
    }else {
        settingsBar.style.display = "none";
    }
}

// change theme 
function themeButton(){
    // main body
    document.body.classList.toggle('darkTheme');
    // login box
    const loginBox = document.getElementById('loginBox');
    loginBox.classList.toggle('darkTheme');
    // settings box
    const settingsBox = document.getElementById('settingsBar');
    settingsBox.classList.toggle('darkTheme');

    // normal buttons
    var buttons = document.getElementsByClassName('button')
    // looping round all buttons
    for (var i = 0; i < buttons.length; i++){
        buttons[i].classList.toggle('darkTheme');
    }

    //clickable text buttons
    var clickableButtons = document.getElementsByClassName('clickableText')
    // looping round all clickable buttons
    for (var i = 0; i < clickableButtons.length; i++){
        clickableButtons[i].classList.toggle('darkTheme');
    }

    // disabled buttons
    var disabledButtons = document.querySelectorAll('button:disabled');
    // looping round all disabled buttons
    for (var i = 0; i < disabledButtons.length; i++){
        disabledButtons[i].classList.toggle('darkTheme');
    }

    // nav bar
    var nav1 = document.getElementsByTagName('nav');
    nav1[0].classList.toggle('darkTheme');

    // setting preference in local storage
    if (document.body.classList.contains('darkTheme')){
        localStorage.setItem('theme','dark');
        document.querySelector('#themeButton').innerHTML = 'Change to Light';
    }else{
        localStorage.setItem('theme', 'light');
        document.querySelector('#themeButton').innerHTML = 'Change to Dark';
    }
}

// change font size
function changeFontSize(){
    document.body.style.fontSize = "10px";
}

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