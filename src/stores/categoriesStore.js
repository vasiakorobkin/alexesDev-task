var categoriesActions = require('../actions/categoriesActions');
var ActionStores = require('tuxx/Stores/ActionStores');
var getBaseStoreSettings = require('./helpers/getBaseStoreSettings');

var categoriesStore = ActionStores.createStore(getBaseStoreSettings('categories'));

module.exports = categoriesStore;
