var hell = document.getElementById('hell');


var str = hell.innerHTML;
hell.innerHTML = "";    
var stringArray = str.split(/(\s+)/);


var filteredArray = []


stringArray.forEach(x => {if(x.length==5) {
    filteredArray.push(x)
}})

console.log(filteredArray)