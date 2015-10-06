import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ticketActions from 'redux/modules/tickets';

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

export default class TicketStep3 extends Component {

  static propTypes = {
    goStep3: PropTypes.bool.isRequired
  }

  // 判斷時, 不可是undefined, 要為null, 不然react會出錯
  render() {

    const {goStep3} = this.props;
    const imgThankyou = require('./thankyou.png');
    const containerStyle = {
      'textAlign': 'center'
    };

    return (goStep3 &&

      <div className="container" style={containerStyle}>
        <h2>Thank you!</h2>
        <img src={imgThankyou} width="400"></img>
      </div>
    );
  }

}
