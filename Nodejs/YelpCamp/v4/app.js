const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      Campground = require('./models/campground'),
      Comment    = require('./models/comment'),
      seedDB     = require('./seeds'); 

mongoose.connect('mongodb://localhost:27017/yelp_camp_v4',{useNewUrlParser:true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));      
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
                res.render('campgrounds/campgrounds',{campgrounds:allCampgrounds});
            }
    });
});

// Create - Add new campground to database
app.post('/campgrounds', (req, res) => {
    //Get data from form using bodyParser
    
    var newCamp = req.body.camp;
    // Create new Campground and save to database
    Campground.create(newCamp,(err,newlyCamp)=>{
        if(err){
            console.log("Error!");
        }else{
            res.redirect('campgrounds/campgrounds');
        }
    })
});

// NEW - Show form to add new campground
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

app.get('/campgrounds/:id', (req, res) => {
    Campground.findById(req.params.id).populate('comments').exec((err,camp)=>{
        res.render('campgrounds/show',{camp:camp});
    });
});
// Get form of add New Comment 
app.get('/campgrounds/:id/comments/new', (req, res) => {
    Campground.findById(req.params.id,(err, campground)=>{
        if(err)
        {
            console.log(err);
        } else {
            res.render('comments/new',{camp:campground});
        }
    });
});
app.post('/campgrounds/:id/comments', (req, res) => {
    Campground.findById(req.params.id,(err,camp)=>{
            if(err){
                console.log(err);
                redirect('/campground');
            } else {
                Comment.create(req.body.comment,(err,comment)=>{
                    if(err){
                        console.log(err);
                    } else{
                        camp.comments.push(comment);
                        camp.save();
                        res.redirect('/campgrounds/' + camp._id);
                    }
                })
            }
    });
});
app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});