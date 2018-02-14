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
      comment = this.props.containerGroupFormState.comment,
      hiringPrice = this.props.containerGroupFormState.hiringPrice,
      currency = this.props.containerGroupFormState.currency;
    this.props.saveContainerGroup({name, length, width, height, carrying, productList: this.props.containerGroupFormState.productList, comment, hiringPrice, currency});
  }
  render() {
    let currency = this.props.containerGroupFormState.currency;
    return (
      <div style={{display: this.props.display}}>
        <div className='panel panel-default'>
          <div className='panel-heading'>AddContainerGroupForm</div>

          <div className='panel-body'>
            <div className='row'>
              <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'>

                <label>Container Group name</label>
                <input className='form-control input-sm' onChange={this.props.updateContainerGroupFormState.bind(this, 'name', this.props.containerGroupFormState.productList)} value={this.props.containerGroupFormState.name} />

                <label>Carrying of one unit, kg</label>
                <input className='form-control input-sm' onChange={this.props.updateContainerGroupFormState.bind(this, 'carrying', this.props.containerGroupFormState.productList)} value={this.props.containerGroupFormState.carrying} />

                <label>Hiring Price of one unit</label>
                <div className="input-group">
                  <input className='form-control input-sm' onChange={this.props.updateContainerGroupFormState.bind(this, 'hiringPrice', this.props.containerGroupFormState.productList)} value={this.props.containerGroupFormState.hiringPrice} />
                  <span className="input-group-btn dropdown">
                    <button className={currency===""?"btn btn-sm btn-secondary dropdown-toggle btn-danger":"btn btn-sm btn-secondary dropdown-toggle btn-default"} type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {currency===""?<span>CURRENCY</span>:<span>{currency}</span>}&nbsp;&nbsp;<span className="caret"></span>
                    </button>
                    <div className="dropdown-menu" role="menu">
                      <button type="button"
                        className="dropdown-item"
                        value="EUR"
                        onClick={this.props.updateContainerGroupFormState.bind(this, 'currency', this.props.containerGroupFormState.productList)}
                        >EUR</button>
                      <button type="button"
                        className="dropdown-item"
                        value="RUB"
                        onClick={this.props.updateContainerGroupFormState.bind(this, 'currency', this.props.containerGroupFormState.productList)}
                        >RUB</button>
                      <button type="button"
                        className="dropdown-item"
                        value="USD"
                        onClick={this.props.updateContainerGroupFormState.bind(this, 'currency', this.props.containerGroupFormState.productList)}
                        >USD</button>
                    </div>
                  </span>
                </div>

              </div>

              <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'>
                <label>Length of one unit, mm</label>
                <input className='form-control input-sm' onChange={this.props.updateContainerGroupFormState.bind(this, 'length', this.props.containerGroupFormState.productList)} value={this.props.containerGroupFormState.length} />
                <label>Width of one unit, mm</label>
                <input className='form-control input-sm' onChange={this.props.updateContainerGroupFormState.bind(this, 'width', this.props.containerGroupFormState.productList)} value={this.props.containerGroupFormState.width} />
                <label>Height of one unit, mm</label>
                <input className='form-control input-sm' onChange={this.props.updateContainerGroupFormState.bind(this, 'height', this.props.containerGroupFormState.productList)} value={this.props.containerGroupFormState.height} />
              </div>
              <div className='col-lg-6 col-md-4 col-sm-4 col-xs-12'>
                <label>Comment</label>
                <textarea className='form-control input-sm' onChange={this.props.updateContainerGroupFormState.bind(this, 'comment', this.props.containerGroupFormState.productList)} value={this.props.containerGroupFormState.comment}></textarea>
              </div>
            </div>

            <hr />

            <p className='text-muted'>
              Will you please enter the parameters for each Container of this containerGroup
              <br />
              {`this.props.containerGroupFormState.productList = ${JSON.stringify(this.props.containerGroupFormState.productList)}`}
            </p>

          </div>

          <div className='panel-footer'>
            <div className='text-right'>
              <div className='btn-group' role='group'>
                <Button handlerClick={this.saveContainerGroup.bind(this)} iclassName='fa fa-plus' tmp='Save Container' bsBtnClassName={`btn-primary`} ></Button>
                <Button handlerClick={this.props.addContainerGroupFormToggler.bind(this, false)} iclassName='fa fa-chevron-up' tmp={'Close Form'} bsBtnClassName={`btn-danger`} />
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default AddContainerGroupForm;
