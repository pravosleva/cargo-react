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
            <strong>{e.name}</strong>
            <br />
            <span>Dimentions: {e.length} x {e.width} x {e.height} mm ({e.weight} kg)</span>
          </li>
        },
        this
      ).reverse();
    if(this.props.productList.length!==0){
      return (
        <ul>{lies}</ul>
      );
    }else{return null}
  }
}

export default ProductList;
