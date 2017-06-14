import React, { Component } from 'react';
import Button from './Button';
//css..

class AddProductForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: ''
    }
  }
  saveProduct(){
    let name = this.state.name;
    //..
  }
  updateForm(propName, e){
    switch(propName){
      case 'name': this.setState({name: e.target.value}); break;
      default: break;
    }
  }
  render() {
    return (
      <div style={{display: this.props.display}}>
        <hr />
        <strong>AddProductForm</strong><br />
        <label>Name</label>
        <input onChange={this.updateForm.bind(this, 'name')} value={this.state.name}></input>

        <button onClick={() => {console.log(`hello world`)}}>[ Save Product ]</button>

        <br /><span>Under construction...</span>
        <hr />
      </div>
    );
  }
}

export default AddProductForm;
