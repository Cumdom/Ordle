let cookie = {}
let gameData = {
    lastDayPlayed:'',
    gameOver:false,
    registeredWords:[],
    registeredPalettes:[],
    keyboardPalettes:[[],[],[],],
    scores:[0,0,0,0,0,0,false,0,0,0],
    //* scores: index 0-5 are the winning row scores
    //*         index 6 is used to determine if the player has won this page load or if the have refreshed.
    //*         index 7 is the current win streak length.
    //*         index 8 is the highest win streak length.
    //*         index 9 is games played.
}

cookie.keyboardPaletteSaver = _=>{
    gameData.keyboardPalettes[0]  =   keyboard.grayLetters;
    gameData.keyboardPalettes[1]  =   keyboard.yellowLetters;
    gameData.keyboardPalettes[2]  =   keyboard.greenLetters;
}

cookie.reconstructor = _=>{
    keyboard.grayLetters    =   gameData.keyboardPalettes[0];
    keyboard.yellowLetter   =   gameData.keyboardPalettes[1];
    keyboard.greenLetters   =   gameData.keyboardPalettes[2];
    // keyboard.painter()
    rowContainerArray = gameData.registeredWords;
    for(i=0;i<gameData.registeredWords.length;i++){
        for(j=0;j<gameData.registeredWords[i].length;j++){
            var cellID = 'row' + (i+1) + 'col' + (j+1);
            var letterCell = document.getElementById(cellID);
            letterCell.innerHTML = '<div>'+gameData.registeredWords[i][j].toUpperCase()+'</div>';
            letterCell.className += ' letterCellFilled';
            if(i==gameData.registeredWords.length-1&&j==gameData.registeredWords[i].length-1){
                rowIndex=i
                letterIndex=5
                console.log('rowindex',rowIndex)
                console.log('letterindex',letterIndex)
                gameHandler.commitRow(true)
                return
            }else if(i!=gameData.registeredWords.length-1){
                letterCell.className.replace(' letterCellFilled','')
                switch (gameData.registeredPalettes[i][j]){
                    case '0' : {
                        letterCell.className += ' letterCellWrong';
                    }break;
                    case '1' : {
                        letterCell.className += ' letterCellRight';
                    }break;
                    case '2' : {
                        letterCell.className += ' letterCellPresence';
                    }break;
            }
            }
        }
        // rowIndex=i+1
    }
    // gameData.registeredWords.push([])
    // letterIndex=0
}


cookie.storeStates = _=>{
    localStorage.setItem('lastDayPlayed',currentDay)
    cookie.bakeState('gameOver')
    cookie.bakeState('registeredWords')
    cookie.bakeState('registeredPalettes')
    localStorage.setItem('keyboardGray',gameData.keyboardPalettes[0])
    localStorage.setItem('keyboardYellow',gameData.keyboardPalettes[1])
    localStorage.setItem('keyboardGreen',gameData.keyboardPalettes[2])
}
cookie.bakeState = (cookie)=>{
    localStorage.setItem(cookie, gameData[cookie]);
}


cookie.fetchState = (cookie)=>{
    var fetchedCookie = localStorage.getItem(cookie)
    if(fetchedCookie!=undefined){
        gameData[cookie] = fetchedCookie.split(',');
        //!gjør dette der nede
    }
}
cookie.splitArray = (array)=>{
    if(array!=undefined){
        return array.split(',')
    }
}


cookie.onLoad = _=>{
    cookie.fetchState('dicks','gameOver')
    cookie.getScores()
    if(gameData.scores==undefined){
        gameData.scores = [0,0,0,0,0,0,false,0,0,0];
    }
    if (gameData.gameOver[0] =='false'||gameData.gameOver[0]==false||gameData.gameOver==false){
        gameData.gameOver = false
    } else{
        gameData.gameOver = true
    }
    cookie.fetchState('registeredWords')
    cookie.fetchState('registeredPalettes')
    gameData.registeredWords = cookie.reprocessArray(gameData.registeredWords, 5)
    gameData.registeredPalettes = cookie.reprocessArray(gameData.registeredPalettes, 5)
    gameData.registeredPalettes.forEach(x=>{
        console.log(x)
        if(x==String){
            x = cookie.splitArray(x)
        }
    })
    //? HER nede VVVVV
    gameData.keyboardPalettes[0] = cookie.splitArray(localStorage.getItem('keyboardGray'));
    gameData.keyboardPalettes[1] = cookie.splitArray(localStorage.getItem('keyboardYellow'));
    gameData.keyboardPalettes[2] = cookie.splitArray(localStorage.getItem('keyboardGreen'));
    //?     AAAAAAAA
    var lastDayPlayed = localStorage.getItem('lastDayPlayed')
    
    console.log('lastday',lastDayPlayed)
    console.log('curerntday',currentDay)
    if(lastDayPlayed==currentDay){
        gameData.scores[6]=false
        cookie.reconstructor()
        console.log('reconstructerd')
    } else{
        gameData.scores[6]=false
        cookie.clearGameData()
        console.log('cleared')
    }

}

cookie.clearGameData = _=>{
    gameData.lastDayPlayed = currentDay
    gameData.gameOver=false;
    gameData.registeredWords=[];
    gameData.registeredPalettes=[];
    gameData.keyboardPalettes=[[],[],[]];
}

cookie.reprocessArray = (array,length)=>{
    var fixedArray = []
    for(i=0;i<Math.floor(array.length/length);i++){
        var subarray = []
        for(j=0;j<length;j++){
            subarray.push(array[i*length + j]);
        }
        fixedArray.push(subarray)
    }
    return fixedArray
}

cookie.setScores = _=>{
    var scores = JSON.stringify(gameData.scores)
    localStorage.setItem('scores',scores);
}

cookie.getScores = _=>{
    var JSONscores = localStorage.getItem('scores')
    gameData.scores = JSON.parse(JSONscores) 
}