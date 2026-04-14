document.addEventListener('DOMContentLoaded', function(){
    // if user isn't logged in then reroute to the log in page
    if (sessionStorage.getItem('currentUser') == null){
        loginPage();
    }
    // logging what page is displayed
    var currSection = localStorage.getItem('pageDisplayed');
    //console.log(currSection);

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
            notePage();
            break;
        default:
            loginPage()
            break;
    }
})

async function openFile(){
    var userId = sessionStorage.getItem('currentUser');
    
    // user selects file
    let [fileHandle] = await window.showOpenFilePicker({
        // only allowing JSON files
        types: [{
                accept: {
                   'application/json': ['.json'],
                },
            }],
    });
    // getting file
    let data = await fileHandle.getFile();
    // retreiving the data and name
    let text = await data.text();
    let name = await data.name;

    name = name.substring(0 , name.lastIndexOf('.'));

    var notesArray = localStorage.getItem(`notes${userId}`);
    notesArray = JSON.parse(notesArray);

    var inArray = false;

    // checking if in array
    for (var i = 0; i < notesArray.length; i++){
        if (name == notesArray[i]){
            inArray = true;
            break;
        }
    }

    var PinnedNotesArr = localStorage.getItem(`pinnedNotes${userId}`);
    PinnedNotesArr = JSON.parse(PinnedNotesArr);

    for (var i = 0; i < PinnedNotesArr.length; i++){
        if (noteTitle == PinnedNotesArr[i]){
            inArray = true;
            break;
        }
    }

    // if not in notes array then adds it
    if (inArray == false){
        notesArray.push(name);
        addNoteToList(name, 'allNotes');
    } else {
        console.log('file has already been uploaded')
        return;
    }
    
    // adding id to end of note title to create unique id
    var nameId = name.concat(userId);

    // adding to local storage
    localStorage.setItem(nameId, text);
    localStorage.setItem(`notes${userId}`,JSON.stringify(notesArray));
    localStorage.setItem(`pinnedNotes${userId}`,JSON.stringify(PinnedNotesArr));


    console.log(text);
    console.log(name);
}


async function saveFile(name, data){
    // suggesting name so is saved the same in local and computer storage
    let fileHandle = await window.showSaveFilePicker({
        suggestedName: name,
        types: [{
            accept: {
               'application/json': ['.json'],
            },
        }],
    })

    // writing to the new file and saving
    const writable = await fileHandle.createWritable();
    await writable.write(data);
    await writable.close();
    console.log('hello');
}



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
                document.getElementById("loginBox").reset();
                // get users id
                const userId = userInfo[2];
                // set logged in user in local storage
                sessionStorage.setItem('currentUser', userId);

                // call the home page
                homePage();
            }else{
                // incorrect password
                var dialogue = document.getElementById('invalidLoginAlert');
                dialogue.showModal()
                alert('Username or Password is incorrect');
                document.getElementById("loginBox").reset();
            }
        }else{
            // incorrect username
            var dialogue = document.getElementById('invalidLoginAlert');
            dialogue.showModal()
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
    document.getElementById('logOutButton').style.display = 'none';
    document.getElementById('logOutButton1').style.display = 'none';
    
}

// logs user out
function logOut(){
    localStorage.setItem('currentNote', '');
    sessionStorage.removeItem('currentUser');
    loginPage();
}

// brings up home page
function homePage(){
    localStorage.setItem('pageDisplayed', 'homePage');
    
    // retreiving user id
    var userId = sessionStorage.getItem('currentUser');

    // clearing note html elements
    clearLists();

    // adding all notes from storage as html elements
    var notesArray = localStorage.getItem(`notes${userId}`);
    notesArray = JSON.parse(notesArray);
    
    if (localStorage.getItem(`notes${userId}`) == null){
        localStorage.setItem(`notes${userId}`, JSON.stringify([]));
    }else {
        for (i = 0; i < notesArray.length; i++){
            var noteTitle = notesArray[i];
            addNoteToList(noteTitle, 'allNotes');
        }
    }

    var PinnedNotesArr = localStorage.getItem(`pinnedNotes${userId}`);
    PinnedNotesArr = JSON.parse(PinnedNotesArr);
    
    // checking there is a pinned notes array in local storage
    if (localStorage.getItem(`pinnedNotes${userId}`) == null){
        localStorage.setItem(`pinnedNotes${userId}`, JSON.stringify([]));
    }else {
        for (i = 0; i < PinnedNotesArr.length; i++){
            var noteTitle = PinnedNotesArr[i];
            addNoteToList(noteTitle, 'pinnedNotes');
        }
    }

    // enabling new note button
    document.getElementById("newNoteButton").disabled = false;
    document.getElementById("newNoteButton1").disabled = false;
    
    const sections = document.querySelectorAll('section');

    sections.forEach(item => {
        item.style.display = 'none';
    });

    document.getElementById('allPages').style.display = '';
    document.getElementById('homeSection').style.display = '';

    if (localStorage.getItem('language') == 'English'){
        document.getElementById('logOutButton').style.display = '';
    }else{
        document.getElementById('logOutButton1').style.display = '';
    }

}

//function to create account
function createAccount(){
        // taking user inputs
        var usernameIn = document.getElementById('username1').value;
        var passwordIn = document.getElementById('password1').value;

        // check if username already exists
        if (localStorage.getItem(usernameIn) != null){
            // tells user username exists
            var dialogue = document.getElementById('copiedUsernameAlert');
            dialogue.showModal()
            return;
        }

        // creating salt for this user
        var salt = generateSalt();

        // hashing password for user
        var password = passwordHash(passwordIn, salt);

        // generate unique user id
        var userId = crypto.randomUUID();
        console.log(userId);

        // storing in local storage
        localStorage.setItem(usernameIn, JSON.stringify([password, salt, userId]));
        
        // creating note array in local storage
        localStorage.setItem(`notes${userId}`, JSON.stringify(['Welcome To Lockd']))

        // tells user account was created
        var dialogue = document.getElementById('accountCreatedAlert');
        dialogue.showModal()
}

function loginPage(){
    localStorage.setItem('pageDisplayed','log in');
    

    const sections = document.querySelectorAll('section');
    

    sections.forEach(item => {
        item.style.display = 'none';
    });

    document.getElementById('allPages').style.display = '';
    document.getElementById('logInSection').style.display = '';
    document.getElementById('logOutButton').style.display = 'none';
    document.getElementById('logOutButton1').style.display = 'none';
}

function notePage(){
    // letting browser know note page is open
    localStorage.setItem('pageDisplayed','note');

    const sections = document.querySelectorAll('section');

    sections.forEach(item => {
        item.style.display = 'none';
    });

    document.getElementById('allPages').style.display = '';
    document.getElementById('prevNoteSection').style.display = '';
    document.getElementById('noteSection').style.display = '';

    if (localStorage.getItem('language') == 'English'){
        document.getElementById('clearButton').style.display = '';
    }else{
        document.getElementById('clearButton1').style.display = '';
    }
}

function previewPage(){
    // letting browser know note page is open
    localStorage.setItem('pageDisplayed','preview');

    const sections = document.querySelectorAll('section');

    sections.forEach(item => {
        item.style.display = 'none';
    });

    document.getElementById('allPages').style.display = '';
    document.getElementById('prevNoteSection').style.display = '';
    document.getElementById('previewSection').style.display = '';

    document.getElementById('clearButton').style.display = 'none';
    document.getElementById('clearButton1').style.display = 'none';
}

function previewClicked(selectedTitle){
    // retreiving open note from local storage
    var currentNote = localStorage.getItem('currentNote');
    
    // if open note doesn't exist set it
    if (currentNote ==  null || currentNote == '' || currentNote == 'undefined'){
        localStorage.setItem('currentNote', selectedTitle);
        currentNote = selectedTitle;
    }

    var currentNoteId = currentNote.replaceAll(" ", "");

    try{
        // retrieving note title
        var noteTitle = document.getElementById(currentNoteId).innerHTML;
    }catch (error){
        var dialogue = document.getElementById('errorAlert');
        dialogue.showModal();
        // clearing local storage
        localStorage.removeItem('currentNote');
        return;
    }

    var title = noteTitle;

    // append users id
    noteTitle = noteTitle.concat(sessionStorage.getItem('currentUser'));

    // retreived stored data based on selected note title
    var storedData = localStorage.getItem(noteTitle);

    try{
        storedData = JSON.parse(storedData);
    }catch (error){
        var dialogue = document.getElementById('errorAlert');
        dialogue.showModal()
        // clearing local storage
        localStorage.removeItem('currentNote');
        return;
    }
    
    previewPage();

    // checking data is stored
    if (storedData != null){
        // add stored data into displayed note
        var preview = storedData[0];
        var note = storedData[1];
        var key = storedData[2];

        preview = encryptDecrypt(preview, key);
        
        document.getElementById('previewData').value = preview;
    }

    // add stored data into displayed title
    document.getElementById('noteTitle').value = title;
}

function noteClicked(){
    // retreiving open note from local storage
    var currentNote = localStorage.getItem('currentNote');

    var currentNoteId = currentNote.replaceAll(" ", "");
        
    // retrieving note title
    var noteTitle = document.getElementById(currentNoteId).innerHTML;

    // loading the 'page'
    notePage();

    // append users id
    noteTitle = noteTitle.concat(sessionStorage.getItem('currentUser'));

    // retreived stored data based on selected note title
    var storedData = localStorage.getItem(noteTitle);
    storedData = JSON.parse(storedData);

    // checking data is stored
    if (storedData != null){
        // add stored data into displayed note
        var note = storedData[1];
        var key = storedData[2];

        note = encryptDecrypt(note, key);

        document.getElementById('noteData').value = note;
    }

    document.getElementById('previewData').value = '';
}

// brings up thing to write a new note in
function createNote(){
    console.log('opening note window');
    notePage();

    localStorage.setItem('currentNote', 'Untitled');

}

function shutNote(){
    var dialogue = document.getElementById('unsavedAlert');
    dialogue.showModal()
}

function checkValidSave(){
    var noteTitle = document.getElementById('noteTitle').value;
    console.log('I hate you')
    console.log(noteTitle);

    if (noteTitle == ""){
        var dialogue = document.getElementById('noTitleAlert');
        dialogue.showModal()
        return;
    // checking if note is already in local storage
    }else if (localStorage.getItem(noteTitle) == true && localStorage.getItem('currentNote') != noteTitle){
        var dialogue = document.getElementById('duplicateTitleAlert');
        dialogue.showModal();
        return;
    }else {
        saveNote();
    }
}

function saveNote(){
    var originalTitle = localStorage.getItem('currentNote');

    var noteTitle = document.getElementById('noteTitle').value;
    localStorage.setItem('currentNote', noteTitle);

    // retrieving current user's id
    const userId = sessionStorage.getItem('currentUser')
    // adding id to end of note title to create unique id
    var noteTitleId = noteTitle.concat(userId);

    // retreive inputted data
    var noteData = document.getElementById('noteData').value;

    // split the data into a preview
    var preview = noteData.slice(0, 42);
    preview = preview.concat('...');

    // encrypt note data
    var key = generateSalt();
    noteData = encryptDecrypt(noteData, key);

    // encrypt preview
    preview = encryptDecrypt(preview, key);

    console.log(preview);
    console.log(noteData);
    console.log(noteTitleId);

    // saving file in local storage
    localStorage.setItem(noteTitleId, JSON.stringify([preview, noteData, key]));

    // saving file to computer
    saveFile(noteTitle, JSON.stringify([preview, noteData, key]));

    homePage();

    // setting note name on home page
    
    // retrieving note title
    var currentNote = localStorage.getItem('currentNote');
    currentNote = currentNote.replaceAll(" ", "");
    // checking if note already on home page
    /*
    try {
        document.getElementById(currentNote).innerHTML = originalTitle;
    } catch (error) {
        addNoteToList(noteTitle);
    }*/

    var notesArray = localStorage.getItem(`notes${userId}`);
    notesArray = JSON.parse(notesArray);

    var inArray = false;

    // checking if in array
    for (var i = 0; i < notesArray.length; i++){
        if (noteTitle == notesArray[i]){
            inArray = true;
            break;
        }else if (originalTitle == notesArray[i]){
            notesArray[i] = noteTitle;
            changeNoteTitle(originalTitle, noteTitle, `notes${userId}`);
            inArray = true;
            break;
        }
    }

    var PinnedNotesArr = localStorage.getItem(`pinnedNotes${userId}`);
    PinnedNotesArr = JSON.parse(PinnedNotesArr);

    for (var i = 0; i < PinnedNotesArr.length; i++){
        if (noteTitle == PinnedNotesArr[i]){
            inArray = true;
            break;
        }else if (originalTitle == PinnedNotesArr[i]){
            PinnedNotesArr[i] = noteTitle;
            changeNoteTitle(originalTitle, noteTitle, 'pinned');
            inArray = true;
            break;
        }
    }

    // if not in notes array then adds it
    if (inArray == false){
        notesArray.push(noteTitle);
        addNoteToList(noteTitle, 'allNotes');
    }

    localStorage.setItem(`notes${userId}`,JSON.stringify(notesArray));
    localStorage.setItem(`pinnedNotes${userId}`,JSON.stringify(PinnedNotesArr));

    // clearing local storage
    localStorage.removeItem('currentNote');

    document.getElementById('noteTitle').value = '';
    document.getElementById('noteData').value = '';
}

function addNoteToList(title, list){
    // retrieving unordered list element
    var ol = document.getElementById(list);
    // creating a new list element
    var li = document.createElement("li");
    // making it display the given title
    li.textContent = title;
    li.setAttribute("onclick", `previewClicked(${JSON.stringify(title)})`);
    // remove spaces from title
    title = title.replaceAll(" ", "");
    li.setAttribute("id", title);
    li.classList.add("notes");
    li.classList.add("clickableText");
    ol.appendChild(li);
}

function clearLists(){

    // retrieving unordered list element
    var ol = document.getElementById('pinnedNotes').childNodes;

    console.log(ol.length);

    while (ol.length > 0){
        console.log('hi');
        var li = ol[0];
        li.parentNode.removeChild(li);
    }

    ol = document.getElementById('allNotes').childNodes;

    while (ol.length > 0){
        var li = ol[0];
        li.parentNode.removeChild(li);
    }

}

function changeNoteTitle(originalTitle, newTitle, list){
    var originalTitleId = originalTitle.replaceAll(" ", "");
    var li = document.getElementById(originalTitleId);
    
    var userId = sessionStorage.getItem('currentUser');

    if (list == `notes${userId}`){
        addNoteToList(newTitle, 'allNotes');
    }else{
        addNoteToList(newTitle, 'pinnedNotes');
    }
    
    li.remove();

    // removing old note from local storage
    originalTitle = originalTitle.concat(userId);
    localStorage.removeItem(originalTitle);

    // removing old note from local storage
    originalTitle = originalTitle.concat(sessionStorage.getItem('currentUser'));
    localStorage.removeItem(originalTitle);

}

function changePinStatus(){
    var title = localStorage.getItem('currentNote');
    var userId = sessionStorage.getItem('currentUser');

    var notesArray = localStorage.getItem(`notes${userId}`);
    notesArray = JSON.parse(notesArray);

    var PinnedNotesArr = localStorage.getItem(`pinnedNotes${userId}`);
    PinnedNotesArr = JSON.parse(PinnedNotesArr);

    var pinned = true;

    for (var i = 0; i < notesArray.length; i++){
        if (notesArray[i] == title){
            pinned = false;
            break;
        }
    }

    // remove note from other list
    var titleId = title.replaceAll(" ", "");
    var li = document.getElementById(titleId);
    li.remove();
    
    if (pinned == false){
        // pins the note to the top of the list
        addNoteToList(title, 'pinnedNotes');
        // removes from notes array
        var index = notesArray.indexOf(title);
        notesArray.splice(index, 1);
        localStorage.setItem(`notes${userId}`, JSON.stringify(notesArray));
        // add to pinned array
        PinnedNotesArr.push(title);
        localStorage.setItem(`pinnedNotes${userId}`, JSON.stringify(PinnedNotesArr));
    }else {
        // adds note to unpinned list
        addNoteToList(title, 'allNotes');
        // removes from pinned array
        var index = PinnedNotesArr.indexOf(title);
        PinnedNotesArr.splice(index, 1);
        localStorage.setItem(`pinnedNotes${userId}`, JSON.stringify(PinnedNotesArr));
        // add to unpinned array
        notesArray.push(title);
        localStorage.setItem(`notes${userId}`, JSON.stringify(notesArray));
    }
}

function clearNote(){
    // resetting the note form
    document.getElementById('noteForm').reset();
}

// brings up dialog to confirm if user wants to delete
function checkValidDelete(){
    var dialogue = document.getElementById('deleteAlert');
    dialogue.showModal();
    return;
}

function confirmDelete(){
    closeDialog('deleteAlert');
    deleteNote();
    return;
}

function confirmExit(){
    closeDialog('unsavedAlert');

    // clearing local storage for current note value
    localStorage.setItem('currentNote', '');
    // clearing notes input boxes
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteData').value = '';

    // returning to the home page
    homePage();
    return;
}

function deleteNote(){
    // deletes note from storage 
    // getting title of note to be deleted
    var title = document.getElementById('noteTitle').value;
    // getting current users id
    var userId = sessionStorage.getItem('currentUser');
    // adding id to end of note title to create unique id
    var noteTitleId = title.concat(userId);

    // removing item from local storage
    localStorage.removeItem(noteTitleId);

    //removing item from array
    var PinnedNotesArr = localStorage.getItem(`pinnedNotes${userId}`);
    PinnedNotesArr = JSON.parse(PinnedNotesArr);

    var notesArray = localStorage.getItem(`notes${userId}`);
    notesArray = JSON.parse(notesArray);

    var pinned = true;

    for (var i = 0; i < notesArray.length; i++){
        if (notesArray[i] == title){
            // removes from notes array
            var index = notesArray.indexOf(title);
            notesArray.splice(index, 1);
            localStorage.setItem(`notes${userId}`, JSON.stringify(notesArray));
            break;
        }
    }

    for (var i = 0; i < PinnedNotesArr.length; i++){
        if(PinnedNotesArr[i] == title){
            // removes from pinned array
            var index = PinnedNotesArr.indexOf(title);
            PinnedNotesArr.splice(index, 1);
            localStorage.setItem(`pinnedNotes${userId}`, JSON.stringify(PinnedNotesArr));
        }
    }

    // remove note from list
    var titleId = title.replaceAll(" ", "");
    var li = document.getElementById(titleId);
    li.remove();


    // clearing local storage for current note value
    localStorage.setItem('currentNote', '');

    // clearing the form
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteData').value = '';

    homePage();
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
}

//document.getElementById('noteFontSize').addEventListener('change', () => {
function setFontSize(){
    // retreiving textarea element
    var textArea = document.getElementById('noteData');
    textArea.getSelection();

    const selStart = textArea.selectionStart;
    const selEnd = textArea.selectionEnd;
    const text = textArea.innerHTML;
    // retreiving user selected data from textarea
    var selectedText = (textArea.innerHTML).substring(selStart,selEnd);
    console.log(selectedText);
    //console.log(selectedText);
    var selection = document.getSelection();
    console.log(selection)
    // retrieving user inputted new font size
    var newFontSize = document.getElementById('noteFontSize').value;
    newFontSize = newFontSize.concat("px");
    console.log(newFontSize);
    // creating new element to change font
    var newText = document.createElement('span');
    // adding font size to new element
    newText.style.fontSize = newFontSize ;

    //newText.innerHTML = selectedText.toString();
    var newText = '<span style="font-size:' + newFontSize + '">' + selectedText + '</span>';
    console.log(newText);

    textArea.innerHTML = text.substring(0, selStart) + newText + text.substring(selEnd);
    
    //console.log(selection.toString());
    
    // creating new node with selected text in it
    //const node = document.createTextNode(selectedText);
    // adding text to new span element
    //newText.appendChild(node);
    // adding new element to textarea
    //textArea.appendChild(newText);
    

    //var range = selection.getRangeAt(0);
    //range.deleteContents();
    //range.insertNode(node);
    //console.log('ughhhh')
    //selectedText.deleteFromDocument();
   

}

function changeText(tag){
    var textArea = document.getElementById('noteData');

    const selStart = textArea.selectionStart;
    const selEnd = textArea.selectionEnd;
    const text = textArea.value;

    var selectedText = text.substring(selStart,selEnd);

    // creating new text to input with tags to change the display
    selectedText = tag + selectedText + tag;   

    console.log(text.substring(0, selStart));
    textArea.value = text.substring(0, selStart) + selectedText + text.substring(selEnd);

    textArea.focus();
}

// closes chosen dialogue box
function closeDialog(dialogId){
    const dialogue = document.getElementById(dialogId);
    dialogue.close();
    return;
}

// --------------- security functions ----------------



// does bitwise calculation depending on what iteration it is
function f(B,C,D,i){
    if (i >= 0 && i <= 15){
        return (B & C) | ((~B) & D);
    }else{
        return B;
    }

    /*
    }else if (i >= 16 && i <= 31){
        return (B & D) | (C & (~D));
    }else if (i >= 32 && i >= 47){
        return (B ^ C ^ D);
    }else {
        return C ^ (B | (~D));
    }*/
}

function stringToBinary(str){
    //console.log(str);
    var binary = "";
    // loopiing through each character at a time
    for (var i = 0; i<str.length; i++){
        // converting the character to it's decimal code, then to binary
        const charBin = str[i].charCodeAt().toString(2);

        // padding the binary so they're always 8 bits long
        binary += charBin.padStart(8, '0');
    }
    return binary;
};

function binaryToString(bin){
    var string = "";
    for (var i = 0; i<bin.length; i += 8){
        // retreiving a byte of data from the binary
        const binSlice = bin.substring(i, i + 8);
        // converting the slice to decimal 
        const charCode = binToDec(binSlice);
       // console.log(charCode);
       //converting the decimal character code to it's character
        let char = String.fromCharCode(charCode);

        // adding the converted character to the string
        string += char;
    }

    return string;
}

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

function encryptDecrypt(str, key){
    // turn data into binary so bitwise operations can be done
    str = stringToBinary(str);
    key = stringToBinary(key);

    var encryptedStr = "";

    for (var i = 0; i < str.length; i++){
        // xor 1 bit from string and 1 bit from key
        var newchar = str[i] ^ key[i % key.length];
        // adding new bit to the encrypted string
        encryptedStr = encryptedStr.concat(newchar);
    }

    // converting encrypted/decrypted string to characters again
    encryptedStr = binaryToString(encryptedStr);

    //console.log(encryptedStr);

    return encryptedStr;
}

// function to check password
function checkPassword(inputPassword, password, salt){
    var inputHash = passwordHash(inputPassword, salt);
    if (inputHash === password){
        return true;
    }else{
        return false;
    }
}