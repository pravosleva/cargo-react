import React, { Component } from 'react';
import '../css/App.css';
import Button from './Button';
import AddClientForm from './AddClientForm';
import ClientList from './ClientList';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      addClientFormOpened: props.defaultAddClientFormOpened,
      formState: {name: '', email: '', phone: ''},
      clientList: []
    }
    this.updateFormState = this.updateFormState.bind(this);
    this.saveClient = this.saveClient.bind(this);
    this.removeClient = this.removeClient.bind(this);
    this.editClient = this.editClient.bind(this);
    this.addClientFormToggler = this.addClientFormToggler.bind(this);
  }
  saveClient(obj) {
    let _getUUID = () => {
      let newUUID = ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      }));
      return newUUID;
    };

    let clientList = this.state.clientList;
    obj.id = _getUUID();
    clientList.push(obj);
    this.setState({ clientList });
    this.updateFormState('clearForm');
    this.addClientFormToggler(false)
  }
  removeClient(id) {
    let clientList = this.state.clientList.filter( (e, i) => e.id !== id );
    this.setState({ clientList });
  }
  updateFormState(propName, e) {
    //console.log(`e.target.value before: ${e.target.value}`);
    switch(propName){
      case 'name': this.setState({formState: {name: e.target.value, email: this.state.formState.email, phone: this.state.formState.phone}}); break;
      case 'email': this.setState({formState: {name: this.state.formState.name, email: e.target.value, phone: this.state.formState.phone}}); break;
      case 'phone': this.setState({formState: {name: this.state.formState.name, email: this.state.formState.email, phone: e.target.value}}); break;
      case 'clearForm': this.setState({formState: {name: '', email: '', phone: ''}}); break;
      default: break;
    }
  }
  editClient(id) {
    this.addClientFormToggler(true)
    let clientToEdit = this.state.clientList.filter( (e, i) => e.id === id )[0];
    this.setState({ formState: {name: clientToEdit.name, email: clientToEdit.email, phone: clientToEdit.phone} });
    this.removeClient(id);
  }
  componentDidUpdate() {
    //console.log(JSON.stringify(this.state.formState));
  }
  addClientFormToggler(is_it_should_be_opened) {
    switch(is_it_should_be_opened){
      case true: this.setState({ addClientFormOpened: is_it_should_be_opened }); break;
      case false:
        this.setState({ addClientFormOpened: is_it_should_be_opened });
        this.updateFormState('clearForm');// clear always when the form should be closed manually
        break;
      default: this.setState({ addClientFormOpened: !this.state.addClientFormOpened });
    }
  }
  render() {
    return (
      <div className='App'>
        <Button handlerClick={ this.addClientFormToggler.bind(this, true) } iclassName='fa fa-plus' tmp={'[ Добавить клиента ]'} />
        <Button handlerClick={ () => {console.log(`hello world`)} } iclassName='fa fa-close' tmp={'[ Крестик в правом верхнем углу без функционала ]'} />
        <AddClientForm
          addClientFormToggler={this.addClientFormToggler.bind(this)}
          display={this.state.addClientFormOpened ? 'block' : 'none'}
          formState={this.state.formState} updateFormState={this.updateFormState}
          saveClient={this.saveClient} />
        <ClientList clientList={this.state.clientList} removeClient={this.removeClient} editClient={this.editClient} />
      </div>
    );
  }
}

App.defaultProps={
  defaultAddClientFormOpened: false,
};

export default App;
