import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as ticketActions from 'redux/modules/tickets';
import { TicketItem } from 'components';

@connect(
  state => ({
    orderId: state.tickets.orderId,
    orderData: state.tickets.orderData,
    error: state.tickets.error,
    loading: state.tickets.loading
  }),
  dispatch => ({
    ...bindActionCreators({
      ...ticketActions,
    }, dispatch)
  })
)


/*

如果是this.props的function, 要用已下寫法
editNumber={() => completeTodo(param1, param2)}

如果是Component本身的function, 要這樣寫來綁定
onChange={this.handleChange.bind(this, param1, param2)}

或是es6寫法
onChange={::this.handleEdit(param1, param2, ...)}
*/

export default class TicketStep3 extends Component {

  

  render() {

    const thankyou = require('../../img/thankyou.png');
    const containerStyle =  {
      'text-align': 'center'
    };

    return (

      <div className="container" style={containerStyle}>
        
        <h2>Thank you!</h2>

          <img src={thankyou} width="400"></img>
      
      </div>
    );
  }


}