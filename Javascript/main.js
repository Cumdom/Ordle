function yggdrasil(){
    bootGame()
}
yggdrasil()

var k = [...document.getElementById('keyboard').children]

k.forEach(x => {
    var l = x.innerHTML;
    x.innerHTML = '';
    var d = document.createElement('div');
    d.innerHTML = l;
    d.className = 'keyText';
    x.appendChild(d);
});







// TODO: add dark mode // document.documentElement.style.setProperty('--your-variable', '#YOURCOLOR');


// document.cookie = "username=John Doe;";
// document.getElementById('tb').addEventListener('click',tFUNC)
// var xd = 0;
// function tFUNC(e){
//     document.cookie = 'ard = 200;'
//     xd++
//     console.log('dicks')
//     document.getElementById('tb').innerHTML = document.cookie;
// }