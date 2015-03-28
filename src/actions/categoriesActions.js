var CATEGORYCRUDURL = "/categories";

var Actions = require('tuxx/Actions');
var request = require('superagent');

var categoriesActions = Actions.createActionCategory({
  category: 'categories',
  source: 'categories_view',
  actions: ['getAll']
});

categoriesActions.before('getAll', function(dispatch, actionBody){
  if(window.siteDoesAvailable){
    request.get(CATEGORYCRUDURL, function(err, res){
      if(err){
        console.log(err);
        getFromLocalStorage();
      } else {
        if(!!window.localStorage) window.localStorage.setItem('categories', res.text);
        dispatch(res.body);
      }
    });
  } else {
    getFromLocalStorage();
  }
  function getFromLocalStorage(){
    if(!!window.localStorage){
      var categories;
      var categoriesJSON = window.localStorage.getItem('categories');
      try {
        categories = JSON.parse(categoriesJSON);
      } catch (e) {
        console.log(e);
        categories = {};
      }
      dispatch(categories);
    }
  }
})

module.exports = categoriesActions;
