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
      <div className='panel panel-default' style={{display: this.props.display}}>

        <div className='panel-heading'>AddProductForm</div>
        <div className='panel-body'>
          <label>Name</label>
          <input className='form-control input-sm'  onChange={this.props.updateProductFormState.bind(this, 'name')} value={this.props.productFormState.name}></input>

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
