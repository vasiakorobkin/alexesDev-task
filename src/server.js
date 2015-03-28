var express = require('express');
var path = require('path');
var app = express();

function productCount(){
  return Math.round(Math.random() * 10 + 1);
}

function times(n, callback){
  var list = [];

  for(var i = 0; i < n; ++i)
    list.push(callback(i));

  return list;
}

var categories = [
  { id: 1, parentId: null, title: 'Молоко.Яйца' },
  { id: 2, parentId: 1, title: 'Коровье молоко' },
  { id: 3, parentId: 1, title: 'Козье молоко' },
  { id: 4, parentId: 1, title: 'Яйца' },
  { id: 5, parentId: 1, title: 'Сыры' },
  { id: 6, parentId: null, title: 'Мясо.Птица' },
  { id: 7, parentId: 6, title: 'Говядина' },
  { id: 8, parentId: 6, title: 'Баранина' },
  { id: 9, parentId: 6, title: 'Птица' }
];

var nextProductId = 1;
var products = categories.map(function(category){
  if(category.parentId)
    return times(productCount(), function(i){ return {
      id: nextProductId++,
      categoryId: category.id,
      title: category.title + ' #' + i
    } });
  else
    return [];
});

app.get('/categories', function(req, res){
  res.json(categories);
});

app.get('/products', function(req, res){
  res.json(products);
});

app.use("/manifest.cache", function(req, res){
	res.header("Content-Type", "text/cache-manifest");
	res.sendFile(path.join(__dirname, '../build/manifest.cache'));
});
app.use(express.static(path.join(__dirname, '../build')));
app.use(function(req, res){
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

var SERVER_PORT = 3030;
app.listen(SERVER_PORT , function(){
  console.log(('Server starting at port $$...').replace('$$', SERVER_PORT));
});
