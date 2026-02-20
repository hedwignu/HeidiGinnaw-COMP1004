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
    const salt = generateSalt();

    // add salt to the inputted password
    var saltedPassword = salt.concat(password);
    console.log(saltedPassword);

    // hashing the password - my own algorithm
    var hash = 0;

    var binaryPassword = stringToBinary(saltedPassword);
    // adding padding so password fits the block size
    binaryPassword = binaryPassword.concat('1');
    // 32 bits is 4 bytes/characters
    // looping until salted password is a multiple of 4
    while ((binaryPassword.length % 512) != 0){
        binaryPassword = binaryPassword.concat('0');
    }

    // hex values
    var A = '67452301';
    var B = 'efcdab89';
    var C = '98badcfe';
    var E = '10325476';

    // converting the hex values to binary so they can be computed
    A = hexToBin(A);
    B = hexToBin(B);
    C = hexToBin(C);
    D = hexToBin(D);

    var M = [];
    var j = 0;
    // looping round the binary password 32 bits at a time
    for (var i = 0; i < binaryPassword.length; i += 32){
        // splitting the binary password into 32 bit blocks
        M[j] = binaryPassword.slice(i,i+32);
        j++;
    }

    // looping 4 times
    for (var i = 0; i < 4; i++){
        // looping each block of the binary password
        for (var k = 0; k < 16; k++){
            // swapping values
            var A1 = D;
            var C1 = B;
            var D1 = C;

            // checking which block should be used 
            if (i == 0){
                var MD = M[k%16];
            }else if(i == 1){
                var MD = M[(5 * k + 1)%16];
            }else if(i == 2){
                var MD = M[(3 * k + 5)%16];
            }else if(i == 3){
                var MD = M[(7 * k)%16];
            }

            // doing the calculation
            var sum = f(B,C,D,k);

            // adding the calculation to A and the block from the password
            sum += A + MD;

            // assigning the values to their new ones
            B = sum;
            A = A1;
            C = C1;
            D = D1;

        }
    }

    console.log(M);

    hash = A.concat(B,C,D);

    return hash;
};

function f(B,C,D,i){
    if (i >= 0 && i <= 15){
        return (B & C) | ((~B) & D);
    }else{
        return B;
    }
}

function stringToBinary(str){
    var binary = "";
    for (var i = 0; i<str.length; i++){
        const charBin = str[i].charCodeAt().toString(2);

        binary += charBin.padStart(8, '0');
    }
    return binary;
};

function hexToBin(hex){
    const dec = parseInt(hex, 16);
    const bin = dec.toString(2);
    console.log(bin);
}

function generateSalt(){
    var salt = "";
    // generate 16 char long salt
    for (var i = 0; i<16; i++){
        // generating random number
        var asciiCode = Math.floor(Math.random()*(126-33+1)) + 33;
        // retrieving corresponding character
        var randChar = String.fromCharCode(asciiCode);
        // adding current char to salt string
        salt = salt.concat(randChar);
    }
    return salt;
};

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