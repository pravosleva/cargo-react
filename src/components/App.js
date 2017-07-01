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
show({
<<<<<<< HEAD
  text: 'Last update at 2017-06-24',
=======
  text: 'Last update at 2017-06-29',
>>>>>>> origin/master
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
});

/*
*                             COMPONENT STRUCTURE
*
* - App
    state = {
      addContainerFormOpened: bool,
      containerGroupFormState: {name: str, length: num, width: num, height: num, carrying: num, productList: arr, comment: str},
      containerGroupList: [
        {
          id: str,
          name: str,
          carrying: num,
          length: num,
          width: num,
          height: num,
          hiringPrice: num, // not used yet...
          productList: [
            {
              id: str,
              name: str,
              length: num,
              width: num,
              height: num,
              weight: num,
              comment: str
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
                  productFormState: {name: str, length: num, width: num, height: num, weight: num}
                }
*   |   |   |   |-- AddProductForm
*   |   |   |   |-- ProductList
*/

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      addContainerFormOpened: props.defaultAddContainerGroupFormOpened,
      containerGroupFormState: {name: '', length: '', width: '', height: '', carrying: '', productList:[], comment: ''},
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

    if(obj.name===`` || obj.length===`` || obj.width===`` || obj.height===`` || obj.carrying===``){
      show({ text: 'Some inputs are required! Please, check the input form', pos: 'top-right', customClass: 'snackbar-danger', duration: 5000 });
      return;
    }

    // Need to check the dimentions and weight for each product before save (refresh) parameters of the particular Container Group
    //..

    let containerGroupList = this.state.containerGroupList;
    obj.id = _getUUID();
    obj.productList ? obj.productList = obj.productList : obj.productList = [];
    containerGroupList.push(obj);
    this.setState({ containerGroupList });
    this.updateContainerGroupFormState('clearForm');
    this.addContainerGroupFormToggler(false);
    show({ text: `It's Ok. Container Group saved as ${obj.name}...`, pos: 'top-right', customClass: 'snackbar-primary', duration: 10000 });
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
      comment = this.state.containerGroupFormState.comment;
    let _getNumericValue = (val) => {
      return (val!=="" && !isNaN(val)) ? Number(val) : "";
    };
    switch(propName){
      case 'name': this.setState({containerGroupFormState: {name: e.target.value, length, height, width, carrying, productList, comment}}); break;
      case 'length':
        if(!isNaN(e.target.value)){
          this.setState({containerGroupFormState: {name, length: _getNumericValue(e.target.value), height, width, carrying, productList, comment}}); break;
        }else{};
        break;
      case 'height':
        if(!isNaN(e.target.value)){
          this.setState({containerGroupFormState: {name, length, height: _getNumericValue(e.target.value), width, carrying, productList, comment}}); break;
        }else{};
        break;
      case 'width':
        if(!isNaN(e.target.value)){
          this.setState({containerGroupFormState: {name, length, height, width: _getNumericValue(e.target.value), carrying, productList, comment}}); break;
        }else{};
        break;
      case 'carrying':
        if(!isNaN(e.target.value)){
          this.setState({containerGroupFormState: {name, length, height, width, carrying: _getNumericValue(e.target.value), productList, comment}}); break;
        }else{};
        break;
      case 'comment':
        this.setState({containerGroupFormState: {name, length, height, width, carrying, productList, comment: e.target.value}});
        break;
      case 'clearForm':
        this.setState({containerGroupFormState: {name: '', length: '', height: '', width: '', carrying:'', productList:[], comment:''}});
        //console.log(`Attantion! The productList cleared in main state.`);
        break;
      default: break;
    }
  }
  editContainerGroup(id, productList) {
    this.addContainerGroupFormToggler(true);
    let containerGroupToEdit = this.state.containerGroupList.filter( (e, i) => e.id === id )[0];
    this.setState({ containerGroupFormState: {name: containerGroupToEdit.name, length: containerGroupToEdit.length, height: containerGroupToEdit.height, width: containerGroupToEdit.width, carrying: containerGroupToEdit.carrying, productList: productList, comment: containerGroupToEdit.comment} });
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
    show({ text: `Productlist for Container Group has updated...`, pos: 'top-right', customClass: 'snackbar-primary', duration: 2000 });
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
            <Button handlerClick={ this.test } iclassName='fa fa-question' tmp={'[ Test ]'} />
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
