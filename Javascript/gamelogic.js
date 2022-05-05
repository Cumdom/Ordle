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
let gameOver = false;

function checkRow(){
    if(letterIndex == 5){
        var word = "";
        for(i=0;i<5;i++){
            word += rowContainerArray[rowIndex][i];
        }
        return ordListe.includes(word)
    }
}

function newRow(){
    var presetRow = [[],[],[],[],[]];
    rowContainerArray.push(presetRow);
}

function editRow(e){
    if(!gameOver){
        var activeRow = rowContainerArray[rowIndex];
        var keyInput = e.key;
        if(alphabet.includes(keyInput.toLowerCase())){
            addLetter(keyInput.toLowerCase())
            
        } else if(keyInput == 'Backspace'){
            deleteLetter()
            
        } else if(keyInput == 'Enter'){
            commitRow()        
        }
    }
}

function addLetter(letter){
    if(letterIndex<5){
        rowContainerArray[rowIndex][letterIndex] = letter;
        updateDivCell()
        animator.popInStart()
        letterIndex++;
    }
}

function commitRow(){
    if(checkRow()){

        paintRow(comparisonPalette());
        keyboardPainter()
        if(gameOver){
            // document.removeEventListener('keydown',editRow);
            return
        }
        newRow();
        rowIndex++;
        letterIndex=0;
    }
}

function comparisonPalette(){
    var currentRow = rowContainerArray[rowIndex];
    var palette = [0,0,0,0,0];
    var correctCount = 0;
    //Assembles palette
    for (i=0;i<5;i++){
        var currentLetter = currentRow[i][0];
        if (dailyWord.includes(currentLetter)){
            if(dailyWord[i]==currentLetter){
                palette[i] = 1;
                greenLetters.push(currentLetter)
                correctCount++
            }else{
                palette[i] = 2;
                yellowLetters.push(currentLetter)
            }
        } else{
            grayLetters.push(currentLetter);
        }
    }
    if(correctCount==5){
        gameOver = true;
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

    return palette;
}


function paintRow(x){
    for (i=0;i<5;i++) {
        var letterCell = document.getElementById('row'+(rowIndex+1)+'col'+(i+1));
        switch (x[i]) {
            case 0:
                letterCell.className += ' letterCellWrong';
            break;
            case 1:
                letterCell.className += ' letterCellRight';
            break;
            case 2:
                letterCell.className += ' letterCellPresence';
            break;
        }
    }
}

function deleteLetter(){
    if(letterIndex>0){
        letterIndex--;
        rowContainerArray[rowIndex][letterIndex] = '';
        updateDivCell()
    }
}

function updateDivCell(){
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

function bootGame(){
    var gameContainer = document.getElementById('gameContainer');
    if(blankCache!=undefined){
        gameContainer.innerHTML = blankCache;
        dailyWord = [...ordListe[currentDay+currentDay+100+(Math.floor(Math.random()*1000))]];
        rowContainerArray = [];
        letterIndex = 0;
        rowIndex = 0;
        gameOver = false;

        grayLetters = [];
        yellowLetters = [];
        greenLetters = [];
    }

    blankCache = gameContainer.innerHTML;

    window.addEventListener('keydown',editRow)
    newRow()
    addKeyboardEventlistener()
    ordbøkeneLinker()
}