var productsActions = require('../actions/productsActions');
var ActionStores = require('tuxx/Stores/ActionStores');
var getBaseStoreSettings = require('./helpers/getBaseStoreSettings');

var productsStore = ActionStores.createStore(getBaseStoreSettings('products'));

module.exports = productsStore;
