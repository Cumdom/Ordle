let currentDay = Math.floor(Date.now()/(1000*60*60*24)) - 19087;
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
            // console.log(rowContainerArray, rowContainerArray[rowIndex], rowIndex)
            word += rowContainerArray[rowIndex][i];
        }
        return ordListe.includes(word)
    }
}

gameHandler.newRow = _=>{
    var presetRow = [];
    rowContainerArray.push(presetRow);
}

gameHandler.editRow = (e)=>{
    if(!gameData.gameOver&&!animator.flipping){
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

//! heavely integrated with animator.flip[...],  

gameHandler.commitRow = reconstructorPassthrough=>{
    console.log('commitrow',gameHandler.checkRow())
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
    if(gameData.gameOver){
        // document.removeEventListener('keydown',editRow);
        return
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
    ordbøkeneLinker()
}