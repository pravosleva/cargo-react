import React, { Component } from 'react';
import Button from './Button';
//css..
import Cargo from './Cargo';
import buildUrl from 'build-url'

function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

class ContainerGroupList extends Component {
  constructor(props){
    super(props);
  }
  logProductListCombinations = (containerGroupId) => {
    console.log(this.props.getProductListCombinations(containerGroupId))
  }
  getLink = (containerGroupData) => {
    const {
      productList,
      id,
      carrying,
      width,
      length,
      height,
    } = containerGroupData
    return buildUrl('https://selection4test.ru', {
      path: '/projects/cargo-3d-2021',
      queryParams: {
        wagonLength: length,
        wagonWidth: width,
        wagonHeight: height,
        wagonCarryingCapacity: carrying,
        // cargoLength
        maxInWagon: 13,
        maxRowsInWagon_byWagonWidth: 2,
        maxRowsInWagon_byWagonLength: 50,
        maxFloorsInWagon: 1,
        cargoType: 'thermocold_chillers',
        modelName: 'tst',
        containerType: 'truck_v1',
        productList: utf8_to_b64(JSON.stringify(productList))
      },
    })
  }
  logLinks = (containerGroupData) => {
    const { productList, id } = containerGroupData
    const combs = this.props.getProductListCombinations(id)

    combs.forEach((comb) => {
      console.log(this.getLink({ ...containerGroupData, productList: comb }))
    })
  }
  render() {
    let alerts = this.props.containerGroupList.map(
          function(e, i){ return <div className='well' key={e.id}>
            <div style={{position:'relative'}}>
              <div className='btn-group' role='group' style={{position:'absolute', top:'5px', right:'5px'}}>
                <Button iclassName='fa fa-pencil' handlerClick={this.props.editContainerGroup.bind(this, e.id, e.productList)} />
                <Button iclassName='fa fa-info' bsBtnClassName='btn-default' handlerClick={this.logLinks.bind(this, e)} />
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
          <h3>ContainerGroupList</h3>
          {alerts}
        </div>
      );
    }else{return null}
  }
}

export default ContainerGroupList;
