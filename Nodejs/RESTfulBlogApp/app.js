const bodyParser = require('body-parser'),
expressSanitizer = require('express-sanitizer'),
methodOverride   = require('method-override'),
      mongoose   = require('mongoose'),
      express    = require('express'),
      app        = express();
 
// Set Tools
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride('_method'));

mongoose.connect(
'mongodb://localhost:27017/restful_blog_app',
 {useNewUrlParser: true,useCreateIndex: true,useUnifiedTopology: true,useFindAndModify: false}
 );
// Create Schema
var bolgSchema = new mongoose.Schema({
        image : String,
        title : String,
        body  : String,
        created : {type:Date,default:Date.now} 
});
// Create Model
var Blog = mongoose.model('Blog',bolgSchema);
// Create Routing
app.get('/', (req, res) => {
    res.redirect('/blogs');
});
app.get('/blogs', (req, res) => {
    Blog.find({},(err,blogs)=>{
        if(err){
            console.log("Error!!!");
        }else{
        res.render('index',{blogs:blogs});
    }
    })
});
app.get('/blogs/new', (req, res) => {
    res.render('new');
});
// Make new blog with Form
app.post('/blogs', (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog,(err,newBlog)=>{
        if(err){
            res.render('new');
        }else{
            res.redirect('/blogs');
        }
    });
});
app.get('/blogs/:id', (req, res) => {
    Blog.findById(req.params.id ,(err,oneBlog)=>{
        if(err){
            res.redirect('/blogs');
        }else{
            res.render('show',{blog:oneBlog});
        }
    })
});
app.get('/blogs/:id/edit', (req, res) => {
    Blog.findById(req.params.id ,(err,editBlog)=>{
        if(err){
            res.redirect('/blogs');
        }else{
            res.render('edit',{blog:editBlog});
        }
    })
});
app.put('/blogs/:id', (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,(err,updatedBlog)=>{
        if(err)
        {
            res.redirect('/blogs');
        }else{
            res.redirect('/blogs/' + req.params.id);
        }
    })
});
// Delete Route
app.delete('/blogs/:id', (req, res) => {
    //Destroy Blog
    Blog.findByIdAndDelete(req.params.id,(err)=>{
        if(err){
           res.redirect('/blogs');
        }else{
            res.redirect('/blogs');
        }
    })
});

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});