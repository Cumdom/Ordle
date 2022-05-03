let cookie = {}
cookie.Bake = _=>{

}

cookie.monster = _=>{
    document.cookie = "username=John Doe;";
}

cookie.OnLoad = _=>{
    var rawCookies = document.cookies;
    var cookies = rawCookies.split(';')
}
