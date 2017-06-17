import React, { Component } from 'react';
import Button from './Button';
//css..

class AddProductForm extends Component {
  constructor(props){
    super(props);
    this.saveProduct = this.saveProduct.bind(this);
  }
  saveProduct(){
    let name = this.props.productFormState.name,
      length = this.props.productFormState.length,
      width = this.props.productFormState.width,
      height = this.props.productFormState.height,
      weight = this.props.productFormState.weight;
    //..
    this.props.saveProduct({name, length, width, height, weight});
  }
  render() {
    return (
      <div className='panel panel-default' style={{display: this.props.display}}>

        <div className='panel-heading'>AddProductForm</div>
        <div className='panel-body'>
          <label>Name</label>
          <input className='form-control input-sm'  onChange={this.props.updateProductFormState.bind(this, 'name')} value={this.props.productFormState.name}></input>
          <label>Length</label>
          <input className='form-control input-sm'  onChange={this.props.updateProductFormState.bind(this, 'length')} value={this.props.productFormState.length}></input>
          <label>Width</label>
          <input className='form-control input-sm'  onChange={this.props.updateProductFormState.bind(this, 'width')} value={this.props.productFormState.width}></input>
          <label>Height</label>
          <input className='form-control input-sm'  onChange={this.props.updateProductFormState.bind(this, 'height')} value={this.props.productFormState.height}></input>
          <label>Weight</label>
          <input className='form-control input-sm'  onChange={this.props.updateProductFormState.bind(this, 'weight')} value={this.props.productFormState.weight}></input>

          <div className='text-right' style={{marginTop:'10px'}}>
            <div className='btn-group' role='group'>
              <Button handlerClick={this.saveProduct} iclassName='fa fa-plus' tmp='[ Save Product ]' bsBtnClassName={`btn-primary`}></Button>
              <Button handlerClick={this.props.addProductFormToggler.bind(this, false)} iclassName='fa fa-chevron-up' tmp={'[ Close Form ]'} bsBtnClassName={`btn-danger`} />
            </div>
        </div>
        </div>

      </div>
    );
  }
}

export default AddProductForm;
