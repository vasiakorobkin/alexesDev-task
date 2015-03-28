var React = require('tuxx/React');
var CategoriesList = require('./CategoriesList.jsx');
var ProductsList = require('./ProductsList.jsx');
var categoriesStore = require('../stores/categoriesStore');
var categoriesActions = require('../actions/categoriesActions');

var CategoryInner = React.createOwnerClass({
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
  registerOwnerProps: function(){},
  connectOwnerToStore: function(){
    return {
      store: categoriesStore,
      listener: function(){
        this.setState({ categories: categoriesStore.returnAll() });
      }.bind(this)
    }
  },
  render: function(){
    var id = this.props.params.id;
    var categories = this.state.categories;
    var current = categories.filter(function(category){
      return category.id == id;
    });
    if(current.length == 0) return (
      <div className='red'>Не удалось найти категорию</div>
    ); 
    if(current.length > 1) return (
      <div className='red'>Ошибка: идентификатор не уникален</div>
    );
    var children = categories.filter(function(category){
      return category.parentId == id
    });
    if(children.length > 0) return (
      <CategoriesList parentId={id} />
    );
    else return (
      <ProductsList category={id} />
    )
  }
});

module.exports = CategoryInner;
