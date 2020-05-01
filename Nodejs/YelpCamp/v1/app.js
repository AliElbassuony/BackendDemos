var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const mongoClient = require('mongodb').mongoClient;
mongoClient.connect('mongodb://localhost:27017',(err,res)=>{
    console.log('Connect to database');
    let db = res.db('firstDB');
    res.close();
});

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

var campgrounds = [
    {name : 'London', image :'https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf85254794e722d7ad29144_340.jpg'},
    {name : 'Paris', image :'https://pixabay.com/get/54e5dc474355a914f1dc84609620367d1c3ed9e04e507441722879d5914bcc_340.jpg'},
    {name : 'Berlin', image :'https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e507441722879d5914bcc_340.jpg'},
    {name : 'Warso', image :'https://pixabay.com/get/57e8d1454b56ae14f1dc84609620367d1c3ed9e04e507441722879d5914bcc_340.jpg'},
    {name : 'Alex', image :'https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e507441722879d5914bcc_340.jpg'}
];

app.get('/', (req, res) => {
    res.render('landing');
});
app.get('/campgrounds', (req, res) => {
    res.render('campgrounds',{campgrounds:campgrounds});
});
app.get('/campgrounds/new', (req, res) => {
    res.render('new');
});

app.post('/campgrounds', (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var newCamp = {name:name,image:image};
    campgrounds.push(newCamp);
    res.redirect('/campgrounds');
});

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});