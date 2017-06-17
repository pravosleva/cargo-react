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
      productFormState: {name: '', length: '', width: '', height: '', weight: '', comment: ''}
    };
    this.updateProductFormState = this.updateProductFormState.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.addProductFormToggler = this.addProductFormToggler.bind(this);
    this._updateProductListForContainerGroup = this._updateProductListForContainerGroup.bind(this);
  }
  _updateProductListForContainerGroup(productList) {
    this.props.updateProductListForContainerGroup({productList, containerId:this.props.containerId})
  }
  saveProduct(obj) {
    let _getUUID = () => {
      let newUUID = ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      }));
      return newUUID;
    };

    let productList = this.props.productList;
    obj.id = _getUUID();
    productList.push(obj);
    this.updateProductFormState('clearForm');
    this.addProductFormToggler(false);

    this._updateProductListForContainerGroup(productList);
  }
  removeProduct(id) {
    let productList = this.props.productList.filter( (e, i) => e.id !== id );
    this.setState({ productList });

    this._updateProductListForContainerGroup(productList);
  }
  updateProductFormState(propName, e) {
    let name = this.state.productFormState.name,
      length = this.state.productFormState.length,
      width = this.state.productFormState.width,
      height = this.state.productFormState.height,
      weight = this.state.productFormState.weight,
      comment = this.state.productFormState.comment;
    switch(propName){
      case 'name': this.setState({productFormState: {name: e.target.value, length, width, height, weight, comment}}); break;
      case 'length': this.setState({productFormState: {name, length: e.target.value, width, height, weight, comment}}); break;
      case 'width': this.setState({productFormState: {name, length, width: e.target.value, height, weight, comment}}); break;
      case 'height': this.setState({productFormState: {name, length, width, height: e.target.value, weight, comment}}); break;
      case 'weight': this.setState({productFormState: {name, length, width, height, weight: e.target.value, comment}}); break;
      case 'comment': this.setState({productFormState: {name, length, width, height, weight, comment: e.target.value}}); break;
      case 'clearForm': this.setState({productFormState: {name: '', length: '', width: '', height: '', weight: '', comment: ''}}); break;
      default: break;
    }
  }
  editProduct(id) {
    this.addProductFormToggler(true);
    let productToEdit = this.props.productList.filter( (e, i) => e.id === id )[0];
    this.setState({ productFormState: {name: productToEdit.name, length: productToEdit.length, width: productToEdit.width, height: productToEdit.height, weight: productToEdit.weight, comment: productToEdit.comment} });
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

        <strong>Cargo</strong><br />
        <span>Product list for the Container group.</span>

        <div className='text-center' style={{marginBottom:'5px'}}>
          <Button handlerClick={ this.addProductFormToggler.bind(this, true) } iclassName='fa fa-plus' tmp={'[ Add Product ]'} />
        </div>

        <AddProductForm
          addProductFormToggler={this.addProductFormToggler}
          display={this.state.addProductFormOpened ? 'block' : 'none'}
          productFormState={this.state.productFormState}
          updateProductFormState={this.updateProductFormState}
          saveProduct={this.saveProduct} />
        <ProductList
          productList={this.props.productList}
          removeProduct={this.removeProduct}
          editProduct={this.editProduct} />

      </div>
    );
  }
}

export default Cargo;
