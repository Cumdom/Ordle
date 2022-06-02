function yggdrasil(){
    gameHandler.bootGame()
    viewScaling.handler()
    header.init()
    cookie.onLoad()
    
    endHandler.init()
    endHandler.assignExitButton()
    endHandler.timer()
}
yggdrasil()






// TODO: add text size dependant on window size // document.documentElement.style.setProperty('--your-variable', '#YOURCOLOR');

