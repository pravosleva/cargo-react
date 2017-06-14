import React, { Component } from 'react';
import Button from './Button';
//css..

class AddContainerForm extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  saveContainerGroup(){
    let name = this.props.containerGroupFormState.name,
      length = this.props.containerGroupFormState.length,
      width = this.props.containerGroupFormState.width,
      height = this.props.containerGroupFormState.height,
      carrying = this.props.containerGroupFormState.carrying;
    this.props.saveContainerGroup({name, length, width, height, carrying});
  }
  render() {
    return (
      <div style={{display: this.props.display}}>
        <hr />
        <h2>AddContainerForm</h2>
        <label>Name</label>
        <input onChange={this.props.updateContainerGroupFormState.bind(this, 'name')} value={this.props.containerGroupFormState.name}></input>
        <label>Length</label>
        <input onChange={this.props.updateContainerGroupFormState.bind(this, 'length')} value={this.props.containerGroupFormState.length}></input>
        <label>Width</label>
        <input onChange={this.props.updateContainerGroupFormState.bind(this, 'width')} value={this.props.containerGroupFormState.width}></input>
        <label>Height</label>
        <input onChange={this.props.updateContainerGroupFormState.bind(this, 'height')} value={this.props.containerGroupFormState.height}></input>
        <label>Carrying</label>
        <input onChange={this.props.updateContainerGroupFormState.bind(this, 'carrying')} value={this.props.containerGroupFormState.carrying}></input>
        <button onClick={this.saveContainerGroup.bind(this)}>[ Save Container ]</button>
        <br />
        <Button handlerClick={this.props.addContainerGroupFormToggler.bind(this, false)} iclassName='fa fa-chevron-up' tmp={'[ Left Arrow to close Form ]'} />
        <Button handlerClick={this.props.addContainerGroupFormToggler.bind(this, false)} iclassName='fa fa-chevron-up' tmp={'[ Right Arrow to close Form ]'} />
        <hr />
      </div>
    );
  }
}

export default AddContainerForm;
