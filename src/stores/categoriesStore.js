var categoriesActions = require('../actions/categoriesActions.js');
var ActionStores = require('tuxx/Stores/ActionStores');

var categoriesStore = ActionStores.createStore({
  _categories: [],
  returnAll: function(){
    return this._categories;
  },
  getAllHandler: function(data){
    this._categories = data;
    this.emitChange();
  },
  register: function(){
    return {
      categories: {
        getAll: this.getAllHandler
      }
    }
  }
});
module.exports = categoriesStore;
