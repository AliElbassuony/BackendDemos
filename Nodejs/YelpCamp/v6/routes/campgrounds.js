const router     = require('express').Router(),
      Campground = require('../models/campground'),
      Comment = require('../models/comment');

//INDEX Show all Goupgrounds
router.get('/', (req, res) => {
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
router.post('/', (req, res) => {
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
router.get('/new', (req, res) => {
    res.render('campgrounds/new');
});

router.get('/:id', (req, res) => {
    Campground.findById(req.params.id).populate('comments').exec((err,camp)=>{
        res.render('campgrounds/show',{camp:camp});
    });
});

// Middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;