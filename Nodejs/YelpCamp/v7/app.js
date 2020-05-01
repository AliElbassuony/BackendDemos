const express               = require('express'),
      app                   = express(),
      bodyParser            = require('body-parser'),
      mongoose              = require('mongoose'),
      passport              = require('passport'),
      methodOverride        = require('method-override'),
      LocalStrategy         = require('passport-local'),
      Campground            = require('./models/campground'),
      Comment               = require('./models/comment'),
      seedDB                = require('./seeds'); 
      passportLocalMongoose = require('passport-local-mongoose'),
      User                  = require('./models/user'),
      flash                 = require('connect-flash');

const commentRoutes = require('./routes/comments'),
     campgroundRoutes = require('./routes/campgrounds'),
     indexRoutes = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/yelp_camp_v7',{useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false});
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));      
app.use(methodOverride('_method'));
app.use(flash());
// seedDB();
//Passport Configration
app.use(require('express-session')({
    secret :'LOL LOL LOL',
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Build currentuser in all Routes
app.use((req,res,next)=>{
    res.locals.curUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');

    next();
});
app.use(indexRoutes);
app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);
app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});