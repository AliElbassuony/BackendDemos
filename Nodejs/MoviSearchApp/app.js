const app = require('express')();
const request = require('request');

app.set('view engine','ejs');
app.get('/', (req, res) => {
    res.render('search');
});

app.get('/result', (req, res) => {
    var query = req.query.search;
    var url = 'https://jsonplaceholder.typicode.com/'+ query;
    request(url,(err,response,body)=>{
        if(!err && response.statusCode == 200){
            var parsed = JSON.parse(body);
            res.render('results',{data:parsed});
        }
    })
});

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});