import React, { Component } from 'react';
//css..

class Button extends Component {
  constructor(props){
    super(props);
    this.handlerClick = this.handlerClick.bind(this);
  }
  handlerClick() { this.props.handlerClick() }
  render() {
    return (
      <button disabled={this.props.disabled} type='button' className={this.props.bsBtnClassName?`btn btn-sm ${this.props.bsBtnClassName}`:`btn btn-sm btn-default`} onClick={this.handlerClick}>
        <i className={this.props.iclassName}></i>{ this.props.tmp ? <span>&nbsp;{this.props.tmp}</span> : null }
      </button>
    );
  }
}

export default Button;
