var PRODUCTCRUDURL = "/products";

var Actions = require('tuxx/Actions');
var httpOrLocalStorage = require('./helpers/ajax').httpOrLocalStorage;

var productsActions = Actions.createActionCategory({
  category: 'products',
  source: 'products_view',
  actions: ['getAll']
});

productsActions.before('getAll', function(dispatch, actionBody){
  httpOrLocalStorage({
    url: PRODUCTCRUDURL,
    callback: dispatch
  });
});

module.exports = productsActions;
