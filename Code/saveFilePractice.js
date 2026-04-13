function openFile(){
    // user selects file
    var [fileHandle] = window.showOpenFilePicker();
    // getting file
    var data = fileHandle.getfile();
    // retreiving the text
    var text = data.text;

    console.log(text);
}

openFile();
