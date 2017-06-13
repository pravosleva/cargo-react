import React, { Component } from 'react';
import Button from './Button';
//css..

class AddContainerForm extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  saveContainer(){
    let name = this.props.containerFormState.name,
      length = this.props.containerFormState.length,
      width = this.props.containerFormState.width,
      height = this.props.containerFormState.height,
      carrying = this.props.containerFormState.carrying;
    this.props.saveContainer({name, length, width, height, carrying});
  }
  render() {
    return (
      <div style={{display: this.props.display}}>
        <hr />
        <h2>AddContainerForm</h2>
        <label>Name</label>
        <input onChange={this.props.updateContainerFormState.bind(this, 'name')} value={this.props.containerFormState.name}></input>
        <label>Length</label>
        <input onChange={this.props.updateContainerFormState.bind(this, 'length')} value={this.props.containerFormState.length}></input>
        <label>Width</label>
        <input onChange={this.props.updateContainerFormState.bind(this, 'width')} value={this.props.containerFormState.width}></input>
        <label>Height</label>
        <input onChange={this.props.updateContainerFormState.bind(this, 'height')} value={this.props.containerFormState.height}></input>
        <label>Carrying</label>
        <input onChange={this.props.updateContainerFormState.bind(this, 'carrying')} value={this.props.containerFormState.carrying}></input>
        <button onClick={this.saveContainer.bind(this)}>[ Save Container ]</button>
        <br />
        <Button handlerClick={this.props.addContainerFormToggler.bind(this, false)} iclassName='fa fa-chevron-up' tmp={'[ Left Arrow to close Form ]'} />
        <Button handlerClick={this.props.addContainerFormToggler.bind(this, false)} iclassName='fa fa-chevron-up' tmp={'[ Right Arrow to close Form ]'} />
        <hr />
      </div>
    );
  }
}

export default AddContainerForm;
