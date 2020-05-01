var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var rp = require('request-promise');
rp('https://jsonplaceholder.typicode.com/todos/1')
.then((htmlstring)=>{
    const parsedData = JSON.parse(htmlstring);
    console.log(`${parsedData.title} his id is: ${parsedData.id}`);
})
.catch((err)=>{
    console.log('Error!',err);
});
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');

var friends = ['Ali','Samir','Mohamed','Khaled','Debo'];
app.get('/',function (req, res){
   res.render('home');
    // res.send('Hi there, welcome to my assignment!');     
});
app.get('/speak/:animal', (req, res) => {
    var animal = req.params.animal.toLowerCase();
    var sounds = {
        pig:"Oink",
        cow:"Moo",
        dog:"Woof Woof!",
        cat:"I hate you Man",   
        goldfish:"..."
    }
    var sound = sounds[animal];
    res.render('index',{animalVal : animal});
});
app.get('/repeat/:say/:num', (req, res) => {
    var num = req.params.num;
    var say = req.params.say;
    var tot = "";
    for(var i = 0;i < num;++i)
    {
        tot += say + " ";
    }
    res.send(tot);
});
app.post('/addpost', (req, res) => {
    var val = req.body.newfriend;
    friends.push(val);
    res.redirect('/posts');
});
app.get('/posts', (req, res) => {
    
    res.render('posts',{posts:friends});
});
app.get('*', (req, res) => {
    res.send("Sorry, page not found...what are you doing with your life?");
});
// Tell Express to Listen for requests (start server)
app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});