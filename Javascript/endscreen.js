let statHandler = {}
let endHandler = {};

statHandler.fetchGraphScores = _=>{
    var scores = [];
    for(i=0;i<6;i++){
        scores.push(gameData.scores[i])
    }
    var highestValue = 0;
    scores.forEach(x=>{
        if(x>highestValue){
            highestValue = x;
        }
    });
    var fractionScores = []
    scores.forEach(x=>{
        var fractionScore = x/highestValue;
        fractionScores.push(fractionScore)
    });
    return fractionScores;
}

statHandler.drawScoreGraph = _=>{
    var scores = statHandler.fetchGraphScores();
    var graphParent = document.getElementById("columnGraphContainer");
    var graphChildren = [...graphParent.children]
    for(i=0;i<graphChildren.length;i++){
        [...graphChildren[i].children][0].style.width = scores[i]*100 + '%';
        [...[...graphChildren[i].children][0].children][0].innerHTML = gameData.scores[i]
    }
}

statHandler.fetchStreakStats = _=>{
    var stats = [0,0,0,0];
//? index 0: PLAYED   1: WIN%    2: CURRENT STREAK    3: MAX STREAK
    stats[0] = gameData.scores[9];

    for(i=0;i<6;i++){
        stats[1] += gameData.scores[i]
    }
    stats[1] = (stats[1]/stats[0])*100;
    stats[2] = gameData.scores[7]
    stats[3] = gameData.scores[8]
    return stats
}

statHandler.writeStreakStats = _=>{
    var stats = statHandler.fetchStreakStats();
    var statBoxes = [...document.getElementById('streakNumberContainer').children]
    for(i=0;i<4;i++){
        statBoxes[i].innerHTML = Math.floor(stats[i]*10)/10
    }
}

endHandler.popUp = (divIdentity)=>{
    // document.getElementById('ordbokBox').addEventListener('click',endHandler.ordbøkeneLinkinator)
    var container = document.getElementById(divIdentity + 'Container');
    var box = document.getElementById(divIdentity + 'Box');
    container.style.animation = 'endscreenFadeIn '+0.66+'s';
    container.style.animationFillMode = 'forwards';
    box.style.animation       = 'endscreenBoxFadeIn '+0.66+'s';
    box.style.animationFillMode = 'forwards';
}

endHandler.popDown = (divIdentity)=>{
    // document.getElementById('ordbokBox').removeEventListener('click',endHandler.ordbøkeneLinkinator)
    var container = document.getElementById(divIdentity + 'Container');
    var box = document.getElementById(divIdentity + 'Box');

    container.style.animation = 'endscreenFadeOut '+0.66+'s';
    container.style.animationFillMode = 'forwards';
    box.style.animation       = 'endscreenBoxFadeOut '+0.66+'s';
    box.style.animationFillMode = 'forwards';
}

endHandler.assignExitButton = _=>{
    [...document.getElementById('endscreenExitButton').children][0].addEventListener('click',_=>endHandler.popDown('endscreen'))
    document.getElementById('backgroundExit').addEventListener('click',_=>endHandler.popDown('endscreen'))
}

endHandler.ordbøkeneLinker = _=>{
    document.getElementById('ordbokBox').className='';
    [...document.getElementById('ordbokBox').children][0].addEventListener('click',endHandler.ordbøkeneLinkinator)
}
endHandler.ordbøkeneLinkinator = _=>{
    window.open('https://ordbokene.no/bm,nn/search?q='+ordListe[currentDay]+'&scope=ei', '_blank');
}

endHandler.init = _=>{
    statHandler.writeStreakStats()
    statHandler.drawScoreGraph()
}

endHandler.writeTime = _=>{
    var time = -(Date.now()/(((1000*60)*60-15.5)*24) - 19088 +20/(3600*24))*24 + currentDay*24;
    var hours = Math.floor(time)
    var minutes = Math.floor((time-hours)*60)
    var seconds = Math.floor(((time-hours)*60-minutes)*60)
    var timeString = hours + ':' + minutes + ':' + seconds;
    document.getElementById('countdown').innerHTML=timeString;
}


endHandler.timer = _=>{
    setInterval(endHandler.writeTime,500)
}