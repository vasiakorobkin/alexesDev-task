var React = require('tuxx/React');
var run = require('tuxx/Router/run');
var HistoryLocation = require('tuxx/Router/HistoryLocation');
var Route = require('tuxx/Router/Route');
var DefaultRoute = require('tuxx/Router/DefaultRoute');
var App = require('./components/App.jsx');
var CategoriesList = require('./components/CategoriesList.jsx');
var CategoryInner = require('./components/CategoryInner.jsx');

var routes = (
  <Route handler={App}>
    <DefaultRoute name='catalog' handler={CategoriesList} />
    <Route path='/category/:id' handler={CategoryInner} />
  </Route>
);

run(routes, HistoryLocation, function(Handler, state) {
  var params = state.params;
  React.render(<Handler params={params}/>, document.getElementById('app'));
});
