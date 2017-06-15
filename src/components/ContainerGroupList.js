import React, { Component } from 'react';
import Button from './Button';
//css..
import Cargo from './Cargo';

class ContainerGroupList extends Component {
  constructor(props){
    super(props);

  }
  updateProductListForContainerGroup() {

  }
  render() {
    let thead = <tr><th></th><th>Name</th><th>Length, mm</th><th>Width, mm</th><th>Height, mm</th><th>Carrying, kg</th><th>Cargo</th></tr>,
      tbody = this.props.containerGroupList.map(
          function(e, i){ return <tr key={i}>
            <td>
              <div className='btn-group' role='group'>
                <Button iclassName='fa fa-pencil' handlerClick={this.props.editContainerGroup.bind(this, e.id)} />
                <Button iclassName='fa fa-close' handlerClick={this.props.removeContainerGroup.bind(this, e.id)} />
              </div>
            </td>
            <td>{e.name}</td>
            <td>{e.length}</td>
            <td>{e.width}</td>
            <td>{e.height}</td>
            <td>{e.carrying}</td>
            <td>
              <Cargo containerId={e.id} updateProductListForContainerGroup={this.props.updateProductListForContainerGroup} />
            </td>
          </tr>
        },
        this
      );
    if(this.props.containerGroupList.length!==0){
      return (
        <div>
          <h2>ContainerGroupList</h2>
          <table className="table table-condensed">
            <thead>{thead}</thead>
            <tbody>{tbody}</tbody>
          </table>
        </div>
      );
    }else{return null}
  }
}

export default ContainerGroupList;
