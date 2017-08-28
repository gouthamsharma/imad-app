
var path = require('path');
var Pool=require('pg').Pool;
var express = require('express');
var morgan = require('morgan');
var app=express();
var crypto = require('crypto');
var bodyparser=require('body-parser');


var config={
  user: 'gouthamsharma',
  database: 'gouthamsharma',
  host: 'db.imad.hasura-app.io',
  port:'5432',
  password: process.env.DB_PASSWORD
    
};


app.use(morgan('combined'));
app.use(bodyparser.json());


var content={
    title: 'Goutham',
    heading:'Header',
    content:`<p>Everything's fair in love.but,it sucks too!!</p>`
};

function template(data)
{
    var title=data.title;
    var heading=data.heading;
    var content=data.content;
    var template=`
    <html>
    <head>
    <title>${title}</title>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <link href="ui/style.css" rel="stylesheet">
    
    </head>
    <div>
    <h1>${heading}</h1>
    <h4>${content}</h4>
    </div>
    <html>
    `;
    return template;
}

function hash(input,salt)
{
    var hashed=crypto.pbkdf2Sync(input, salt, 100000, 512, 'sha512');
    return hashed.toString('hex');
}

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var pool = new Pool(config);
app.get('/dbtest-url', function (req, res) {
  
  pool.query('select * from category',function(err,result){
     if(err)
     {
         res.status(500).send(err.toString());
     }
     else
     {
         res.send(JSON.stringify(result));
     }
      
  });
});

app.post('/newuser',function(req,res){
   var username=req.body.username;
   var password=req.body.password;
   var salt=crypo.randomBytes(128).toString('hex');
   var passwordindb=hash(password,salt);
   pool.query('insert into hashing user (username,password) values ($1,$2)',[username,passwordindb],function(err,result){
     if(err)
     {
         res.status(500).send(err.toString());
     }
     else
     {
         res.send(JSON.stringify(result));
     }
   });

});

app.get('/article1', function (req, res) {
  res.send(template(content));
});

app.get('/article_2', function (req, res) {
  res.send('Article 2 served!');
});

var counter=0;
app.get('/counter', function (req, res) {
  counter= counter + 1;
  res.send(counter.toString());
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/hash/:input',function(req,res){
   var hashString = hash(req.params.input,'sample-salt-string');
   res.send(hashString);
   //return hashString.toString('hex');
    
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
