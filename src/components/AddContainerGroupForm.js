import React, { Component } from 'react';
import Button from './Button';
//css..

class AddContainerGroupForm extends Component {
  constructor(props){
    super(props);
    this.state = {}
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
        <div className='well well-sm'>
          <h4>AddContainerGroupForm</h4>
          <label>Name</label>
          <input onChange={this.props.updateContainerGroupFormState.bind(this, 'name')} value={this.props.containerGroupFormState.name}></input>
          <label>Length, mm</label>
          <input onChange={this.props.updateContainerGroupFormState.bind(this, 'length')} value={this.props.containerGroupFormState.length}></input>
          <label>Width, mm</label>
          <input onChange={this.props.updateContainerGroupFormState.bind(this, 'width')} value={this.props.containerGroupFormState.width}></input>
          <label>Height, mm</label>
          <input onChange={this.props.updateContainerGroupFormState.bind(this, 'height')} value={this.props.containerGroupFormState.height}></input>
          <label>Carrying, kg</label>
          <input onChange={this.props.updateContainerGroupFormState.bind(this, 'carrying')} value={this.props.containerGroupFormState.carrying}></input>

          <div className='text-right'>
            <div className='btn-group' role='group'>
              <Button handlerClick={this.saveContainerGroup.bind(this)} iclassName='fa fa-plus' tmp='[ Save Container ]' bsBtnClassName={`btn-primary`} ></Button>
              <Button handlerClick={this.props.addContainerGroupFormToggler.bind(this, false)} iclassName='fa fa-chevron-up' tmp={'[ Close Form ]'} bsBtnClassName={`btn-danger`} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddContainerGroupForm;
