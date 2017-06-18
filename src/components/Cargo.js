import React, { Component } from 'react';
import Button from './Button';
//css..
import AddProductForm from './AddProductForm';
import ProductList from './ProductList';

// require css for your app's bundle process
import '../../node_modules/js-snackbar/dist/snackbar.css';
import '../css/snackbar-custom.css';
// import the show function
import { show } from 'js-snackbar';

class Cargo extends Component {
  constructor(props){
    super(props);
    this.state = {
      addProductFormOpened: false,
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

    if(obj.name===`` || obj.length===`` || obj.width===`` || obj.height===`` || obj.weight===``){
      show({ text: 'Some inputs are required! Please, check the input form', pos: 'top-right', customClass: 'snackbar-danger', duration: 5000 });
      return;
    }else{
      let productList = this.props.productList;
      obj.id = _getUUID();

      //obj.length = _getNumericValue(obj.length);
      //..

      productList.push(obj);
      this.updateProductFormState('clearForm');
      this.addProductFormToggler(false);

      this._updateProductListForContainerGroup(productList);
    }
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
    let _getNumericValue = (val) => { return (val!=="" && !isNaN(val)) ? Number(val) : "" };
    switch(propName){
      case 'name': this.setState({productFormState: {name: e.target.value, length, width, height, weight, comment}}); break;
      case 'length':
        if(!isNaN(e.target.value)){
          this.setState({productFormState: {name, length: _getNumericValue(e.target.value), width, height, weight, comment}});
        }else{};
        break;
      case 'width':
        if(!isNaN(e.target.value)){
          this.setState({productFormState: {name, length, width: _getNumericValue(e.target.value), height, weight, comment}});
        }else{};
        break;
      case 'height':
        if(!isNaN(e.target.value)){
          this.setState({productFormState: {name, length, width, height: _getNumericValue(e.target.value), weight, comment}});
        }else{};
        break;
      case 'weight':
        if(!isNaN(e.target.value)){
          this.setState({productFormState: {name, length, width, height, weight: _getNumericValue(e.target.value), comment}});
        }else{};
        break;
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
