import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as ticketActions from 'redux/modules/tickets';
import { TicketItem } from 'components';

@connect(
  state => ({
    goStep3: state.tickets.goStep3,
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

  static propTypes = {
    goStep3: PropTypes.bool,
  }

  // 判斷時, 不可是undefined, 要為null, 不然react會出錯
  render() {

    const {goStep3} = this.props;
    const thankyou = require('../../img/thankyou.png');
    const containerStyle =  {
      'textAlign': 'center'
    };

    console.log('goStep3', goStep3);

    return (goStep3 && 

      <div className="container" style={containerStyle}>
        
        <h2>Thank you!</h2>

          <img src={thankyou} width="400"></img>
      
      </div>
    );
  }

}