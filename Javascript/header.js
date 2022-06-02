let header = {};
header.init = _=>{    
    document.getElementById('menuRightButton').addEventListener('click',_=>endHandler.popUp('endscreen'))
    document.getElementById('menuLeftButton').addEventListener('click',_=>endHandler.popUp('tutorial'))
    document.getElementById('tutorialExitButton').addEventListener('click',_=>endHandler.popDown('tutorial'))


}