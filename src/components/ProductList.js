import React, { Component } from 'react';
import Button from './Button';
//css..

class ProductList extends Component {
  constructor(props){
    super(props);

  }
  render() {
    let thead = <tr><th></th><th>Name</th></tr>,
      tbody = this.props.productList.map(
          function(e, i){ return <tr key={i}>
            <td>
              <Button iclassName='fa fa-pencil' handlerClick={this.props.editProduct.bind(this, e.id)} />
              <Button iclassName='fa fa-close' handlerClick={this.props.removeProduct.bind(this, e.id)} />
            </td>
            <td>{e.name}</td>
          </tr>
        },
        this
      );
    if(this.props.productList.length!==0){
      return (
        <div>
          <strong>ProductList</strong><br />
          <table>
            <thead>{thead}</thead>
            <tbody>{tbody}</tbody>
          </table>
        </div>
      );
    }else{return null}
  }
}

export default ProductList;
