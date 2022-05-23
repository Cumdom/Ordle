function headerInit(){
    document.getElementById('menuRightButton').addEventListener('click',_=>endHandler.popUp())
}

function ordbøkeneLinker(){
    console.log('daodhiahnd')
    var link = document.createElement('a');
    link.innerHTML = 'Søk dagens ord på ordbøkene.no';
    link.setAttribute('href','https://ordbokene.no/bm,nn/search?q='+ordListe[currentDay]+'&scope=ei');
    document.getElementById('menuLeftButton').innerHTML='';
    document.getElementById('menuLeftButton').appendChild(link)
}

