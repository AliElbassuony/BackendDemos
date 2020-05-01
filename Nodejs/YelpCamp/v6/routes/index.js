const router   = require('express').Router(),
      passport = require('passport'),
      User     = require('../models/user');


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
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req,res,()=>{
            res.redirect('/login');
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
     res.redirect('/campgrounds');
 });

// Middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

 module.exports = router;