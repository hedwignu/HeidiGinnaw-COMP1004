

// function for when login button clicked
function validateLogin(){
    document.getElementById('loginButton').addEventListener('click', function(){
        var username = "admin";
        var password = "pwd123";
        // retreiving user inputted data
        var usernameIn = document.getElementById('username');
        var passwordIn = document.getElementById('password');
        if (usernameIn.value == username){
            if(passwordIn.value == password){
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