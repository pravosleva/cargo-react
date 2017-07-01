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
      weight = this.props.productFormState.weight,
      comment = this.props.productFormState.comment,
      addSize = this.props.productFormState.addSize;
    //..
    this.props.saveProduct({name, length, width, height, weight, comment, addSize});
  }
  render() {
    return (
      <div className='panel panel-default' style={{display: this.props.display}}>

        <div className='panel-heading'>AddProductForm</div>
        <div className='panel-body'>
          <div className='row'>
            <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'>
              <label>Name</label>
              <input className='form-control input-sm'  onChange={this.props.updateProductFormState.bind(this, 'name')} value={this.props.productFormState.name}></input>
            </div>
            <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'>
              <label>Length, mm</label>
              <input className='form-control input-sm'  onChange={this.props.updateProductFormState.bind(this, 'length')} value={this.props.productFormState.length}></input>
              <label>Width, mm</label>
              <input className='form-control input-sm'  onChange={this.props.updateProductFormState.bind(this, 'width')} value={this.props.productFormState.width}></input>
              <label>Height, mm</label>
              <input className='form-control input-sm'  onChange={this.props.updateProductFormState.bind(this, 'height')} value={this.props.productFormState.height}></input>
              <label>Weight, kg</label>
              <input className='form-control input-sm'  onChange={this.props.updateProductFormState.bind(this, 'weight')} value={this.props.productFormState.weight}></input>
            </div>
            <div className='col-lg-6 col-md-4 col-sm-4 col-xs-12'>
              <label>addSize, mm</label>
              <input className='form-control input-sm'  onChange={this.props.updateProductFormState.bind(this, 'addSize')} value={this.props.productFormState.addSize}></input>
              <label>Comment</label>
              <textarea className='form-control input-sm'  onChange={this.props.updateProductFormState.bind(this, 'comment')} value={this.props.productFormState.comment}></textarea>
            </div>
          </div>
          <hr />
          <p className='text-muted'>
            Attantion! Parameters of the Product can't be more than dimentions and carrying capacity of item of the Container Group.
          </p>
        </div>
        <div className='panel-footer'>
          <div className='text-right'>
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
