var React = require('tuxx/React');
var Link = require('tuxx/Router/Link');
var categoriesStore = require('../stores/categoriesStore');
var categoriesActions = require('../actions/categoriesActions');

var CategoriesList = React.createOwnerClass({
  statics: {
    willTransitionTo: function(){
      categoriesActions.getAll();
    }
  },
  getInitialState: function(){
    return {
      categories: categoriesStore.returnAll(),
    }
  },
  connectOwnerToStore: function(){
    return {
      store: categoriesStore,
      listener: function(){
        this.setState({ categories: categoriesStore.returnAll() });
      }.bind(this)
    }
  },
  registerOwnerProps: function(){},
  render: function(){
    var id = this.props.parentId;
    var categories;
    if(!!id){
      categories = this.state.categories.filter(function(category){
        return category.parentId == id;
      });
    } else {
      categories = this.state.categories;
    }
    var categoriesLinks = categories.map(function(category){
      return (
        <div className='text-item' key={category.id}><Link to={'/category/' + category.id}>{category.title}</Link></div>
      );
    });
    return (
      <div className='text-list'>{categoriesLinks}</div>
    )
  }
});

module.exports = CategoriesList;
