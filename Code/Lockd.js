document.addEventListener('DOMContentLoaded', function(){
    var currSection = localStorage.getItem('pageDisplayed');
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
        console.log(document.querySelectorAll('[lang="en"]'));
        console.log(document.querySelectorAll('#logInSection'));
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

    switch(currSection){
        case 'signUpSection':
            signUpPage();
            break;
        case 'homePage':
            homePage();
            break;
        case 'log in':
            loginPage();
            break;
        case 'note':
            noteClicked();
            break;
        default:
            loginPage()
            break;
    }
})

// function for when login button clicked
function validateLogin(){
        // retreiving user inputted data
        var usernameIn = document.getElementById('username').value;
        var passwordIn = document.getElementById('password').value;
        // checking username exists
        if (localStorage.getItem(usernameIn) != null){
            // retrieving users stored data
            var userInfo = localStorage.getItem(usernameIn);
            userInfo = JSON.parse(userInfo);
            var password = userInfo[0];
            var salt = userInfo[1];
            if(checkPassword(passwordIn, password, salt)){
                // successful log in
                alert('Logged in!');
                document.getElementById("loginBox").reset();
                // call the home page
                homePage();
            }else{
                // incorrect password
                //console.log('incorrect password');
                alert('Username or Password is incorrect');
                document.getElementById("loginBox").reset();
            }
        }else{
            // incorrect username
            alert('Username or Password is incorrect');
            document.getElementById("loginBox").reset();
        }
        
    
};

function signUpPage(){
    localStorage.setItem('pageDisplayed', 'signUpSection');

    const sections = document.querySelectorAll('section');
    

    sections.forEach(item => {
        item.style.display = 'none';
    });

    document.getElementById('allPages').style.display = '';
    document.getElementById('signUpSection').style.display = '';
    
}

// brings up home page
function homePage(){
    localStorage.setItem('pageDisplayed', 'homePage');

    // enabling new note button
    document.getElementById("newNoteButton").disabled = false;
    document.getElementById("newNoteButton1").disabled = false;
    
    const sections = document.querySelectorAll('section');
    

    sections.forEach(item => {
        item.style.display = 'none';
    });

    document.getElementById('allPages').style.display = '';
    document.getElementById('homeSection').style.display = '';

}

//function to create account
function createAccount(){
        // taking user inputs
        var usernameIn = document.getElementById('username1').value;
        var passwordIn = document.getElementById('password1').value;

        // check if username already exists
        if (localStorage.getItem(usernameIn) != null){
            alert('username already exists');
            return;
        }

        // creating salt for this user
        var salt = generateSalt();

        // hashing password for user
        var password = passwordHash(passwordIn, salt);

        // storing in local storage
        localStorage.setItem(usernameIn, JSON.stringify([password, salt]));

        alert('account created');
}

function loginPage(){
    localStorage.setItem('pageDisplayed','log in');
    

    const sections = document.querySelectorAll('section');
    

    sections.forEach(item => {
        item.style.display = 'none';
    });

    document.getElementById('allPages').style.display = '';
    document.getElementById('logInSection').style.display = '';
}

function noteClicked(){
    console.log("hello");
    localStorage.setItem('pageDisplayed','note');
    

    const sections = document.querySelectorAll('section');
    

    sections.forEach(item => {
        item.style.display = 'none';
    });

    document.getElementById('allPages').style.display = '';
    document.getElementById('noteSection').style.display = '';
}

// brings up thing to write a new note in
function createNote(){
    console.log('opening note window');
}

function shutNote(){
    if (confirm("Exit without saving?")) {
        // dont save file
        homePage();
        return;
    } else {
        // exit function as user selected cancel
        return;
    }
}

function addNoteToList(){
    var ul = document.getElementById("allNotes");
    var li = document.createElement("li");
    li.textContent = "test filetest";
    li.setAttribute("id", "test");
    li.setAttribute("onclick", "noteClicked()");
    li.classList.add("notes");
    li.classList.add("clickableText");
    ul.appendChild(li);
}

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
        //var signUpButton = document.getElementById('signUpButton');
        //signUpButton.style.fontSize = "12px";
        
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
        //var signUpButton = document.getElementById('signUpButton');
        //signUpButton.style.fontSize = "16px";
        
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
       // var signUpButton = document.getElementById('signUpButton');
        //signUpButton.style.fontSize = "8px";
        
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
        //var signUpButton = document.getElementById('signUpButton');
        //signUpButton.style.fontSize = "12px";
        
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
    var currSection = localStorage.getItem('pageDisplayed');
    // translate page to english
    if (localStorage.getItem('language') == 'Svenska'){
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
/*
    switch (pageDisplayed){
        case 'log in':
            loginPage();
            break;
        case 'sign up':
            signUpPage();
            break;
        default:
            //errorPage();
            alert("an error has occured");
            break;
    }
    */
}

document.getElementById('noteFontSize').addEventListener('change', () => {
    var textArea = document.getElementById('noteData');
    var selectedText = (textArea.value).substring(textArea.selectionStart, textArea.selectionEnd);
    console.log(selectedText);
    
    var newFontSize = document.getElementById('noteFontSize').value;
    console.log(newFontSize);

    var newText = document.createElement('span');
    newText.style = 'font-size:' + newFontSize + ';';
    const node = document.createTextNode(selectedText);
    newText.appendChild(node);

    textArea.appendChild(newText);

    console.log('ughhhh')
    //selectedText.deleteFromDocument();


})

// --------------- security functions ----------------

// function to hash the password
function passwordHash(password,salt){
    // generate random salt w/ approved random generator
    //const salt = generateSalt();

    // add salt to the inputted password
    var saltedPassword = salt.concat(password);

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
    var D = '10325476';

    // converting the hex values to decimal so they can be computed
    A = hexToDec(A);
    B = hexToDec(B);
    C = hexToDec(C);
    D = hexToDec(D);

    var M = [];
    var j = 0;
    // looping round the binary password 4 characters at a time
    for (var i = 0; i < binaryPassword.length; i += 32){
        // splitting the binary password into 32 bit blocks
        binSlice = binaryPassword.slice(i,i+32);

        //converting binary slices to decimal
        decSlice = binToDec(binSlice);

        M[j] = binToDec(binSlice);
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
            var sum = Math.abs(f(B,C,D,k));
            

            // adding the calculation to A and the block from the password
            sum += A + MD;

            // assigning the values to their new ones
            B = sum;
            A = A1;
            C = C1;
            D = D1;

        }
    }

    
    A = A.toString(16);
    B = B.toString(16);
    C = C.toString(16);
    D = D.toString(16);

    hash = A.concat(B,C,D);

    return hash;
};

// does bitwise calculation depending on what iteration it is
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

function hexToDec(hex){
    var dec = parseInt(hex, 16);
    // converting to a string
    /*
    dec = dec.toFixed()
    const bin = stringToBinary(dec);
    return bin;
    */
   return dec;
}

function decToHex(dec){
    var hex = dec.toString(16);
    return hex;
}

function binToDec(binary){
    binary = binary;
    var dec = parseInt(binary, 2);

    return dec;
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
function checkPassword(inputPassword, password, salt){
    var inputHash = passwordHash(inputPassword, salt);
    if (inputHash === password){
        return true;
    }else{
        return false;
    }
}