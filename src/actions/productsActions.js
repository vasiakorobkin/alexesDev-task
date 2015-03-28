var PRODUCTCRUDURL = "/products";

var Actions = require('tuxx/Actions');
var request = require('superagent');

var productsActions = Actions.createActionCategory({
  category: 'products',
  source: 'products_view',
  actions: ['getAll']
});

productsActions.before('getAll', function(dispatch, actionBody){
  request.get(PRODUCTCRUDURL, function(err, res){
    if(err){
      console.log(err);
    } else {
      if(!!window.localStorage) window.localStorage.setItem('products', res.text);
      dispatch(res.body);
    }
  });
});

module.exports = productsActions;
