import React, { Component } from 'react';
import Button from './Button';
//css..
import Cargo from './Cargo';

class ContainerGroupList extends Component {
  constructor(props){
    super(props);
  }
  render() {
    let alerts = this.props.containerGroupList.map(
          function(e, i){ return <div className='well' key={i}>
            <div style={{position:'relative'}}>
              <div className='btn-group' role='group' style={{position:'absolute', top:'5px', right:'5px'}}>
                <Button iclassName='fa fa-pencil' handlerClick={this.props.editContainerGroup.bind(this, e.id, e.productList)} />
                <Button iclassName='fa fa-close' bsBtnClassName='btn-danger' handlerClick={this.props.removeContainerGroup.bind(this, e.id)} />
              </div>
            </div>

            <strong>Container Group name: {!e.name?`_`:e.name}</strong><br />
            Dimensions of one unit: {!e.length?`_`:e.length} x {!e.width?`_`:e.width} x {!e.height?`_`:e.height} mm<br />
            Carrying of one unit: {!e.carrying?`_`:e.carrying} kg<br />
            Hiring Price of one unit: {!e.hiringPrice?`_`:e.hiringPrice} {e.currency}<br />
            {e.comment?<span className='text-muted'>Comment: {e.comment}</span>:null}

            <hr />
            <Cargo
              key={e.id}
              containerId={e.id}
              updateProductListForContainerGroup={this.props.updateProductListForContainerGroup}
              productList={e.productList}
              containerGroupList={this.props.containerGroupList} />
          </div>
        },
        this
      ).reverse();
    if(this.props.containerGroupList.length!==0){
      return (
        <div>
          <h2>ContainerGroupList</h2>
          {alerts}
        </div>
      );
    }else{return null}
  }
}

export default ContainerGroupList;
