var React = require('tuxx/React');
var productsStore = require('../stores/productsStore');
var productsActions = require('../actions/productsActions');

var ProductsList = React.createOwnerClass({
  getInitialState: function(){
    productsActions.getAll();
    return {
      products: productsStore.returnAll()
    }
  },
  connectOwnerToStore: function(){
    return {
      store: productsStore,
      listener: function(){
        this.setState({ products: productsStore.returnAll() });
      }.bind(this)
    }
  },
  registerOwnerProps: function(){},
  render: function(){
    var categoryId = this.props.category;
    var products = this.state.products;
    var productsElements;
    products.forEach(function(category){
      if(category.length == 0 || !Array.isArray(category)) return;
      if(category[0].categoryId == categoryId) productsElements = category.map(function(product){
        return (
          <div className='text-item' key={product.id}>{product.title}</div>
        )
      })
    });
    return (
      <div className='text-list'>{productsElements}</div>
    )
  }
});

module.exports = ProductsList;
