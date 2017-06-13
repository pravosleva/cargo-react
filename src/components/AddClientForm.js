import React, { Component } from 'react';
import Button from './Button';
//css..

class AddClientForm extends Component {
  constructor(props){
    super(props);
  }
  saveClient(){
    let name = this.props.formState.name,
      email = this.props.formState.email,
      phone = this.props.formState.phone;
    this.props.saveClient({name, email, phone});
  }
  render() {
    return (
      <div style={{display: this.props.display}}>
        <hr />
        <h2>AddClientForm</h2>
        <label>Name</label>
        <input onChange={this.props.updateFormState.bind(this, 'name')} value={this.props.formState.name}></input>
        <label>Phone</label>
        <input onChange={this.props.updateFormState.bind(this, 'phone')} value={this.props.formState.phone}></input>
        <label>Email</label>
        <input onChange={this.props.updateFormState.bind(this, 'email')} value={this.props.formState.email}></input>
        <button onClick={this.saveClient.bind(this)}>[ Save Client ]</button>
        <br />
        <Button handlerClick={this.props.addClientFormToggler.bind(this, false)} iclassName='fa fa-chevron-up' tmp={'[ Left Arrow to close Form ]'} />
        <Button handlerClick={this.props.addClientFormToggler.bind(this, false)} iclassName='fa fa-chevron-up' tmp={'[ Right Arrow to close Form ]'} />
        <hr />
      </div>
    );
  }
}

export default AddClientForm;
