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
      carrying = this.props.containerGroupFormState.carrying,
      comment = this.props.containerGroupFormState.comment;
    this.props.saveContainerGroup({name, length, width, height, carrying, productList: this.props.containerGroupFormState.productList, comment});
  }
  render() {
    return (
      <div style={{display: this.props.display}}>
        <div className='panel panel-default'>
          <div className='panel-heading'>AddContainerGroupForm</div>

          <div className='panel-body'>
            <div className='row'>
              <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'>
                <label>Name</label>
                <input className='form-control input-sm' onChange={this.props.updateContainerGroupFormState.bind(this, 'name', this.props.containerGroupFormState.productList)} value={this.props.containerGroupFormState.name}></input>
                <label>Carrying, kg</label>
                <input className='form-control input-sm' onChange={this.props.updateContainerGroupFormState.bind(this, 'carrying', this.props.containerGroupFormState.productList)} value={this.props.containerGroupFormState.carrying}></input>
              </div>
              <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'>
                <label>Length, mm</label>
                <input className='form-control input-sm' onChange={this.props.updateContainerGroupFormState.bind(this, 'length', this.props.containerGroupFormState.productList)} value={this.props.containerGroupFormState.length}></input>
                <label>Width, mm</label>
                <input className='form-control input-sm' onChange={this.props.updateContainerGroupFormState.bind(this, 'width', this.props.containerGroupFormState.productList)} value={this.props.containerGroupFormState.width}></input>
                <label>Height, mm</label>
                <input className='form-control input-sm' onChange={this.props.updateContainerGroupFormState.bind(this, 'height', this.props.containerGroupFormState.productList)} value={this.props.containerGroupFormState.height}></input>
              </div>
              <div className='col-lg-6 col-md-4 col-sm-4 col-xs-12'>
                <label>Comment</label>
                <textarea className='form-control input-sm' onChange={this.props.updateContainerGroupFormState.bind(this, 'comment', this.props.containerGroupFormState.productList)} value={this.props.containerGroupFormState.comment}></textarea>
              </div>
            </div>

            <hr />

            <p className='text-muted'>
              Enter parameters for each Container of this containerGroup
              <br />
              {`this.props.containerGroupFormState.productList = ${JSON.stringify(this.props.containerGroupFormState.productList)}`}
            </p>

          </div>

          <div className='panel-footer'>
            <div className='text-right'>
              <div className='btn-group' role='group'>
                <Button handlerClick={this.saveContainerGroup.bind(this)} iclassName='fa fa-plus' tmp='[ Save Container ]' bsBtnClassName={`btn-primary`} ></Button>
                <Button handlerClick={this.props.addContainerGroupFormToggler.bind(this, false)} iclassName='fa fa-chevron-up' tmp={'[ Close Form ]'} bsBtnClassName={`btn-danger`} />
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default AddContainerGroupForm;
