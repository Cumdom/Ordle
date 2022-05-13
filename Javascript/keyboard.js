// var hoved = [...document.getElementById('header').children]
// 	var div = hoved[1]
// 	div.addEventListener('click',_=>{gameHandler.bootGame()})
var hoved = document.getElementById('header')
var div = hoved.children[1]
div.addEventListener('click',gameHandler.bootGame)


let keyboard = {}
keyboard.grayLetters = []
keyboard.yellowLetters = []
keyboard.greenLetters = []


keyboard.addKeyboardEventlistener = _=>{
    var keys = [...document.getElementById('keyboard').children]
    keys.forEach(x=>{
        var i = {key:x.id.slice(9)}
        x.addEventListener('click',_=>gameHandler.editRow(i))
    });
}

keyboard.painter = _=>{
    keyboard.grayLetters.forEach(x => {
        var grayKey = document.getElementById('keyboard-'+x);
        if(grayKey!=undefined){
            grayKey.className = 'keyboardKey incorrectLetter';
        }
    })
    keyboard.yellowLetters.forEach(x => {
        var grayKey = document.getElementById('keyboard-'+x);
        if(grayKey!=undefined){
        grayKey.className = 'keyboardKey yellowLetter';
        }
    })
    keyboard.greenLetters.forEach(x => {
        var grayKey = document.getElementById('keyboard-'+x);
        if(grayKey!=undefined){
        grayKey.className = 'keyboardKey greenLetter';
        }   
    })
}
