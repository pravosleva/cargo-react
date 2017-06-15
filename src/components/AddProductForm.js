import React, { Component } from 'react';
import Button from './Button';
//css..

class AddProductForm extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.saveProduct = this.saveProduct.bind(this);
  }
  saveProduct(){
    let name = this.props.productFormState.name;
    //..
    this.props.saveProduct({name});
  }
  render() {
    return (
      <div style={{display: this.props.display}}>
        <div className='well well-sm'>
          <h4>AddProductForm</h4>
          <label>Name</label>
          <input onChange={this.props.updateProductFormState.bind(this, 'name')} value={this.props.productFormState.name}></input>

          <div className='text-right'>
            <Button handlerClick={this.saveProduct} iclassName='fa fa-plus' tmp='[ Save Product ]' bsBtnClassName={`btn-primary`}></Button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddProductForm;
