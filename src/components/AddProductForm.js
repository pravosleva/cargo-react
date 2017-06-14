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
        <hr />
        <strong>AddProductForm</strong><br />
        <label>Name</label>
        <input onChange={this.props.updateProductFormState.bind(this, 'name')} value={this.props.productFormState.name}></input>

        <button onClick={this.saveProduct}>[ Save Product ]</button>
        <hr />
      </div>
    );
  }
}

export default AddProductForm;
