import React, { Component } from 'react';
import '../css/App.css';
import Button from './Button';
import AddContainerForm from './AddContainerForm';
import ContainerList from './ContainerList';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      addContainerFormOpened: props.defaultAddContainerFormOpened,
      containerFormState: {name: '', length: '', width: '', height: '', carrying: ''},
      containerList: []
    }
    this.updateContainerFormState = this.updateContainerFormState.bind(this);
    this.saveContainer = this.saveContainer.bind(this);
    this.removeContainer = this.removeContainer.bind(this);
    this.editContainer = this.editContainer.bind(this);
    this.addContainerFormToggler = this.addContainerFormToggler.bind(this);
  }
  saveContainer(obj) {
    let _getUUID = () => {
      let newUUID = ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      }));
      return newUUID;
    };

    let containerList = this.state.containerList;
    obj.id = _getUUID();
    containerList.push(obj);
    this.setState({ containerList });
    this.updateContainerFormState('clearForm');
    this.addContainerFormToggler(false)
  }
  removeContainer(id) {
    let containerList = this.state.containerList.filter( (e, i) => e.id !== id );
    this.setState({ containerList });
  }
  updateContainerFormState(propName, e) {
    //console.log(`e.target.value before: ${e.target.value}`);
    switch(propName){
      case 'name': this.setState({containerFormState: {name: e.target.value, length: this.state.containerFormState.length, height: this.state.containerFormState.height, width: this.state.containerFormState.width, carrying: this.state.containerFormState.carrying}}); break;
      case 'length': this.setState({containerFormState: {name: this.state.containerFormState.name, length: e.target.value, height: this.state.containerFormState.height, width: this.state.containerFormState.width, carrying: this.state.containerFormState.carrying}}); break;
      case 'height': this.setState({containerFormState: {name: this.state.containerFormState.name, length: this.state.containerFormState.length, height: e.target.value, width: this.state.containerFormState.width, carrying: this.state.containerFormState.carrying}}); break;
      case 'width': this.setState({containerFormState: {name: this.state.containerFormState.name, length: this.state.containerFormState.length, height: this.state.containerFormState.height, width: e.target.value, carrying: this.state.containerFormState.carrying}}); break;
      case 'carrying': this.setState({containerFormState: {name: this.state.containerFormState.name, length: this.state.containerFormState.length, height: this.state.containerFormState.height, width: this.state.containerFormState.width, carrying: e.target.value}}); break;
      case 'clearForm': this.setState({containerFormState: {name: '', length: '', height: '', width: '', carrying:''}}); break;
      default: break;
    }
  }
  editContainer(id) {
    this.addContainerFormToggler(true);
    let clientToEdit = this.state.containerList.filter( (e, i) => e.id === id )[0];
    this.setState({ containerFormState: {name: clientToEdit.name, length: clientToEdit.length, height: clientToEdit.height, width: clientToEdit.width} });
    this.removeContainer(id);
  }
  componentDidUpdate() {
    //console.log(JSON.stringify(this.state.containerFormState));
  }
  addContainerFormToggler(is_it_should_be_opened) {
    switch(is_it_should_be_opened){
      case true: this.setState({ addContainerFormOpened: is_it_should_be_opened }); break;
      case false:
        this.setState({ addContainerFormOpened: is_it_should_be_opened });
        this.updateContainerFormState('clearForm');// clear always when the form should be closed manually
        break;
      default: this.setState({ addContainerFormOpened: !this.state.addContainerFormOpened });
    }
  }
  render() {
    return (
      <div className='App'>
        <Button handlerClick={ this.addContainerFormToggler.bind(this, true) } iclassName='fa fa-plus' tmp={'[ Add Container ]'} />

        <AddContainerForm
          addContainerFormToggler={this.addContainerFormToggler.bind(this)}
          display={this.state.addContainerFormOpened ? 'block' : 'none'}
          containerFormState={this.state.containerFormState} updateContainerFormState={this.updateContainerFormState}
          saveContainer={this.saveContainer} />
        <ContainerList containerList={this.state.containerList} removeContainer={this.removeContainer} editContainer={this.editContainer} />
      </div>
    );
  }
}

App.defaultProps={
  defaultAddContainerFormOpened: true,
};

export default App;
