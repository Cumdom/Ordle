function unlightKey(x){
    var key = document.getElementById('keyboard-' + x);
    key.className += ' incorrectLetter'
}

// TODOSTART:   cache correct and incorrect letters then paint them
// TODO         yellow keys are impermanent and get overwritten by green keys 
// TODO         green and black keys are permanent, no need to change