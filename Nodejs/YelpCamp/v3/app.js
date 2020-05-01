const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      Campground = require('./models/campground'),
      seedDB     = require('./seeds'); 

mongoose.connect('mongodb://localhost:27017/yelp_camp',{useNewUrlParser:true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
      
seedDB();
//Create

app.get('/', (req, res) => {
    res.render('landing');
});
//INDEX Show all Goupgrounds
app.get('/campgrounds', (req, res) => {
    // Get all data from database
    Campground.find({},(err,allCampgrounds)=>{
            if(err){
                console.log('Error!');
            }else{
                res.render('campgrounds',{campgrounds:allCampgrounds});
            }
    });
});

// Create - Add new campground to database
app.post('/campgrounds', (req, res) => {
    //Get data from form using bodyParser
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    var newCamp = {name:name,image:image,desc:desc};
    // Create new Campground and save to database
    Campground.create(newCamp,(err,newlyCamp)=>{
        if(err){
            console.log("Error!");
        }else{
            res.redirect('/campgrounds');
        }
    })
});

// NEW - Show form to add new campground
app.get('/campgrounds/new', (req, res) => {
    res.render('new');
});

app.get('/campgrounds/:id', (req, res) => {
    Campground.findById(req.params.id).populate('comments').exec((err,camp)=>{
        res.render('show',{camp:camp});
    });
});

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});