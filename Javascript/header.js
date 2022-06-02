let header = {};
header.init = _=>{    
    document.getElementById('menuRightIcon').addEventListener('click',_=>endHandler.popUp('endscreen'));
    document.getElementById('menuLeftIcon').addEventListener('click',_=>endHandler.popUp('tutorial'));
    [...document.getElementById('tutorialExitButton').children][1].addEventListener('click',_=>endHandler.popDown('tutorial'));


}