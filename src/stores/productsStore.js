var productsActions = require('../actions/productsActions.js');
var ActionStores = require('tuxx/Stores/ActionStores');

var productsStore = ActionStores.createStore({
  _products: [],
  returnAll: function(){
    return this._products;
  },
  getAllHandler: function(data){
    this._products = data;
    this.emitChange();
  },
  register: function(){
    return {
      products: {
        getAll: this.getAllHandler
      }
    }
  }
});
module.exports = productsStore;
