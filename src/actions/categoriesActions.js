var CATEGORYCRUDURL = "/categories";

var Actions = require('tuxx/Actions');
var ajaxHttpOrLocalStorage = require('./helpers/ajax').httpOrLocalStorage;

var categoriesActions = Actions.createActionCategory({
  category: 'categories',
  source: 'categories_view',
  actions: ['getAll']
});

categoriesActions.before('getAll', function(dispatch, actionBody){
  ajaxHttpOrLocalStorage({
    url: CATEGORYCRUDURL,
    callback: dispatch
  });
})

module.exports = categoriesActions;
