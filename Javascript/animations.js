let animator = {};
animator.flipping       = false
animator.popInSpeed     = 1;
animator.flipSpeed      = 1.6;

animator.popIn = _=>{
    var letterCell = document.getElementById('row'+(rowIndex+1)+'col'+(letterIndex+1));
    letterCell.style.animation = 'popIn ' + (0.1 * animator.popInSpeed) +'s';
    setTimeout(_=>{letterCell.style.animation = '';},100)
}

animator.flip = colourPalette=>{
    animator.flipping = true
    var letterCell = document.getElementById('row'+(rowIndex+1)+'col'+(letterIndex+1));
    letterCell.style.animation = 'flipStart ' + (1/animator.flipSpeed) + 's';
    letterCell.style.animationTimingFunction = 'ease-in';
    setTimeout(_=>{
        paintRow(colourPalette, letterCell)},
        500/animator.flipSpeed
        );
        if(letterIndex>3){
            setTimeout(_=>{
                commitRowContinuator()
                animator.flipping = false
        },1000/animator.flipSpeed)
    } else{
        letterIndex++
        setTimeout(_=>animator.flip(colourPalette),500/animator.flipSpeed)
    }
}

//! ONLY PAIN AND MISERY AWAITS BELOW, YOU HAVE BEEN WARNED!

// animator.popInStart = _=>{
//     var letterCell = document.getElementById('row'+(rowIndex+1)+'col'+(letterIndex+1));
//     letterCell.style.transform = 'scale( ' + 1.1 + ' )';
//     var popInIntervalID = setInterval(_=>animator.popInTransform(letterCell,popInIntervalID),animator.intervalSpeed)
// };

// animator.popInTransform = (letterCell,popInIntervalID)=>{
//     var scaleValue = animator.scaleValueExtractor(letterCell) - 0.02*animator.popInSpeed;
//     letterCell.style.transform = 'scale( ' + (scaleValue) + ' )'; 
//     if(scaleValue<=1){
//         letterCell.style.transform ='scale( ' + 1 + ' )';
//         clearInterval(popInIntervalID)
//         return
//     };
// }

// animator.scaleValueExtractor = letterCell=>{
    //     var cellTransform = letterCell.style.transform;
    //     var openingParenthesis = cellTransform.indexOf('(')+1
//     var closingParenthesis = cellTransform.indexOf(')')
//     cellTransform = +cellTransform.substring(openingParenthesis,closingParenthesis);

//     return cellTransform
// }

// animator.flipStart = colourPalette=>{
    //     animator.flipping = true
    //     var letterCell = document.getElementById('row'+(rowIndex+1)+'col'+(letterIndex+1));
    //     letterCell.style.transform = 'scaleY( ' + 1 + ' )';
    //     var flipIntervalID = setInterval(_=>{
        //         animator.flipStartTransform(letterCell,flipIntervalID,colourPalette)
//     },animator.intervalSpeed)
// }

// animator.flipStartTransform = (letterCell,flipIntervalID,colourPalette)=>{
//     var scaleValue = animator.scaleValueExtractor(letterCell) - 0.02*animator.flipSpeed;
//     letterCell.style.transform = 'scaleY( ' + (scaleValue) + ' )';
//     if(scaleValue<=0){
//         letterCell.style.transform ='scaleY( ' + 0 + ' )';
//         clearInterval(flipIntervalID)
//         paintRow(colourPalette)
//         animator.flipEnd(colourPalette)
//     };
// }
// animator.flipEnd = colourPalette=>{
//     var letterCell = document.getElementById('row'+(rowIndex+1)+'col'+(letterIndex+1));

//     letterCell.style.transform = 'scaleY( ' + 0 + ' )';
//     var flipIntervalID = setInterval(_=>{
//         animator.flipEndTransform(letterCell,flipIntervalID,colourPalette)
//     },10)
// }

// animator.flipEndTransform =(letterCell,flipIntervalID,colourPalette)=>{
//     var scaleValue = animator.scaleValueExtractor(letterCell) + 0.02*animator.flipSpeed;
//     letterCell.style.transform = 'scaleY( ' + (scaleValue) + ' )';
//     if(scaleValue>=1){
//         letterCell.style.transform ='scaleY( ' + 1 + ' )';
//         clearInterval(flipIntervalID)
//         letterCell = document.getElementById('row'+(rowIndex+1)+'col'+(letterIndex+2))
//         if(letterCell==undefined){
//             commitRowContinuator()
//             animator.flipping = false
//         } else{
//             letterIndex++
//             animator.flipStart(colourPalette)
//         }
//     };
// }

// animator.intervalSpeed  = 16.667
// animator.flipSpeed      = (animator.intervalSpeed/10) * 2.33;
// animator.popInSpeed     = (animator.intervalSpeed/10) * 1;
