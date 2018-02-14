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
      productFormState: { name: '', length: '', width: '', height: '', weight: '', comment: '', addSize: '' },
      
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

    if(!obj.name || !obj.length || !obj.width || !obj.height || !obj.weight || !obj.addSize){
      show({ text: 'Some inputs are required! Please, check the input form', pos: 'bottom-right', customClass: 'snackbar-danger', duration: 5000 });
      return;
    }else{
      // --- Need to check that will the product fit in a container. If it is true then continue, else return.
      // First of all we have to detect max dimensions of the Container and max weight that it can to accept.
      let maxLength = this.props.containerGroupList.find(function(e){return e.id===this.props.containerId}, this).length,
        maxWidth = this.props.containerGroupList.find(function(e){return e.id===this.props.containerId}, this).width,
        maxHeigth = this.props.containerGroupList.find(function(e){return e.id===this.props.containerId}, this).height,
        maxWeigth = this.props.containerGroupList.find(function(e){return e.id===this.props.containerId}, this).carrying;
      // Then we have to check the product parameters before add it to productList:
      let conditional_length, conditional_width;
      if(obj.length > obj.width){
        conditional_length = (obj.length + obj.addSize);
        conditional_width = (obj.width + obj.addSize);
      }else{
        conditional_length = (obj.width + obj.addSize);
        conditional_width = (obj.length + obj.addSize);
      }
      let flag = true, err_msg = '';
      if(conditional_length > maxLength){ err_msg = `The most cond. dimention (with addSize = ${obj.addSize} mm) is more than maxLength: ${conditional_length} > ${maxLength} mm! Check it please.`; flag = false; }
      if(conditional_width > maxWidth){ err_msg = `The smallest cond. dimention (with addSize = ${obj.addSize} mm) is more than maxWidth: ${conditional_width} > ${maxWidth} mm! Check it please.`; flag = false; }
      if(obj.height > maxHeigth){ err_msg = `Height is more than maxHeigth: ${obj.height} > ${maxHeigth} mm! Check it please.`; flag = false; }
      if(obj.weight > maxWeigth){ err_msg = `Weight is more than maxWeigth: ${obj.weight} > ${maxWeigth} kg! Check it please.`; flag = false; }
      if(flag===false){
        show({ text: err_msg, pos: 'bottom-right', customClass: 'snackbar-danger', duration: 20000 }); return;
      }
      // --- Checked.
      // If was not return that's Ok, we are continue:
      obj.id = _getUUID();
      let productList = this.props.productList;
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
  updateProductFormState(propName, e) { // SHOULD BE REFACTORED!
    let name = this.state.productFormState.name,
      length = this.state.productFormState.length,
      width = this.state.productFormState.width,
      height = this.state.productFormState.height,
      weight = this.state.productFormState.weight,
      comment = this.state.productFormState.comment,
      addSize = this.state.productFormState.addSize;
    let _getNumericValue = (val) => { return (val!=="" && !isNaN(val)) ? Number(val) : "" };
    switch(propName){
      case 'name': this.setState({productFormState: {name: e.target.value, length, width, height, weight, comment, addSize}}); break;
      case 'length':
        if(!isNaN(e.target.value)){
          this.setState({productFormState: {name, length: _getNumericValue(e.target.value), width, height, weight, comment, addSize}});
        }else{};
        break;
      case 'width':
        if(!isNaN(e.target.value)){
          this.setState({productFormState: {name, length, width: _getNumericValue(e.target.value), height, weight, comment, addSize}});
        }else{};
        break;
      case 'height':
        if(!isNaN(e.target.value)){
          this.setState({productFormState: {name, length, width, height: _getNumericValue(e.target.value), weight, comment, addSize}});
        }else{};
        break;
      case 'weight':
        if(!isNaN(e.target.value)){
          this.setState({productFormState: {name, length, width, height, weight: _getNumericValue(e.target.value), comment, addSize}});
        }else{};
        break;
      case 'comment': this.setState({productFormState: {name, length, width, height, weight, comment: e.target.value, addSize}}); break;
      case 'addSize': this.setState({productFormState: {name, length, width, height, weight, comment, addSize: _getNumericValue(e.target.value)}}); break;
      case 'clearForm': this.setState({productFormState: {name: '', length: '', width: '', height: '', weight: '', comment: '', addSize: ''}}); break;
      default: break;
    }
  }
  editProduct(id) {
    this.addProductFormToggler(true);
    let productToEdit = this.props.productList.filter( (e, i) => e.id === id )[0];
    this.setState({ productFormState: {name: productToEdit.name, length: productToEdit.length, width: productToEdit.width, height: productToEdit.height, weight: productToEdit.weight, comment: productToEdit.comment, addSize: productToEdit.addSize} });
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
        <strong>Cargo Section</strong><br />
        <span>ProductList for the Container Group.</span>

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
