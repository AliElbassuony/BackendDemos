const router     = require('express').Router({mergeParams:true}),
      Campground = require('../models/campground'),
      Comment    = require('../models/comment'),
      middleware = require('../middleware');
// Get form of add New Comment 
router.get('/new',middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id,(err, campground)=>{
        if(err)
        {
            console.log(err);
        } else {
            res.render('comments/new',{camp:campground});
        }
    });
});
router.post('/',middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id,(err,camp)=>{
            if(err){
                console.log(err);
                redirect('/campground');
            } else {
                Comment.create(req.body.comment,(err,comment)=>{
                    if(err){
                        console.log(err);
                    } else{
                        comment.author.id = req.user._id;
                        comment.author.username = req.user.username;
                        comment.save();
                        camp.comments.push(comment);
                        camp.save();
                        
                        res.redirect('/campgrounds/' + camp._id);
                    }
                })
            }
    });
});
// Edit Comment
router.get('/:comment_id/edit', (req, res) => {
    Comment.findById(req.params.comment_id,checkCommentOwnership,(err,foundComment)=>{
        if(err){
            res.redirect('back'); 
        }else{
            res.render('comments/edit',{camp_id:req.params.id,comment:foundComment});
        }
    });
});
// Update Comment
router.put('/:comment_id', middleware.checkCommentOwnership,(req, res) => {
        Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,(err,foundComment)=>{
            if(err){
                res.redirect('back');
            } else {
                res.redirect('/campgrounds/' + req.params.id);
            }
        });
});
//Delete Comment
router.delete('/:comment_id',middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id,(err)=>{
        if(err){
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id);   
        }
    })
});

module.exports = router;