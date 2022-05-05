let viewScaling = {}

viewScaling.resizeEventListener = _=>{
    var kbfontsize = (document.getElementById('container').clientHeight/50) + 'px';
    document.documentElement.style.setProperty('--kbfontsize', kbfontsize);
}
viewScaling.handler = _=>{
    viewScaling.resizeEventListener()
    window.addEventListener('resize',viewScaling.resizeEventListener)
}