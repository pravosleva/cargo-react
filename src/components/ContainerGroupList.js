import React, { Component } from 'react';
import Button from './Button';
//css..
import Cargo from './Cargo';
import buildUrl from 'build-url';
import { show, ACTION_TYPE } from 'js-snackbar';
import { openNewTab } from '../utils/openNewTab'

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
  getUrl = (containerGroupData, baseUrl = 'https://selection4test.ru', path = '/projects/cargo-3d-2021') => {
    const {
      productList,
      id,
      carrying,
      width,
      length,
      height,
    } = containerGroupData
    return buildUrl(baseUrl, {
      path,
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
  promise = async (apiUrl) => {
    return fetch(apiUrl)
      .then((res) => res.json())
      .catch((err) => {
        throw new Error(err)
      })
  }
  logLinks = async (containerGroupData) => {
    const { productList, id } = containerGroupData
    const combs = this.props.getProductListCombinations(id)
    if (combs.length === 0) {
      show({
        text: 'Добавьте элементы в контейнер.',
        pos: 'bottom-right',
        customClass: 'snackbar-danger',
        duration: 5000,
        // actionType: ACTION_TYPE.TEXT,
      });
      return;
    }
    const _result = []
    const promiseList = []

    combs.forEach((comb, i) => {
      const threejsLink = this.getUrl({ ...containerGroupData, productList: comb })
      const apiUrl = this.getUrl({ ...containerGroupData, productList: comb }, 'https://selection4test.ru', '/projects/cargo-2021/get-running-meters-in-wagon')
      // console.group(`comb ${i}`)
      // console.dir(apiUrl)
      // console.dir(threejsLink)
      // console.groupEnd(`comb ${i}`)
      _result.push({ threejsLink, apiUrl })
      promiseList.push(this.promise(apiUrl))
    })

    let result = []

    await Promise.all(promiseList)
      .then((resArr) => {
        const _r = []
        resArr.forEach((res, i) => {
          _r.push({ res, apiUrl: _result[i].apiUrl, threejsLink: _result[i].threejsLink })
        })
        result = _r.sort((e1, e2) => e1.res.totalX - e2.res.totalX)
      })
      .catch((err) => {
        console.log(err)
      })

    result.forEach((final, i) => {
      const title = `final ${i}: totalX= ${final.res.totalX} m`
      console.group(title)
      // console.dir(final)
      console.dir(final.apiUrl)
      console.dir(final.threejsLink)
      console.groupEnd(title)
    })

    show({
      text: `Минимальная заполненность в погонных метрах: ${result[0].res.totalX}`,
      pos: 'bottom-right',
      customClass: 'snackbar-primary',
      duration: 35000,
      actionType: ACTION_TYPE.TEXT,
      onSnackbarClick: () => {
        const isGonnaBeRedirected = window.confirm('Показать 3D модель?')

        if (isGonnaBeRedirected) {
          openNewTab(result[0].threejsLink)
        }
      },
    });
  }
  render() {
    let alerts = this.props.containerGroupList.map(
          function(e, i){ return <div className='well' key={e.id}>
            <div style={{position:'relative'}}>
              <div className='btn-group' role='group' style={{position:'absolute', top:'5px', right:'5px'}}>
                <Button iclassName='fa fa-pencil' handlerClick={this.props.editContainerGroup.bind(this, e.id, e.productList)} />
                <Button iclassName='fa fa-info' bsBtnClassName='btn-default btn-primary-text' handlerClick={this.logLinks.bind(this, e)} />
                <Button iclassName='fa fa-close' bsBtnClassName='btn-default btn-danger-text' handlerClick={this.props.removeContainerGroup.bind(this, e.id, true)} />
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
