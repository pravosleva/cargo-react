import React, { Component } from 'react';
import Button from './Button';
//css..

class ProductList extends Component {
  constructor(props){
    super(props);
  }
  render() {
    let lies = this.props.productList.map(
          function(e, i){ return <li key={i}>
            <span>
              <div className='btn-group' role='group'>
                <Button iclassName='fa fa-pencil' handlerClick={this.props.editProduct.bind(this, e.id)} />
                <Button iclassName='fa fa-close' handlerClick={this.props.removeProduct.bind(this, e.id)} />
              </div>
            </span>
            <br />
            <strong>Name: {e.name?e.name:`_`}</strong>
            <br />
            <span>Dimensions: {e.length?e.length:`_`} x {e.width?e.width:`_`} x {e.height?e.height:`_`} mm ({e.weight?e.weight:`_`} kg)</span>
          </li>
        },
        this
      ).reverse();
    if(this.props.productList.length!==0){
      return (
        <div>
          <strong>ProductList</strong><br />
          <ul>{lies}</ul>
        </div>
      );
    }else{return null}
  }
}

export default ProductList;
