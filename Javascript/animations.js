let animator = {};

animator.popInStart = _=>{
    var cellID = 'row' + (rowIndex+1) + 'col' + (letterIndex+1);
    document.getElementById(cellID).style.transform = 'scale( ' + 1.1 + ' )';

    var popInIntervalID = setInterval(_=>animator.popInTransform(cellID,popInIntervalID),10)
};

animator.popInTransform = (cellID,popInIntervalID)=>{
    var scaleValue = animator.scaleValueExtractor(cellID) - 0.02;
    document.getElementById(cellID).style.transform = 'scale( ' + (scaleValue) + ' )';
    
    if(scaleValue<=1){
        document.getElementById(cellID).style.transform ='scale( ' + 1 + ' )';
        clearInterval(popInIntervalID)
        return
    };
}

animator.scaleValueExtractor = cellID=>{
    var cellTransform = document.getElementById(cellID).style.transform;
    cellTransform = +cellTransform.substring(6,cellTransform.indexOf(')'));
    
    return cellTransform
}