import React, { Component } from 'react';
//import '../css/App.css';
import Button from './Button';
import AddContainerGroupForm from './AddContainerGroupForm';
import ContainerGroupList from './ContainerGroupList';

// The snackbar and test for him:
import { show, ACTION_TYPE } from 'js-snackbar';
// Require css for your app's bundle process
import '../../node_modules/js-snackbar/dist/snackbar.css';
import '../css/snackbar-custom.css';
/*
show({
  text: 'Test msg / Last update at 2017-07-01',
  pos: 'top-right',
  customClass: 'snackbar-default',
  duration: 35000,
  actionText: 'Send FeedBack&nbsp;&nbsp;&#9993;',// For ACTION_TYPE.TEXT
  actionType: ACTION_TYPE.TEXT,
  onSnackbarClick: () => { console.log('hello world by snackbar'); },
  onActionClick: (element) => {
    console.log('hello world by snackbar action');

    let x = window.open(`mailto:selection4test@gmail.com?subject=About%20Cargo`);
    x.close();
    element.style.opacity = 0;
  }
});*/

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
        hiringPrice: num, // not realized yet...
        currency: str // not realized yet...
      },
      containerGroupList: [
        {
          id: str,
          name: str,
          carrying: num,
          length: num,
          width: num,
          height: num,
          hiringPrice: num, // not realized yet...
          currency: str, // not realized yet...
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

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      addContainerFormOpened: props.defaultAddContainerGroupFormOpened,
      containerGroupFormState: {
        name: '', length: '', width: '', height: '', carrying: '', productList:[], comment: '', hiringPrice: '', currency: ''
      },
      containerGroupList: []
    }
    this.updateContainerGroupFormState = this.updateContainerGroupFormState.bind(this);
    this.saveContainerGroup = this.saveContainerGroup.bind(this);
    this.removeContainerGroup = this.removeContainerGroup.bind(this);
    this.editContainerGroup = this.editContainerGroup.bind(this);
    this.addContainerGroupFormToggler = this.addContainerGroupFormToggler.bind(this);
    this._updateProductListForContainerGroup = this._updateProductListForContainerGroup.bind(this);
    this.test = this.test.bind(this);
  }
  saveContainerGroup(obj) {
    let _getUUID = () => {
      let newUUID = ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      }));
      return newUUID;
    };

    if(obj.name===`` || obj.length===`` || obj.width===`` || obj.height===`` || obj.carrying===`` || obj.hiringPrice===``){
      show({ text: 'Some inputs are required! Please, check the input form', pos: 'top-right', customClass: 'snackbar-danger', duration: 5000 });
      return;
    }

    // --- Need to check the dimentions and weight for each product before save (refresh) parameters of the particular Container Group
    if(obj.productList.length!==0){
      //show({ text: `INFO: productList.length is not zero ${obj.productList.length}`, pos: 'top-right', customClass: 'snackbar-default', duration: 10000 });
      let flag = true, err_msg = '';
      obj.productList.map((e, i) => {//console.log(JSON.stringify(obj));
        /* Remember:
            obj dims - is the Container dimentions
            e dims - is the Product dimentions
        */
        // Firstly we have to detect max dimentions of the Container and max weight that it can to accept.
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
        show({ text: err_msg, pos: 'top-right', customClass: 'snackbar-danger', duration: 20000 });
        return;
      }else{
        show({ text: `Dimentions are tested. It's Ok.`, pos: 'top-right', customClass: 'snackbar-primary', duration: 5000 });
      }
    }
    // --- Checked and Tested.

    let containerGroupList = this.state.containerGroupList;
    obj.id = _getUUID();
    obj.productList ? obj.productList = obj.productList : obj.productList = [];
    containerGroupList.push(obj);
    this.setState({ containerGroupList });
    this.updateContainerGroupFormState('clearForm');
    this.addContainerGroupFormToggler(false);
    //show({ text: `It's Ok. Container Group saved as ${obj.name}...`, pos: 'top-right', customClass: 'snackbar-primary', duration: 10000 });
  }
  removeContainerGroup(id) {
    let containerGroupList = this.state.containerGroupList.filter( (e, i) => e.id !== id );
    this.setState({ containerGroupList });
  }
  updateContainerGroupFormState(propName, productList, e) {
    //console.log(`e.target.value before: ${e.target.value}`);
    let name = this.state.containerGroupFormState.name,
      length = this.state.containerGroupFormState.length,
      width = this.state.containerGroupFormState.width,
      height = this.state.containerGroupFormState.height,
      carrying = this.state.containerGroupFormState.carrying,
      comment = this.state.containerGroupFormState.comment,
      hiringPrice = this.state.containerGroupFormState.hiringPrice;
    let _getNumericValue = (val) => { return (val!=="" && !isNaN(val)) ? Number(val) : "" };
    switch(propName){
      case 'name': this.setState({containerGroupFormState: {name: e.target.value, length, height, width, carrying, productList, comment, hiringPrice}}); break;
      case 'length':
        if(!isNaN(e.target.value)){
          this.setState({containerGroupFormState: {name, length: _getNumericValue(e.target.value), height, width, carrying, productList, comment, hiringPrice}}); break;
        }else{};
        break;
      case 'height':
        if(!isNaN(e.target.value)){
          this.setState({containerGroupFormState: {name, length, height: _getNumericValue(e.target.value), width, carrying, productList, comment, hiringPrice}}); break;
        }else{};
        break;
      case 'width':
        if(!isNaN(e.target.value)){
          this.setState({containerGroupFormState: {name, length, height, width: _getNumericValue(e.target.value), carrying, productList, comment, hiringPrice}}); break;
        }else{};
        break;
      case 'carrying':
        if(!isNaN(e.target.value)){
          this.setState({containerGroupFormState: {name, length, height, width, carrying: _getNumericValue(e.target.value), productList, comment, hiringPrice}}); break;
        }else{};
        break;
      case 'comment':
        this.setState({containerGroupFormState: {name, length, height, width, carrying, productList, comment: e.target.value, hiringPrice}});
        break;
      case 'hiringPrice':
        this.setState({containerGroupFormState: {name, length, height, width, carrying, productList, comment, hiringPrice: _getNumericValue(e.target.value)}});
        break;
      case 'clearForm':
        this.setState({containerGroupFormState: {name: '', length: '', height: '', width: '', carrying:'', productList:[], comment:'', hiringPrice:''}});
        //console.log(`Attantion! The productList cleared in main state.`);
        break;
      default: break;
    }
  }
  editContainerGroup(id, productList) {
    this.addContainerGroupFormToggler(true);
    let containerGroupToEdit = this.state.containerGroupList.filter( (e, i) => e.id === id )[0];
    this.setState({ containerGroupFormState: {name: containerGroupToEdit.name, length: containerGroupToEdit.length, height: containerGroupToEdit.height, width: containerGroupToEdit.width, carrying: containerGroupToEdit.carrying, productList: productList, comment: containerGroupToEdit.comment, hiringPrice: containerGroupToEdit.hiringPrice} });
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
    show({ text: `Productlist for Container Group updated...`, pos: 'top-right', customClass: 'snackbar-primary', duration: 2000 });
  }
  test() {
    console.log('hello world');
    //..
  }
  render() {
    return (
      <div className='container'>
        <h1>Cargo-React</h1>
        <div className='text-center' style={{marginBottom:'5px'}}>
          <div className='btn-group' role='group'>
            <Button handlerClick={ this.addContainerGroupFormToggler.bind(this, true) } iclassName='fa fa-plus' tmp={'[ Add Container ]'} />
            <Button handlerClick={ this.test } iclassName='fa fa-circle-o' tmp={'[ Test ]'} />
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
          updateProductListForContainerGroup={this._updateProductListForContainerGroup} />
      </div>
    );
  }
}

App.defaultProps={
  defaultAddContainerGroupFormOpened: false,
};

export default App;
