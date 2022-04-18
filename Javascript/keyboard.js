function generateKeyboard(){
    var parent = document.getElementById('keyboardContainer');
    for(i=0;i<alphabet.length;i++){
        var child = document.createElement('div');
        child.id = 'keyboard-'+alphabet[i];
        child.className = 'KeyboardKey';
        parent.appendChild(child)
    }
}

function unlightLetter(x){
    
}