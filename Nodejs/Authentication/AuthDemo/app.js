const express               = require('express'),
      app                   = express(),
      mongoose              = require('mongoose'),
      bodyParser            = require('body-parser'),
      User                  = require('./models/user'),
      passport              = require('passport'),
      LocalStrategy         = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect(
'mongodb://localhost:27017/auth_demo_app'
, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true,}));
app.use(require('express-session')({
    secret : 'LOL LOL LOL',
    resave : false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
    res.render('home');
});
app.get('/secret', (req, res) => {
    res.render('secret');
});
app.get('/register', (req, res) => {
    res.render('register');
});
app.post('/register', (req, res) => {
    req.body.username
    req.body.password
    User.register(new User ({username:req.body.username}),req.body.password, (err,user)=>{
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req,res,()=>{
            res.redirect('secret');
        });
    })
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.post('/login',passport.authenticate('local',{
    successRedirect:'/secret',
    failureRedirect:'/login'
}), (req, res) => {
    
});
app.listen(3000, () => {
    console.log(`Server started on port`);
});