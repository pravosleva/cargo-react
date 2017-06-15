import React, { Component } from 'react';
import Button from './Button';
//css..
import AddProductForm from './AddProductForm';
import ProductList from './ProductList';

class Cargo extends Component {
  constructor(props){
    super(props);
    this.state = {
      addProductFormOpened: true,
      productFormState: {name: ''},
      productList: []
    };
    this.updateProductFormState = this.updateProductFormState.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.addProductFormToggler = this.addProductFormToggler.bind(this);
  }
  saveProduct(obj) {
    let _getUUID = () => {
      let newUUID = ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      }));
      return newUUID;
    };

    let productList = this.state.productList;
    obj.id = _getUUID();
    productList.push(obj);
    this.setState({ productList });
    this.updateProductFormState('clearForm');
    this.addProductFormToggler(false)
  }
  removeProduct(id) {
    let productList = this.state.productList.filter( (e, i) => e.id !== id );
    this.setState({ productList });
  }
  updateProductFormState(propName, e) {
    switch(propName){
      case 'name': this.setState({productFormState: {name: e.target.value}}); break;
      case 'clearForm': this.setState({productFormState: {name: ''}}); break;
      default: break;
    }
  }
  editProduct(id) {
    this.addProductFormToggler(true);
    let productToEdit = this.state.productList.filter( (e, i) => e.id === id )[0];
    this.setState({ productFormState: {name: productToEdit.name} });
    this.removeProduct(id);
  }
  addProductFormToggler(is_it_should_be_opened) {
    switch(is_it_should_be_opened){
      case true: this.setState({ addProductFormOpened: is_it_should_be_opened }); break;
      case false:
        this.setState({ addProductFormOpened: is_it_should_be_opened });
        this.updateProductFormState('clearForm');// clear always when the form should be closed manually
        break;
      default: this.setState({ addProductFormOpened: !this.state.addProductFormOpened });
    }
  }
  render() {
    return (
      <div>
        {/*<h3>Cargo</h3>*/}
        <span>Product list for the Container group.</span>

        <div className='text-right' style={{marginBottom:'5px'}}>
          <div className='btn-group' role='group'>
            <Button handlerClick={ this.addProductFormToggler.bind(this, true) } iclassName='fa fa-plus' tmp={'[ Add Product ]'} />
            <Button handlerClick={ this.addProductFormToggler.bind(this, false) } iclassName='fa fa-close' />
          </div>
        </div>

        <AddProductForm
          addProductFormToggler={this.addProductFormToggler}
          display={this.state.addProductFormOpened ? 'block' : 'none'}
          productFormState={this.state.productFormState}
          updateProductFormState={this.updateProductFormState}
          saveProduct={this.saveProduct} />
        <ProductList
          productList={this.state.productList} removeProduct={this.removeProduct} editProduct={this.editProduct} />

      </div>
    );
  }
}

export default Cargo;
