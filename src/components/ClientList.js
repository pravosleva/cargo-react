import React, { Component } from 'react';
import Button from './Button';
//css..

class ClientList extends Component {
  constructor(props){
    super(props);

  }
  render() {
    let thead = <tr><th>Btns</th><th>Клиент</th><th>Телефон</th><th>E-mail</th><th>_</th><th>_</th><th>_</th><th>_</th></tr>,
      tbody = this.props.clientList.map(
        function(e, i){ return <tr key={i}><td><Button iclassName='fa fa-pencil' handlerClick={this.props.editClient.bind(this, e.id)} tmp={'[ Edit ]'} /><Button iclassName='fa fa-close' handlerClick={this.props.removeClient.bind(this, e.id)} tmp={'[ Remove ]'} /></td><td>{e.name}</td><td>{e.phone}</td><td>{e.email}</td><td>------</td><td>------</td><td>------</td><td>------</td></tr> },
        this
      );
    if(this.props.clientList.length!==0){
      return (
        <div>
          <h2>ClientList</h2>
          <table>
            <thead>
              {thead}
            </thead>
            <tbody>
              {tbody}
            </tbody>
          </table>
        </div>
      );
    }else{return null}
  }
}

export default ClientList;
