const router     = require('express').Router(),
      passport   = require('passport'),
      User       = require('../models/user'),
      middleware = require('../middleware');


router.get('/', (req, res) => {
    res.render('landing');
});

//================
//AUTH ROUTES
//================
//Register Form
router.get('/register', (req, res) => {
    res.render('register');
});
router.post('/register', (req, res) => {
    var newUser = new User ({username:req.body.username}),
        pass = req.body.password;
    User.register( newUser,pass,(err,user)=>{
        if(err)
        {
            req.flash("error",err.message);
            return res.redirect('back');
        }
        passport.authenticate('local')(req,res,()=>{
            req.flash('success','Welcome to YelpCamp ' + user.username);
            res.redirect('/campgrounds');
        })
    })
});
// Login Auth
router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login',passport.authenticate('local',{
    successRedirect:'/campgrounds',
    failureRedirect:'/login'
}) ,(req, res) => {
    
});
// Logout Auth
 router.get('/logout', (req, res) => {

     req.logout();
     req.flash('success','Logged you Out!!!');
     res.redirect('/campgrounds');
 });

 module.exports = router;