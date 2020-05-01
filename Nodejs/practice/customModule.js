function echo(s,c) {
    for(var i = 0;i < c;i++)
    {
        console.log(s);
    }
}
module.exports = { 
    echo:echo
}