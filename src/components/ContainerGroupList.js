import React, { Component } from 'react';
import Button from './Button';
import Cargo from './Cargo';
import { show, ACTION_TYPE } from 'js-snackbar';
import { openNewTab } from '../utils/openNewTab';

const retailCalc = new Worker('./workers/retail-calc.js');

function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}
const initialAnalysisState = {
  result: null,
  performanceInSeconds: 0,
}

class ContainerGroupList extends Component {
  constructor(props){
    super(props);
    this.state = {
      'tst-id': {
        isLoading: false,
        isCompleted: false,
        totalCombinations: 0,
        count: 0,
        combinationsAnalysis: initialAnalysisState,
      },
    }
  }
  logProductListCombinations = (containerGroupId) => {
    console.log(this.props.getProductListCombinations(containerGroupId))
  }
  componentDidMount() {
    retailCalc.onmessage = ($event) => {
      if ($event && $event.data) {
        if ($event.data.actionCode === 'RESULT') {
          this.setState((state) => ({
            ...state,
            [$event.data.containerGroupData.id]: {
              ...state[$event.data.containerGroupData.id],
              combinationsAnalysis: $event.data,
              isLoading: false,
              isCompleted: true,
            }
          }))

          show({
            text: `Минимальная заполненность в погонных метрах: ${$event.data.result[0].res.totalX.toFixed(1)}`,
            pos: 'bottom-right',
            customClass: 'snackbar-primary',
            duration: 35000,
            actionType: ACTION_TYPE.TEXT,
            onSnackbarClick: () => {
              const isGonnaBeRedirected = window.confirm('Показать 3D модель?')

              if (isGonnaBeRedirected) {
                openNewTab($event.data.result[0].threejsLink)
              }
            },
          });
        } else if ($event.data.actionCode === 'COUNT') {
          this.updateContainerCalcState({ id: $event.data.containerGroupData.id, delta: { totalCombinations: $event.data.totalCombinations}, addCount: $event.data.count })
        }
      }
    };
  }
  getCombinationsAnalysis = ({ combs, containerGroupData }) => {
    // retailCalc.postMessage({ msg: 'counterSample', countApple: this.state.count, combs });
    show({
      text: `Поиск из ${combs.length} комбинаций...`,
      pos: 'bottom-right',
      customClass: 'snackbar-primary',
      duration: 35000,
    });
    retailCalc.postMessage({ msg: 'getCombinationsAnalysis', combs, containerGroupData });
  }
  updateContainerCalcState = ({ id, delta, addCount = 0 }) => {
    this.setState((state) => {
      if (!!state[id]) {
        if (!!addCount) {
          return ({ ...state, [id]: { ...state[id], count: state[id].count + addCount, ...delta } })
        }
        return ({ ...state, [id]: { ...state[id], ...delta } })
      } else {
        if (!!addCount) {
          return ({ ...state, [id]: { count: addCount, ...delta } })
        }
        return ({
          ...state,
          [id]: {
            isLoading: true,
            isCompleted: false,
            totalCombinations: 0,
            count: 0,
            combinationsAnalysis: initialAnalysisState,
          },
        })
      }
    })
  }
  resetContainerCalcState = (id, length) => {
    this.updateContainerCalcState({ id, delta: { totalCombinations: length, isLoading: true, isCompleted: false, count: 0, combinationsAnalysis: initialAnalysisState } })
  }
  logLinks = (containerGroupData) => {
    const { productList, id } = containerGroupData
    const combs = this.props.getProductListCombinations(id)

    if (combs.length === 0) {
      return Promise.reject('Добавьте элементы в контейнер');
    }

    this.resetContainerCalcState(containerGroupData.id, combs.length)

    const _result = []
    const queryParamsPackArr = []
    const _r = []
    const info = {
      min: 1000000,
      minIndex: undefined,
      max: 0,
      maxIndex: undefined,
    }

    this.getCombinationsAnalysis({ combs, containerGroupData })

    return Promise.resolve()
  }
  render() {
    if (this.props.containerGroupList.length !== 0) {
      return (
        <div>
          <h3>ContainerGroupList</h3>
          {
            this.props.containerGroupList.map(
              function(e, i){
                const container = this.state[e.id]

                return <div className='well' key={e.id}>
                  {!!container && container.isLoading && (
                    <h4>Web Worker: {container.count} of {container.totalCombinations}</h4>
                  )}
                  {/*
                    !!container && container.isLoading && (
                      <pre>{JSON.stringify(this.state[e.id], null, 2)}</pre>
                    )
                  */}
                  {
                    !!container && !!container.totalCombinations && !container.isCompleted && (
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          aria-valuenow={`${((container.count / container.totalCombinations) * 100).toFixed(0)}`}
                          style={{ width: `${(container.count / container.totalCombinations) * 100}%` }}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >{`${((container.count / container.totalCombinations) * 100).toFixed(0)} %`}</div>
                      </div>
                    )
                  }
                  {
                    !!container && !!container.isCompleted && !!container.combinationsAnalysis.result && container.combinationsAnalysis.result.length === 2 && (
                      <div
                        // className='well'
                      >
                        {/* <h4>Result: {container.combinationsAnalysis.performanceInSeconds} s</h4> */}
                        <b><a rel="noopener noreferrer" href={container.combinationsAnalysis.result[0].threejsLink} target="_blank">{`Минимальная заполненность фуры: ${container.combinationsAnalysis.result[0].res.totalX.toFixed(1)} (погонных метров)`}</a></b>
                        <hr />
                      </div>
                    )
                  }
                  <div style={{position:'relative'}}>
                    <div className='btn-group' role='group' style={{position:'absolute', top:'5px', right:'5px'}}>
                      <Button disabled={!!container && container.isLoading} iclassName='fa fa-pencil' handlerClick={this.props.editContainerGroup.bind(this, e.id, e.productList)} />
                      <Button iclassName='fa fa-info' bsBtnClassName='btn-default btn-primary-text'
                        disabled={!!container && container.isLoading}
                        tmp={!!container && container.isLoading && 'Please wait'}
                        handlerClick={() => {
                          this.logLinks(e)
                            .catch((err) => {
                              show({
                                text: typeof err === 'string' ? err : (err.message || 'No err.message'),
                                pos: 'bottom-right',
                                customClass: 'snackbar-danger',
                                duration: 5000,
                              });
                            })
                        }}
                      />
                      <Button disabled={!!container && container.isLoading} iclassName='fa fa-close' bsBtnClassName='btn-default btn-danger-text' handlerClick={this.props.removeContainerGroup.bind(this, e.id, true)} />
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
                    // isLoading={!!container.combinationsAnalysis &&  !!container && container.totalCombinations > 0}
                    isLoading={!!container && container.isLoading}
                    containerGroupList={this.props.containerGroupList} />
                </div>
              },
              this
            ).reverse()
          }
        </div>
      )
    } else {
      return null
    }
  }
}

export default ContainerGroupList;
