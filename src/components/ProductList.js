import React, { Component } from 'react';
import Button from './Button';
//css..
import '../css/App.css';

class ProductList extends Component {
  constructor(props){
    super(props);

  }
  render() {
    let thead = <tr><th></th><th>Name</th></tr>,
      tbody = this.props.productList.map(
          function(e, i){ return <tr key={i}>
            <td>
              <div className='btn-group' role='group'>
                <Button iclassName='fa fa-pencil' handlerClick={this.props.editProduct.bind(this, e.id)} />
                <Button iclassName='fa fa-close' handlerClick={this.props.removeProduct.bind(this, e.id)} />
              </div>
            </td>
            <td>{e.name}</td>
          </tr>
        },
        this
      );
    if(this.props.productList.length!==0){
      return (
        <div>
          {/*<h3>ProductList</h3>*/}
          <table className="table table-condensed borderless">
            <thead>{thead}</thead>
            <tbody>{tbody}</tbody>
          </table>
        </div>
      );
    }else{return null}
  }
}

export default ProductList;
