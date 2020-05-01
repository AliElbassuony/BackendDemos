const Campground = require('../models/campground'),
      Comment    = require('../models/comment');

middlewareObj = {};
// CheckCampgroundOwnership
middlewareObj.checkCampgroundOwnership  = (req,res,next) => {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,(err,foundCamp)=>{
            if(err){
                res.redirect('back');
            } else {
                // does user own the campground
                if(foundCamp.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash('error',"You don't have permission!!!");
                    res.redirect('back');
                }
            }
        })
    } else {
        req.flash('error','You need to be logged in to do that!!!');
        res.redirect('back');
    }
}

// CheckCommentOwnership
middlewareObj.checkCommentOwnership = (req,res,next) => {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,(err,foundComment)=>{
            if(err){
                res.redirect('back');
            } else {
                // does user own the campground
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash('error',"You don't have permission!!!");
                    res.redirect('back');
                }
            }
        })
    } else {
        req.flash('error','You need to be logged in to do that!!!');
        res.redirect('back');
    }
}

// Check Users
middlewareObj.isLoggedIn = (req,res,next)=> {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error','You need to logged in to do that!!!');
    res.redirect('/login');
}
module.exports = middlewareObj;