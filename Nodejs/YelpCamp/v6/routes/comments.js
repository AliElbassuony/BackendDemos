const router     = require('express').Router({mergeParams:true}),
      Campground = require('../models/campground'),
      Comment    = require('../models/comment');
// Get form of add New Comment 
router.get('/new',isLoggedIn, (req, res) => {
    Campground.findById(req.params.id,(err, campground)=>{
        if(err)
        {
            console.log(err);
        } else {
            res.render('comments/new',{camp:campground});
        }
    });
});
router.post('/',isLoggedIn, (req, res) => {
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

// Middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;