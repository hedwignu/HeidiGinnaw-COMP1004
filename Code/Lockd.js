document.addEventListener('DOMContentLoaded', function(){
    // making sure settings drop down is not visible
    var settingsBar = document.getElementById("settingsBar");
    settingsBar.style.display = "none";

    // setting theme based on local storage
    if (localStorage.getItem('theme') === 'dark'){
        themeButton();
    }

    // setting language based on local storage
    if (localStorage.getItem('language') === 'Svenska'){
        var textElements = document.querySelectorAll('[lang="en"]');
        for (var i = 0; i < textElements.length; i++){
            textElements[i].style.display = "none";
        }
    }else{
        var textElements = document.querySelectorAll('[lang="sv"]');
        for (var i = 0; i < textElements.length; i++){
            textElements[i].style.display = "none";
        }
    }

    // setting font based on local storage
    if (localStorage.getItem('fontSize') === 'Large'){
        increaseFontSize();
    }
    if (localStorage.getItem('fontSize') === 'Small'){
        decreaseFontSize();
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
            if(checkPassword(passwordIn, password)){
                // successful log in
                alert('Logged in!');
                document.getElementById("loginBox").remove();
                /*
                var logOut = document.createElement("option");
                logOut.text = "Log Out";
                document.getElementById("settingsButton").appendChild(logOut);
                */
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

    if (document.body.classList.contains('darkTheme')){
        localStorage.setItem('theme','dark');
        document.querySelector('#themeButton').innerHTML = 'Change to Light';
        document.querySelector('#themeButton1').innerHTML = 'Byt till Ljus';
    }else{
        localStorage.setItem('theme', 'light');
        document.querySelector('#themeButton').innerHTML = 'Change to Dark';
        document.querySelector('#themeButton1').innerHTML = 'Byt till Mörkt';
    }
}

// increase font size
function increaseFontSize(){
    if (document.querySelector('#fontSize').innerHTML == 'Small' ||document.querySelector('#fontSize1').innerHTML == 'Små'){
        localStorage.setItem('fontSize','Medium');
        document.body.style.fontSize = "18px";

        // h1
        var h1 = document.getElementsByTagName('h1');
        h1[0].style.fontSize = "50px";

        // inputs
        var input = document.getElementsByClassName('input')
        // looping round all inputs
        for (var i = 0; i < input.length; i++){
            input[i].style.fontSize = "15px";
        }

        // small button
        var smallButton = document.getElementsByClassName('smallButton');
        // looping round all small buttons
        for (var i = 0; i < smallButton.length; i++){
            smallButton[i].style.fontSize = "8px";
        }

        // sign up button
        var signUpButton = document.getElementById('signUpButton');
        signUpButton.style.fontSize = "12px";
        
        // small text
        var smallText = document.getElementsByClassName('smallText');
        // looping round all small text
        for (var i = 0; i < smallText.length; i++){
            smallText[i].style.fontSize = "8px";
        }
        
        // change display text
        document.querySelector('#fontSize').innerHTML = 'Medium';
        document.querySelector('#fontSize1').innerHTML = 'Medium';
    }else if (document.querySelector('#fontSize').innerHTML == 'Medium'){
        localStorage.setItem('fontSize','Large');
        // main body
        document.body.style.fontSize = "24px";

        // h1
        var h1 = document.getElementsByTagName('h1');
        h1[0].style.fontSize = "60px";

        // inputs
        var input = document.getElementsByClassName('input')
        // looping round all inputs
        for (var i = 0; i < input.length; i++){
            input[i].style.fontSize = "20px";
        }

        // small button
        var smallButton = document.getElementsByClassName('smallButton');
        // looping round all small buttons
        for (var i = 0; i < smallButton.length; i++){
            smallButton[i].style.fontSize = "12px";
        }

        // sign up button
        var signUpButton = document.getElementById('signUpButton');
        signUpButton.style.fontSize = "16px";
        
        // small text
        var smallText = document.getElementsByClassName('smallText');
        // looping round all small text
        for (var i = 0; i < smallText.length; i++){
            smallText[i].style.fontSize = "12px";
        }
        
        // change display text
            document.querySelector('#fontSize1').innerHTML = 'Stor';
            document.querySelector('#fontSize').innerHTML = 'Large';
    }
}

// decrease font size
function decreaseFontSize(){
    if (document.querySelector('#fontSize').innerHTML == 'Medium'){
        localStorage.setItem('fontSize','Small');
        document.body.style.fontSize = "12px";

        // h1
        var h1 = document.getElementsByTagName('h1');
        h1[0].style.fontSize = "40px";

        // inputs
        var input = document.getElementsByClassName('input')
        // looping round all inputs
        for (var i = 0; i < input.length; i++){
            input[i].style.fontSize = "11px";
        }

        // small button
        var smallButton = document.getElementsByClassName('smallButton');
        // looping round all small buttons
        for (var i = 0; i < smallButton.length; i++){
            smallButton[i].style.fontSize = "6px";
        }

        // sign up button
        var signUpButton = document.getElementById('signUpButton');
        signUpButton.style.fontSize = "8px";
        
        // small text
        var smallText = document.getElementsByClassName('smallText');
        // looping round all small text
        for (var i = 0; i < smallText.length; i++){
            smallText[i].style.fontSize = "6px";
        }
        /*
        // change display text
        document.querySelector('#fontSize').innerHTML = 'Small';
*/
        // change display text
        document.querySelector('#fontSize1').innerHTML = 'Små';
        document.querySelector('#fontSize').innerHTML = 'Small';
    }else if (document.querySelector('#fontSize').innerHTML == 'Large' || document.querySelector('#fontSize1').innerHTML == 'Stor'){
        localStorage.setItem('fontSize','Medium');
        document.body.style.fontSize = "18px";

        // h1
        var h1 = document.getElementsByTagName('h1');
        h1[0].style.fontSize = "50px";

        // inputs
        var input = document.getElementsByClassName('input')
        // looping round all inputs
        for (var i = 0; i < input.length; i++){
            input[i].style.fontSize = "15px";
        }

        // small button
        var smallButton = document.getElementsByClassName('smallButton');
        // looping round all small buttons
        for (var i = 0; i < smallButton.length; i++){
            smallButton[i].style.fontSize = "8px";
        }

        // sign up button
        var signUpButton = document.getElementById('signUpButton');
        signUpButton.style.fontSize = "12px";
        
        // small text
        var smallText = document.getElementsByClassName('smallText');
        // looping round all small text
        for (var i = 0; i < smallText.length; i++){
            smallText[i].style.fontSize = "8px";
        }
        
        // change display text
        document.querySelector('#fontSize').innerHTML = 'Medium';
        document.querySelector('#fontSize1').innerHTML = 'Medium';
    }
}

// change apps language
function changeLanguage(){
    // translate page to english
    console.log("hii");
    if (localStorage.getItem('language') == 'Svenska'){
        console.log("hi");
        // collect all text elements that are in swedish
        var textElements = document.querySelectorAll('[lang="sv"]');
        // iterate and hide swedish text
        for (var i = 0; i < textElements.length; i++){
            textElements[i].style.display = "none";
        }
        // collect all text elements that are in english
        var newTextElements = document.querySelectorAll('[lang="en"]');
        // iterate and display english text
        for (var i = 0; i < newTextElements.length; i++){
            newTextElements[i].style.display = "";
        }

        localStorage.setItem('language','English');
    }else{ // translate page to swedish
        console.log("hiii");
        var textElements = document.querySelectorAll('[lang="en"]');
        for (var i = 0; i < textElements.length; i++){
            textElements[i].style.display = "none";
        }
        var newTextElements = document.querySelectorAll('[lang="sv"]');
        for (var i = 0; i < newTextElements.length; i++){
            newTextElements[i].style.display = "";
        }

        localStorage.setItem('language','Svenska');
    }
}

// function to hash the password
function passwordHash(password){
    // generate random salt w/ approved random generator
    const salt = 10;

    // hashing the password - my own algorithm
    var hash = 15;

    return hash;
}

// function to check password
function checkPassword(inputPassword, password){
    var inputHash = passwordHash(inputPassword);
    console.log(password)
    if (inputHash === password){
        return true;
    }else{
        return false;
    }
}