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

function generateKey(){
    var key = "";
    // generate 16 char long key
    for (var i = 0; i<16; i++){
        // generating random number
        var asciiCode = Math.floor(Math.random()*(126-33+1)) + 33;
        // retrieving corresponding character
        var randChar = String.fromCharCode(asciiCode);
        // adding current char to key string
        key = key.concat(randChar);
    }

    return key;

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

//console.log(passwordHash('cheese','123456789'));

var key = generateKey();
/*
var mystring = "bananarama is a funny word"
var test = encryptDecrypt(mystring, key);
console.log('hi');
console.log(test);
console.log('hi2');
console.log(encryptDecrypt(test, key));
*/
console.log(key);