var React = require('tuxx/React');
var CategoriesList = require('./CategoriesList.jsx');
var ProductsList = require('./ProductsList.jsx');
var categoriesStore = require('../stores/categoriesStore');
var categoriesActions = require('../actions/categoriesActions');

var CategoryInner = React.createOwnerClass({
  getInitialState: function(){
    categoriesActions.getAll();
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
    var id = this.props.params.id;
    var categories = this.state.categories;
    var current = categories.filter(function(category){
      return category.id == id;
    });
    if(current.length == 0) return (
      <div>Не удалось найти категорию</div>
    ); 
    if(current.length > 1) return (
      <div>Ошибка: идентификатор не уникален</div>
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
