let grayLetters = []
let yellowLetters = []
let greenLetters = []


function unlightKey(x){
    var key = document.getElementById('keyboard-' + x);
    key.className += ' incorrectLetter'
}

function addKeyboardEventlistener(){
    var keys = [...document.getElementById('keyboard').children]
    keys.forEach(x=>{
        var i = {key:x.id.slice(9)}

        x.addEventListener('click',_=>editRow(i))
    });
}

function keyboardPainter(){
    grayLetters.forEach(x => {
        var grayKey = document.getElementById('keyboard-'+x);
        grayKey.className = 'keyboardKey incorrectLetter';
    })
    yellowLetters.forEach(x => {
        var grayKey = document.getElementById('keyboard-'+x);
        grayKey.className = 'keyboardKey yellowLetter';
    })
    greenLetters.forEach(x => {
        var grayKey = document.getElementById('keyboard-'+x);
        grayKey.className = 'keyboardKey greenLetter';
    })
    
    
}
