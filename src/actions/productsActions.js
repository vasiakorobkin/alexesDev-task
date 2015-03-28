var PRODUCTCRUDURL = "/products";

var Actions = require('tuxx/Actions');
var request = require('superagent');

var productsActions = Actions.createActionCategory({
  category: 'products',
  source: 'products_view',
  actions: ['getAll']
});

productsActions.before('getAll', function(dispatch, actionBody){
  if(window.siteDoesAvailable){
    request.get(PRODUCTCRUDURL, function(err, res){
      if(err){
        console.log(err);
        getFromLocalStorage();
      } else {
        if(!!window.localStorage) window.localStorage.setItem('products', res.text);
        dispatch(res.body);
      }
    });
  } else {
    getFromLocalStorage();
  }
  function getFromLocalStorage(){
    if(!!window.localStorage){
    var products;
    var productsJSON = window.localStorage.getItem('products');
    try {
        products = JSON.parse(productsJSON);
    } catch (e) {
        console.log(e);
        products = {};
    }
    console.log(products);
    dispatch(products);
    }
  }
});

module.exports = productsActions;
