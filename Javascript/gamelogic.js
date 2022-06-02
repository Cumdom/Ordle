let currentDay = Math.floor((Date.now()/(((1000*60)*60-15.5)*24) - 19087 +20/(3600*24)));
let alphabet = [
    'q','w','e','r','t','y','u','i','o','p','å','a','s','d','f','g','h','j','k','l','ø','æ','z','x','c','v','b','n','m'
]
let blankCache;

//* resettables
let dailyWord = [...ordListe[currentDay]];
let rowContainerArray = [];
let letterIndex = 0;
let rowIndex = 0;



let gameHandler = {};

gameHandler.checkRow = _=>{
    if(letterIndex == 5){
        var word = "";
        for(i=0;i<5;i++){
            word += rowContainerArray[rowIndex][i];
        }
        switch (word) {
            case ('norge'):
                document.getElementById('container').className='norge';
            break;
            case ('noreg'):
                document.getElementById('container').className='norge';
            break;
            case ('black'):
                document.getElementById('container').className='nightmode';
            case ('night'):
                document.getElementById('container').className='nightmode';
            break;
            case ('white'):
                document.getElementById('container').className='';
            case ('light'):
                document.getElementById('container').className='';
            break;
            case ('lgbtq'):
                setInterval(_=>{
                    document.getElementById('container').style.filter='hue-rotate('+(Math.random()*360-180)+'deg)';
                },300)
            break;


        }
        gameData.colormode = document.getElementById('container').className;
        cookie.bakeState('colormode')
        return ordListe.includes(word)
    }
}

gameHandler.newRow = _=>{
    var presetRow = [];
    rowContainerArray.push(presetRow);
}

gameHandler.editRow = (e)=>{
    if(!gameData.gameOver&&!animator.flipping){
        gameData.scores[6] = true;
        console.log(gameData.scores)
        var activeRow = rowContainerArray[rowIndex];
        var keyInput = e.key;
        if(alphabet.includes(keyInput.toLowerCase())){
            gameHandler.addLetter(keyInput.toLowerCase())
        } else if(keyInput == 'Backspace'){
            gameHandler.deleteLetter()
            
        } else if(keyInput == 'Enter'){
            gameHandler.commitRow()        
        }
    }
}

gameHandler.addLetter = (letter)=>{
    if(letterIndex<5){
        rowContainerArray[rowIndex][letterIndex] = letter;
        gameHandler.updateDivCell()
        animator.popIn()
        letterIndex++;
    }
}

gameHandler.commitRow = reconstructorPassthrough=>{
    if(gameHandler.checkRow()){
        letterIndex = 0
        animator.flip(gameHandler.comparisonPalette(reconstructorPassthrough))
        // animator.flipStart(comparisonPalette())
        cookie.keyboardPaletteSaver()
        gameData.registeredWords = rowContainerArray;
    }
}

gameHandler.commitRowContinuator = _=>{
    
    keyboard.painter()
    if(gameData.gameOver||rowIndex==5){
        gameHandler.endGame()
    }
    gameHandler.newRow();
    rowIndex++;
    letterIndex=0;
    
}


gameHandler.comparisonPalette = reconstructorPassthrough=>{
    var currentRow = rowContainerArray[rowIndex];
    var palette = [0,0,0,0,0];
    var correctCount = 0;
    //Assembles palette
    for (i=0;i<5;i++){
        var currentLetter = currentRow[i][0];
        if (dailyWord.includes(currentLetter)){
            if(dailyWord[i]==currentLetter){
                palette[i] = 1;
                if(!keyboard.greenLetters.includes(currentLetter)){
                    keyboard.greenLetters.push(currentLetter);
                }
                correctCount++
            }else{
                palette[i] = 2;
                if(!keyboard.yellowLetters.includes(currentLetter)){
                    keyboard.yellowLetters.push(currentLetter);
                }
            }
        } else{
            if(!keyboard.grayLetters.includes(currentLetter)){
                keyboard.grayLetters.push(currentLetter);
            }
        }
    }
    if(correctCount==5){
        gameData.gameOver = true;
        if(reconstructorPassthrough!=true){
            gameData.registeredPalettes.push(palette);
        }
        
        return palette;
    }
    //Cleans palette of redundant yellows. full av vonde tanker :)))))))
    for(i=0;i<5;i++){
        if(palette[i]==2){
            var missedLetterCount = false;
            for(j=0;j<5;j++){
                if(currentRow[i][0]==dailyWord[j]&&palette[j]!=1){
                    missedLetterCount = true;
                }
            }
            if(!missedLetterCount){
                palette[i] = 0;
            }
        }
    }
    if(reconstructorPassthrough!=true){
        gameData.registeredPalettes.push(palette);
    }
    return palette;
}


gameHandler.paintRow = (palette, letterCell)=>{
    switch (palette[letterIndex-1]){
        case 0 : {
            letterCell.className += ' letterCellWrong';
        }break;
        case 1 : {
            letterCell.className += ' letterCellRight';
        }break;
        case 2 : {
            letterCell.className += ' letterCellPresence';
        }break;
    }
}


gameHandler.deleteLetter = _=>{
    if(letterIndex>0){
        letterIndex--;
        console.log('letterindex',letterIndex)
        rowContainerArray[rowIndex][letterIndex] = '';
        gameHandler.updateDivCell()
    }
}

gameHandler.updateDivCell = _=>{
    var cellID = 'row' + (rowIndex+1) + 'col' + (letterIndex+1);
    var cell = document.getElementById(cellID);
    var letter = rowContainerArray[rowIndex][letterIndex].toUpperCase()
    cell.innerHTML = '<div>' + letter + '</div>';
    if(letter ==''){
        cell.className = cell.className.replace(' letterCellFilled','')
    } else{
        cell.className += ' letterCellFilled';
    }
}

gameHandler.bootGame = _=>{
    var gameContainer = document.getElementById('gameContainer');
    if(blankCache!=undefined){
        gameContainer.innerHTML = blankCache;
        dailyWord = [...ordListe[currentDay+currentDay+100+(Math.floor(Math.random()*1000))]];
        rowContainerArray = [];
        letterIndex = 0;
        rowIndex = 0;
        gameData.gameOver = false;

        grayLetters = [];
        yellowLetters = [];
        greenLetters = [];
    }

    blankCache = gameContainer.innerHTML;

    window.addEventListener('keydown',gameHandler.editRow)
    gameHandler.newRow()
    keyboard.addKeyboardEventlistener()
}

gameHandler.endGame = _=>{
    if(gameData.scores[6]){
    gameData.scores[9]++
    }
    if(gameData.gameOver){
        gameHandler.wonGame()
    } else{
        gameHandler.lostGame()
    }
}

gameHandler.wonGame = _=>{
    if(gameData.scores[6]){
        gameData.scores[rowIndex]++
        gameData.scores[7]++
        if(gameData.scores[7]>gameData.scores[8]){
            gameData.scores[8]++
        }
    }
    cookie.setScores()
    endHandler.ordbøkeneLinker()
    endHandler.init()
    endHandler.popUp('endscreen')
}
gameHandler.lostGame = _=>{
    endHandler.ordbøkeneLinker()
    endHandler.init()
    endHandler.popUp('endscreen')
}