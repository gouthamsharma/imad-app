var express = require('express');
var morgan = require('morgan');
var path = require('path');

var content={
    title: 'Goutham',
    heading:'Header',
    content:`<p>Everything's fair in love.but,it sucks</p>`
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

app.get('/article1', function (req, res) {
  res.send(template(content));
});

app.get('/article_2', function (req, res) {
  res.send('Article 2 served!');
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
