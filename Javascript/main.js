function yggdrasil(){
    gameHandler.bootGame()
    viewScaling.handler()
    headerInit()
    cookie.onLoad()
    
    endHandler.init()
    endHandler.assignExitButton()
    endHandler.timer()
}
yggdrasil()






// TODO: add text size dependant on window size // document.documentElement.style.setProperty('--your-variable', '#YOURCOLOR');

