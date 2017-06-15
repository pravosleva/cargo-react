import React, { Component } from 'react';
import '../css/App.css';
import Button from './Button';
import AddContainerGroupForm from './AddContainerGroupForm';
import ContainerGroupList from './ContainerGroupList';

/*
*                             COMPONENT STRUCTURE
*
* - App | state = {name, length, width, height, carrying}
*   |   |-- AddContainerGroupForm
*   |   |-- ContainerGroupList
*   |   |   |-- Cargo
*   |   |   |   |-- AddProductForm | state = {name}
*   |   |   |   |-- ProductList
*/

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      addContainerFormOpened: props.defaultAddContainerGroupFormOpened,
      containerGroupFormState: {name: '', length: '', width: '', height: '', carrying: ''},
      containerGroupList: []
    }
    this.updateContainerGroupFormState = this.updateContainerGroupFormState.bind(this);
    this.saveContainerGroup = this.saveContainerGroup.bind(this);
    this.removeContainerGroup = this.removeContainerGroup.bind(this);
    this.editContainerGroup = this.editContainerGroup.bind(this);
    this.addContainerGroupFormToggler = this.addContainerGroupFormToggler.bind(this);
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
    containerGroupList.push(obj);
    this.setState({ containerGroupList });
    this.updateContainerGroupFormState('clearForm');
    this.addContainerGroupFormToggler(false)
  }
  removeContainerGroup(id) {
    let containerGroupList = this.state.containerGroupList.filter( (e, i) => e.id !== id );
    this.setState({ containerGroupList });
  }
  updateContainerGroupFormState(propName, e) {
    //console.log(`e.target.value before: ${e.target.value}`);
    switch(propName){
      case 'name': this.setState({containerGroupFormState: {name: e.target.value, length: this.state.containerGroupFormState.length, height: this.state.containerGroupFormState.height, width: this.state.containerGroupFormState.width, carrying: this.state.containerGroupFormState.carrying}}); break;
      case 'length': this.setState({containerGroupFormState: {name: this.state.containerGroupFormState.name, length: e.target.value, height: this.state.containerGroupFormState.height, width: this.state.containerGroupFormState.width, carrying: this.state.containerGroupFormState.carrying}}); break;
      case 'height': this.setState({containerGroupFormState: {name: this.state.containerGroupFormState.name, length: this.state.containerGroupFormState.length, height: e.target.value, width: this.state.containerGroupFormState.width, carrying: this.state.containerGroupFormState.carrying}}); break;
      case 'width': this.setState({containerGroupFormState: {name: this.state.containerGroupFormState.name, length: this.state.containerGroupFormState.length, height: this.state.containerGroupFormState.height, width: e.target.value, carrying: this.state.containerGroupFormState.carrying}}); break;
      case 'carrying': this.setState({containerGroupFormState: {name: this.state.containerGroupFormState.name, length: this.state.containerGroupFormState.length, height: this.state.containerGroupFormState.height, width: this.state.containerGroupFormState.width, carrying: e.target.value}}); break;
      case 'clearForm': this.setState({containerGroupFormState: {name: '', length: '', height: '', width: '', carrying:''}}); break;
      default: break;
    }
  }
  editContainerGroup(id) {
    this.addContainerGroupFormToggler(true);
    let containerGroupToEdit = this.state.containerGroupList.filter( (e, i) => e.id === id )[0];
    this.setState({ containerGroupFormState: {name: containerGroupToEdit.name, length: containerGroupToEdit.length, height: containerGroupToEdit.height, width: containerGroupToEdit.width} });
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
        this.updateContainerGroupFormState('clearForm');// clear always when the form should be closed manually
        break;
      default: this.setState({ addContainerFormOpened: !this.state.addContainerFormOpened });
    }
  }
  render() {
    return (
      <div className='container'>
        <h1>Cargo-React</h1>
        <div className='text-center' style={{marginBottom:'20px'}}>
          <Button handlerClick={ this.addContainerGroupFormToggler.bind(this, true) } iclassName='fa fa-plus' tmp={'[ Add Container ]'} />
        </div>

        <AddContainerGroupForm
          addContainerGroupFormToggler={this.addContainerGroupFormToggler.bind(this)}
          display={this.state.addContainerFormOpened ? 'block' : 'none'}
          containerGroupFormState={this.state.containerGroupFormState} updateContainerGroupFormState={this.updateContainerGroupFormState}
          saveContainerGroup={this.saveContainerGroup} />
        <ContainerGroupList containerGroupList={this.state.containerGroupList} removeContainerGroup={this.removeContainerGroup} editContainerGroup={this.editContainerGroup} />
      </div>
    );
  }
}

App.defaultProps={
  defaultAddContainerGroupFormOpened: true,
};

export default App;
