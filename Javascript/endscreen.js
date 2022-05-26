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
        statBoxes[i].innerHTML = Math.round(stats[i]*10)/10
    }
}

endHandler.popUp = _=>{
    // document.getElementById('ordbokBox').addEventListener('click',endHandler.ordbøkeneLinkinator)
    var container = document.getElementById('endscreenContainer');
    var box = document.getElementById('endscreenBox');

    container.style.animation = 'endscreenFadeIn '+0.66+'s';
    container.style.animationFillMode = 'forwards';
    box.style.animation       = 'endscreenBoxFadeIn '+0.66+'s';
    box.style.animationFillMode = 'forwards';
}

endHandler.popDown = _=>{
    // document.getElementById('ordbokBox').removeEventListener('click',endHandler.ordbøkeneLinkinator)
    var container = document.getElementById('endscreenContainer');
    var box = document.getElementById('endscreenBox');

    container.style.animation = 'endscreenFadeOut '+0.66+'s';
    container.style.animationFillMode = 'forwards';
    box.style.animation       = 'endscreenBoxFadeOut '+0.66+'s';
    box.style.animationFillMode = 'forwards';
}

endHandler.assignExitButton = _=>{
    [...document.getElementById('endscreenExitButton').children][0].addEventListener('click',endHandler.popDown)
    document.getElementById('backgroundExit').addEventListener('click',endHandler.popDown)
}

endHandler.ordbøkeneLinker = _=>{
    document.getElementById('ordbokBox').className='';
    document.getElementById('ordbokBox').addEventListener('click',endHandler.ordbøkeneLinkinator)
}
endHandler.ordbøkeneLinkinator = _=>{
    window.location.href ='https://ordbokene.no/bm,nn/search?q='+ordListe[currentDay]+'&scope=ei';
}

endHandler.init = _=>{
    statHandler.writeStreakStats()
    statHandler.drawScoreGraph()
}