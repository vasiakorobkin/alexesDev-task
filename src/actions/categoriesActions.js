var CATEGORYCRUDURL = "/categories";

var Actions = require('tuxx/Actions');
var request = require('superagent');

var categoriesActions = Actions.createActionCategory({
  category: 'categories',
  source: 'categories_view',
  actions: ['getAll']
});

categoriesActions.before('getAll', function(dispatch, actionBody){
  request.get(CATEGORYCRUDURL, function(err, res){
    if(err){
      console.log(err);
    } else {
      if(!!window.localStorage) window.localStorage.setItem('categories', res.text);
      dispatch(res.body);
    }
  });
})

module.exports = categoriesActions;
