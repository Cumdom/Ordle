let viewScaling = {}

viewScaling.resizeEventListener = _=>{
    var kbfontsize = (document.getElementById('container').clientHeight/50) + 'px';
    document.documentElement.style.setProperty('--kbfontsize', kbfontsize);
    
    // var containersize = (window.innerHeight);
    // document.documentElement.style.setProperty('--containersize', containersize);
}
viewScaling.handler = _=>{
    viewScaling.resizeEventListener()
    window.addEventListener('resize',viewScaling.resizeEventListener)
}