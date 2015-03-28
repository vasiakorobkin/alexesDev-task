var React = require('tuxx/React');
var RouteHandler = require('tuxx/Router/RouteHandler');
var Link = require('tuxx/Router/Link');
    
var App = React.createClass({
  render: function(){
    var text = window.siteDoesAvailable ? 'Онлайн' : 'Оффлайн'
    var color = window.siteDoesAvailable ? 'green' : 'red'
    return (
      <div>
        <header>
          <Link className={'indicator ' + color} to='/'>{text}</Link>
          <Link className="online-only" to='/online/page1'>/online/page1</Link>
          <Link className="online-only" to='/online/page2'>/online/page2</Link>
        </header>
        <RouteHandler {...this.props}/>
      </div>
    )
  }
});

module.exports = App;
