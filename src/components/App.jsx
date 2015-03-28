var React = require('tuxx/React');
var RouteHandler = require('tuxx/Router/RouteHandler');
var Link = require('tuxx/Router/Link');
    
var App = React.createClass({
  render: function(){
    var color = 'green';
    var text = 'Онлайн';
    return (
      <div>
        <header>
          <Link className={'indicator ' + color} to='/'>{text}</Link>
        </header>
        <RouteHandler {...this.props}/>
      </div>
    )
  }
});

module.exports = App;
