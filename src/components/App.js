import React, { Component } from 'react';
//import '../css/App.css';
import Button from './Button';
import AddContainerGroupForm from './AddContainerGroupForm';
import ContainerGroupList from './ContainerGroupList';

/*
*                             COMPONENT STRUCTURE
*
* - App
    state = {
      addContainerFormOpened: bool,
      containerGroupFormState: {name: str, length: num, width: num, height: num, carrying: num, productList: arr, comment: str},
      containerGroupList: arr
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
  }
  saveContainerGroup(obj) {
    let _getUUID = () => {
      let newUUID = ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      }));
      return newUUID;
    };

    let containerGroupList = this.state.containerGroupList;
    obj.id = _getUUID();
    obj.productList ? obj.productList = obj.productList : obj.productList = [];
    containerGroupList.push(obj);
    this.setState({ containerGroupList });
    this.updateContainerGroupFormState('clearForm');
    this.addContainerGroupFormToggler(false)
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
    switch(propName){
      case 'name': this.setState({containerGroupFormState: {name: e.target.value, length, height, width, carrying, productList, comment}}); break;
      case 'length': this.setState({containerGroupFormState: {name, length: e.target.value, height, width, carrying, productList, comment}}); break;
      case 'height': this.setState({containerGroupFormState: {name, length, height: e.target.value, width, carrying, productList, comment}}); break;
      case 'width': this.setState({containerGroupFormState: {name, length, height, width: e.target.value, carrying, productList, comment}}); break;
      case 'carrying': this.setState({containerGroupFormState: {name, length, height, width, carrying: e.target.value, productList, comment}}); break;
      case 'comment': this.setState({containerGroupFormState: {name, length, height, width, carrying, productList, comment: e.target.value}}); break;
      case 'clearForm':
        this.setState({containerGroupFormState: {name: '', length: '', height: '', width: '', carrying:'', productList:[], comment:''}});
        console.log(`Attantion! The productList cleared in main state.`);
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
  }
  render() {
    return (
      <div className='container'>
        <h1>Cargo-React</h1>
        <div className='text-center' style={{marginBottom:'5px'}}>
          <Button handlerClick={ this.addContainerGroupFormToggler.bind(this, true) } iclassName='fa fa-plus' tmp={'[ Add Container ]'} />
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
  defaultAddContainerGroupFormOpened: true,
};

export default App;
