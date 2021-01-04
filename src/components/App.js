import React, { Component } from 'react';
//import '../css/App.css';
import Button from './Button';
import AddContainerGroupForm from './AddContainerGroupForm';
import ContainerGroupList from './ContainerGroupList';

import axios from 'axios';

// The snackbar and test for him:
import { show, ACTION_TYPE } from 'js-snackbar';
// Require css for your app's bundle process
import '../../node_modules/js-snackbar/dist/snackbar.css';
import '../css/snackbar-custom.css';

import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
// https://github.com/fritz-c/react-sortable-tree

import sortBySizes from './_auxiliary';
//console.log(sortBySizes());

show({
  text: 'Last update at 2018-02-14',
  pos: 'bottom-right',
  customClass: 'snackbar-default',
  duration: 35000,
  actionText: 'Send FeedBack&nbsp;&nbsp;&#9993;',// For ACTION_TYPE.TEXT
  actionType: ACTION_TYPE.TEXT,
  onSnackbarClick: () => { console.log('hello world by snackbar'); },
  onActionClick: (element) => {
    console.log('hello world by snackbar action');

    let x = window.open(`mailto:selection4test@gmail.com?subject=Feedback%20about%20Cargo-React%20project`);
    x.close();
    element.style.opacity = 0;
  }
});

/*
*                             COMPONENT STRUCTURE
*
* - App
    state = {
      addContainerFormOpened: bool,
      containerGroupFormState: {
        name: str,
        length: num,
        width: num,
        height: num,
        carrying: num,
        productList: arr,
        comment: str,
        hiringPrice: num,
        currency: str
      },
      containerGroupList: [
        {
          id: str,
          name: str,
          carrying: num,
          length: num,
          width: num,
          height: num,
          hiringPrice: num,
          currency: str,
          productList: [
            {
              id: str,
              name: str,
              length: num,
              width: num,
              height: num,
              weight: num,
              comment: str,
              addSize: num
            }
          ],
          comment: str
        }
      ]
    }
*   |   |-- AddContainerGroupForm
*   |   |-- ContainerGroupList
*   |   |   |-- Cargo
                state = {
                  addProductFormOpened: bool,
                  productFormState: {name: str, length: num, width: num, height: num, weight: num, addSize: num}
                }
*   |   |   |   |-- AddProductForm
*   |   |   |   |-- ProductList
*/

class TreeExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ height: "500px", overflowY: 'auto' }}>
        <SortableTree
          treeData={this.props.treeData}
          onChange={treeData => this.props.setTreeData(treeData)}
          canDrag={false}
        />
      </div>
    );
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      addContainerFormOpened: props.defaultAddContainerGroupFormOpened,
      containerGroupFormState: {
        name: '', length: '', width: '', height: '', carrying: '', productList:[], comment: '', hiringPrice: '', currency: ''
      },

      containerGroupList: [
        {
          id: 'уникальный_айди_конт_0',
          name: 'Truck 13.6 m',
          carrying: 20000,
          length: 13600,
          width: 2400,
          height: 3000,
          hiringPrice: 7500,
          currency: 'EUR',
          productList: [],
        },
      ],
      // TEST FOR EXAMPLE
      /*containerGroupList: [
        {
          id: 'уникальный_айди_rrer',
          name: 'Group 1',
          carrying: 20000,
          length: 13600,
          width: 2400,
          height: 3000,
          hiringPrice: 7500,
          currency: 'EUR',
          productList: [
            {
              id: 'уникальный_айди_hdsfdfsffd',
              name: 'PRODUCT 1',
              length: 1200,
              width: 1000,
              height: 1000,
              weight: 400,
              comment: 'Кубик метр на метр на метр',
              addSize: 50
            },
            {
              id: 'уникальный_айди_jhjgjhg',
              name: 'PRODUCT 2',
              length: 1000,
              width: 1100,
              height: 1000,
              weight: 400,
              comment: 'Кубик метр на метр на метр',
              addSize: 50
            },
            {
              id: 'уникальный_айди_jhjgdjhg',
              name: 'PRODUCT 3',
              length: 2000,
              width: 2000,
              height: 2000,
              weight: 900,
              comment: 'Большой Кубик 2 x 2 x 2',
              addSize: 50
            },
            {
              id: 'уникальный_айди_jhjgdjhg',
              name: 'PRODUCT 3.1',
              length: 2000,
              width: 2000,
              height: 2000,
              weight: 900,
              comment: 'Большой Кубик 2 x 2 x 2',
              addSize: 50
            },
            {
              id: 'уникальный_айди_jhjg1jhg',
              name: 'PRODUCT 4',
              length: 10500,
              width: 2100,
              height: 2500,
              weight: 19900,
              comment: 'Явно одна единица в машине!',
              addSize: 50
            }
          ],
          comment: 'Comment example mf'
        }
      ],
      */

      containerGroupListSorted: [],
      // TEST FOR EXAMPLE
      //containerGroupListSorted: [{ title: 'Chicken', children: [{ title: 'Egg' }] }],
      /*
        containerGroupListSorted as result of sotr to Containers by sizes and summary weight
        For example:
        [{ title: 'Chicken', children: [{ title: 'Egg' }] }]
      */
    }
    this.updateContainerGroupFormState = this.updateContainerGroupFormState.bind(this);
    this.saveContainerGroup = this.saveContainerGroup.bind(this);
    this.removeContainerGroup = this.removeContainerGroup.bind(this);
    this.editContainerGroup = this.editContainerGroup.bind(this);
    this.addContainerGroupFormToggler = this.addContainerGroupFormToggler.bind(this);
    this._updateProductListForContainerGroup = this._updateProductListForContainerGroup.bind(this);
    this._getResultAsPOST = this._getResultAsPOST.bind(this);
    this._setContainerGroupListSorted = this._setContainerGroupListSorted.bind(this); // Special 2018-02-14
    this.getProductList = this.getProductList.bind(this)
  }
  _setContainerGroupListSorted () { this.setState ({ containerGroupListSorted: sortBySizes (this.state.containerGroupList) }) }
  saveContainerGroup (obj) {
    let _getUUID = () => {
      let newUUID = ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      }));
      return newUUID;
    };

    if(!obj.name || !obj.length || !obj.width || !obj.height || !obj.carrying || !obj.hiringPrice || !obj.currency){
      show({ text: 'Some input fields could not be empty! Please, check the input form', pos: 'bottom-right', customClass: 'snackbar-danger', duration: 10000 });
      return;
    }

    // --- Need to check the dimensions and weight for each product before save (refresh) parameters of the particular Container Group
    if(obj.productList.length){
      //show({ text: `INFO: productList.length is not zero ${obj.productList.length}`, pos: 'bottom-right', customClass: 'snackbar-default', duration: 10000 });
      let flag = true, err_msg = '';
      obj.productList.map((e, i) => {//console.log(JSON.stringify(obj));
        /* Remember:
            obj dims - is the Container dimensions
            e dims - is the Product dimensions
        */
        // Firstly we have to detect max dimensions of the Container and max weight that it can to accept.
        let maxHeigth = obj.height,
          maxWeigth = obj.carrying;
        let conditional_maxLength, conditional_maxWidth;
        if(obj.length >= obj.width){
          conditional_maxLength = obj.length; conditional_maxWidth = obj.width;
        }else{ conditional_maxLength = obj.width; conditional_maxWidth = obj.length }
        // Then we have to check the product parameters before add it to productList:
        let conditional_length, conditional_width;
        if(e.length >= e.width){
          conditional_length = e.length; conditional_width = e.width;
        }else{ conditional_length = e.width; conditional_width = e.length }
        if(conditional_length > conditional_maxLength){ err_msg = `${e.name} has problems! His most dimention is more than maxLength: ${conditional_length} > ${conditional_maxLength} mm! Check it please.`; flag = false; }
        if(conditional_width > conditional_maxWidth){ err_msg = `${e.name} has problems! His smallest dimention is more than maxWidth: ${conditional_width} > ${conditional_maxWidth} mm! Check it please.`; flag = false; }
        if(e.height > maxHeigth){ err_msg = `${e.name} has problems! His height is more than maxHeigth: ${e.height} > ${maxHeigth} mm! Check it please.`; flag = false; }
        if(e.weight > maxWeigth){ err_msg = `${e.name} has problems! His weight is more than maxWeigth: ${e.weight} > ${maxWeigth} kg! Check it please.`; flag = false; }
      });

      if(flag===false){
        show({ text: err_msg, pos: 'bottom-right', customClass: 'snackbar-danger', duration: 20000 });
        return;
      }else{
        show({ text: `Dimensions tested= It's Ok`, pos: 'bottom-right', customClass: 'snackbar-primary', duration: 10000 });
      }
    }
    // --- Checked and Tested.

    let containerGroupList = this.state.containerGroupList;
    obj.id = _getUUID();
    obj.productList ? obj.productList = obj.productList : obj.productList = [];

    // Max dim should be saved as length:
    let { length: _containerLength, width: _containerWidth } = obj;
    if(_containerLength < _containerWidth){
      obj.length = _containerWidth;
      obj.width = _containerLength;
    }

    containerGroupList.push(obj);
    this.setState({ containerGroupList });
    this.updateContainerGroupFormState('clearForm');
    this.addContainerGroupFormToggler(false);
    //show({ text: `It's Ok. Container Group saved as ${obj.name}...`, pos: 'bottom-right', customClass: 'snackbar-primary', duration: 10000 });
  }
  removeContainerGroup(id, shouldBeConfirmed) {
    let isGonnaBeRemoved = false

    if (shouldBeConfirmed) {
      isGonnaBeRemoved = window.confirm('Вы уверены?')

      if (isGonnaBeRemoved) {
        this.setState(({ containerGroupList: prevContainerGroupList }) => ({ containerGroupList: prevContainerGroupList.filter( (e, i) => e.id !== id ) }));
      }
    } else {
      this.setState(({ containerGroupList: prevContainerGroupList }) => ({ containerGroupList: prevContainerGroupList.filter( (e, i) => e.id !== id ) }));
    }
  }
  updateContainerGroupFormState(propName, productList, e) {
    //console.log(`e.target.value before: ${e.target.value}`);
    let { containerGroupFormState } = this.state;
    let _getNumericValue = (val) => { return (val!=="" && !isNaN(val)) ? Number(val) : "" };
    switch(propName){
      case 'name': containerGroupFormState.name = e.target.value; break;
      case 'length': containerGroupFormState.length = _getNumericValue(e.target.value); break;
      case 'height': containerGroupFormState.height = _getNumericValue(e.target.value); break;
      case 'width': containerGroupFormState.width = _getNumericValue(e.target.value); break;
      case 'carrying': containerGroupFormState.carrying = _getNumericValue(e.target.value); break;
      case 'comment': containerGroupFormState.comment = e.target.value; break;
      case 'hiringPrice': containerGroupFormState.hiringPrice = _getNumericValue(e.target.value); break;
      case 'currency': containerGroupFormState.currency = e.target.value; break;
      case 'clearForm':
        let _getObjAfterSettingValueToFields = (obj, value, fieldsArr) => {
          for (let fieldName in obj) {
            fieldsArr.map((e, i, a) => {
              if (fieldName===e) { obj[fieldsArr[i]] = value }
            });
          }
          return obj;
        }
        containerGroupFormState = _getObjAfterSettingValueToFields(containerGroupFormState, '', ['name', 'length', 'height', 'width', 'carrying', 'comment', 'hiringPrice', 'currency']);
        containerGroupFormState = _getObjAfterSettingValueToFields(containerGroupFormState, [], ['productList'])
        break;
      default: break;
    }
    this.setState({ containerGroupFormState });
  }
  editContainerGroup(id, productList) {
    this.addContainerGroupFormToggler(true);
    let containerGroupToEdit = this.state.containerGroupList.filter( (e, i) => e.id === id )[0];
    this.setState({ containerGroupFormState: {
      name: containerGroupToEdit.name, length: containerGroupToEdit.length, height: containerGroupToEdit.height, width: containerGroupToEdit.width, carrying: containerGroupToEdit.carrying, productList, comment: containerGroupToEdit.comment, hiringPrice: containerGroupToEdit.hiringPrice, currency: containerGroupToEdit.currency
    } });
    this.removeContainerGroup(id);
  }
  componentDidUpdate() {
    //console.log(JSON.stringify(this.state.containerGroupFormState));
  }
  addContainerGroupFormToggler(is_it_should_be_opened) {
    switch(is_it_should_be_opened){
      case true: this.setState({ addContainerFormOpened: is_it_should_be_opened }); break;
      case false:
        this.setState({ addContainerFormOpened: is_it_should_be_opened });
        this.updateContainerGroupFormState('clearForm');// Clear always when the form should be closed manually
        break;
      default: this.setState({ addContainerFormOpened: !this.state.addContainerFormOpened });
    }
  }
  _updateProductListForContainerGroup(obj) {
    // obj = {productList, containerId}
    // Task: Need to save the productList for the Container Group to this state.
    let containerGroupList = this.state.containerGroupList;
    // Refresh productList for this Container Group:
    containerGroupList.map((e, i) => {
      if(e.id===obj.containerId){ e.productList = obj.productList; }
    });
    // Refresh containerGroupData for this state:
    this.setState({containerGroupList});
    show({ text: `Productlist for Container Group updated...`, pos: 'bottom-right', customClass: 'snackbar-primary', duration: 2000 });
  }
  _getResultAsPOST(){
    let containerGroupList = this.state.containerGroupList;
    axios({
      method: 'post',
      url: 'https://selection4test.ru/projects/cargo-3d/retail',
      data: {
        'containerGroupList': containerGroupList
      }
    })
    .then(function(res){
      console.log(res);
    })
    .catch(function(err){
      console.error(err);
    });

    console.warn('POST req is under construction yet...');
  }
  getProductList(containerGroupId) {
    const targetContainerGroup = this.state.containerGroupList.find(({ id }) => id === containerGroupId)

    if (!!targetContainerGroup) {
      return targetContainerGroup.productList
    }
    return null
  }
  perm = (xs) => {
    let ret=[];
    for(let i=0;i<xs.length;i=i+1){
      let rest=this.perm(xs.slice(0,i).concat(xs.slice(i+1)));
      if(!rest.length){
        ret.push([xs[i]])
      } else {
        for(let j=0;j<rest.length;j=j+1){
          ret.push([xs[i]].concat(rest[j]))
        }
      }
    }
    return ret
  };
  getProductListCombinations = (containerGroupId) => {
    // console.log(containerGroupId)
    return this.perm(this.getProductList(containerGroupId) || [])
  }
  render() {
    return (
      <div className='container-fluid' style={{marginBottom:'50px'}}>

        <h1>Cargo-React</h1>
        <div className='row'>
          <div className='col-lg-6'>

            <h2>Tree example</h2>
            <div style={{height:'33px'}}></div>

            <h3>Structure</h3>
            <div className='shadow'>
              <TreeExample
                treeData={ this.state.containerGroupListSorted }
                setTreeData={ (treeData) => {this.setState({ containerGroupListSorted: treeData })} }
              />
            </div>
          </div>

          <div className='col-lg-6'>
            <h2>Cargo</h2>


                <div className='text-center' style={{marginBottom:'5px'}}>
                  <div className='btn-group' role='group'>
                      <Button handlerClick={ this.addContainerGroupFormToggler.bind(this, true) } iclassName='fa fa-plus' tmp={'Add Container Group'} />
                      <Button handlerClick={ this._setContainerGroupListSorted } bsBtnClassName='btn-primary' iclassName='fa fa-cog' tmp={'Sort test'} />
                      {/* <Button handlerClick={ this._getResultAsPOST } iclassName='fa fa-cog' tmp={'POST test'} /> */}
                  </div>
                </div>

                <AddContainerGroupForm
                  addContainerGroupFormToggler={this.addContainerGroupFormToggler.bind(this)}
                  display={this.state.addContainerFormOpened ? 'block' : 'none'}
                  containerGroupFormState={this.state.containerGroupFormState}
                  updateContainerGroupFormState={this.updateContainerGroupFormState}
                  saveContainerGroup={this.saveContainerGroup} />
                <ContainerGroupList
                  containerGroupList={this.state.containerGroupList}
                  removeContainerGroup={this.removeContainerGroup}
                  editContainerGroup={this.editContainerGroup}
                  updateProductListForContainerGroup={this._updateProductListForContainerGroup}
                  getProductListCombinations={this.getProductListCombinations}
                />
          </div>
        </div>
      </div>
    );
  }
}

App.defaultProps={
  defaultAddContainerGroupFormOpened: false,
};

export default App;
