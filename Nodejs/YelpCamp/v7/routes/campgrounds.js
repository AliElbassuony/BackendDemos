const router     = require('express').Router({mergeParams:true}),
      Campground = require('../models/campground'),
      Comment    = require('../models/comment');
      User       = require('..//models/user'),
      middleware = require('../middleware');

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
router.post('/', middleware.isLoggedIn,(req, res) => {
    //Get data from form using bodyParser
    var name  = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc  = req.body.desc;
    var author = {
        id:req.user._id,
        username:req.user.username
    };
   var newCamp = {name : name,price:price,image:image,desc:desc,author:author};
    // Create new Campground and save to database
    
    Campground.create(newCamp,(err,newlyCamp)=>{
        if(err){
            res.redirect('back');
        }else{
            
            res.redirect('/');
        }
    })
});

// NEW - Show form to add new campground
router.get('/new', middleware.isLoggedIn,(req, res) => {
    res.render('campgrounds/new');
});

router.get('/:id', (req, res) => {
    Campground.findById(req.params.id).populate('comments').exec((err,camp)=>{
        res.render('campgrounds/show',{camp:camp});
    });
});
//Edit 
router.get('/:id/edit', middleware.checkCampgroundOwnership,(req, res) => {
    Campground.findById(req.params.id,(err,foundCamp)=>{
        if(err)
        {
            res.redirect('/campgrounds');
        } else {
            res.render('campgrounds/edit' ,{campground:foundCamp});
        }
    }) 
});
//Update
router.put('/:id', (req, res) => {
    var camp = req.body.camp; 
    Campground.findByIdAndUpdate(req.params.id,camp,(err,foundCamp)=>{
        if(err)
        {
            res.redirect('back');
        }else{
            res.redirect('/campgrounds/'+req.params.id);
        }
    })
});
//Delete
router.delete('/:id', middleware.checkCampgroundOwnership,(req, res) => {
    Campground.findByIdAndRemove(req.params.id,(err)=>{
        if(err){
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});
module.exports = router;