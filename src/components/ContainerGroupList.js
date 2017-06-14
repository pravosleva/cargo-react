import React, { Component } from 'react';
import Button from './Button';
//css..
import AddProductForm from './AddProductForm';

class ContainerGroupList extends Component {
  constructor(props){
    super(props);

  }
  render() {
    let thead = <tr><th></th><th>Name</th><th>Length</th><th>Width</th><th>Height</th><th>Carrying</th><th>id</th></tr>,
      tbody = this.props.containerGroupList.map(
          function(e, i){ return <tr key={i}>
            <td>
              <Button iclassName='fa fa-pencil' handlerClick={this.props.editContainerGroup.bind(this, e.id)} tmp={'[ Edit ]'} />
              <Button iclassName='fa fa-close' handlerClick={this.props.removeContainerGroup.bind(this, e.id)} tmp={'[ Remove ]'} />
            </td>
            <td>{e.name}</td>
            <td>{e.length}</td>
            <td>{e.width}</td>
            <td>{e.height}</td>
            <td>{e.carrying}</td>
            <td>{e.id}</td>
            <td>
              <AddProductForm />
            </td>
          </tr>
        },
        this
      );
    if(this.props.containerGroupList.length!==0){
      return (
        <div>
          <h2>ContainerGroupList</h2>
          <table>
            <thead>{thead}</thead>
            <tbody>{tbody}</tbody>
          </table>

        </div>
      );
    }else{return null}
  }
}

export default ContainerGroupList;