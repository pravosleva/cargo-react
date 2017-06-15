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
      <button className="btn btn-sm btn-default" onClick={this.handlerClick}>
        <i className={this.props.iclassName}></i>{this.props.tmp?` ${this.props.tmp}`:``}
      </button>
    );
  }
}

export default Button;
