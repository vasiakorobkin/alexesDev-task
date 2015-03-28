var React = require('tuxx/React');
var run = require('tuxx/Router/run');
var HistoryLocation = require('tuxx/Router/HistoryLocation');
var Route = require('tuxx/Router/Route');
var Redirect = require('tuxx/Router/Redirect');
var App = require('./components/App.jsx');
var CategoriesList = require('./components/CategoriesList.jsx');
var CategoryInner = require('./components/CategoryInner.jsx');
var OnlineOnlyPage = require('./components/OnlineOnlyPage.jsx');

var routes = (
  <Route handler={App}>
    <Redirect from="/" to="/catalog" />
    <Route path='/catalog' handler={CategoriesList} />
    <Route path='/category/:id' handler={CategoryInner} />
    <Route path='/online/page1' handler={OnlineOnlyPage} />
    <Route path='/online/page2' handler={OnlineOnlyPage} />
  </Route>
);

run(routes, HistoryLocation, function(Handler, state) {
  var params = state.params;
  React.render(<Handler params={params}/>, document.getElementById('app'));
});
