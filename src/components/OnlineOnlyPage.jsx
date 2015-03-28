var React = require('tuxx/React');

var OnlineOnlyPage = React.createClass({
  render: function(){
    var text = (window.siteDoesAvailable) ? 'Содержимое страницы, видимое только из онлайна' : 'Для просмотра данной страницы необходимо перейти в онлайн';
    var color = (window.siteDoesAvailable) ? 'green' : 'red';
    return (
      <div className={'center-big-text ' + color}>{text}</div>
    )
  }
});

module.exports = OnlineOnlyPage;
