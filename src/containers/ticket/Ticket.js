import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { load as loadTickets } from 'redux/modules/tickets';
import * as ticketActions from 'redux/modules/tickets';
import { TicketItem } from 'components';

@connect(
  state => ({
    tickets: state.tickets,
    error: state.tickets.error,
    loading: state.tickets.loading
  }),
  /*
  dispatch => ({
    ...bindActionCreators({
      ...ticketActions,
    }, dispatch)
  })
  */
  dispatch => bindActionCreators({
    ...ticketActions,
  }, dispatch)
)


/*

如果是this.props的function, 要用已下寫法
editNumber={() => completeTodo(param1, param2)}

如果是Component本身的function, 要這樣寫來綁定
onChange={this.handleChange.bind(this, param1, param2)}

或是es6寫法
onChange={::this.handleEdit(param1, param2, ...)}
*/

export default class Ticket extends Component {

  // 從this.porps來的記得要寫
  static propTypes = {
    tickets: PropTypes.object.isRequired,
    editItemNumber: PropTypes.func.isRequired,
    step1Submit: PropTypes.func.isRequired

    // 如果是component內自己的屬性就不用寫在這，因為也驗證不到
    // handleStep1Submit: PropTypes.func.isRequired
  };


  static fetchData(getState, dispatch) {
    // if (!isLoaded(store.getState())) {
    return dispatch(loadTickets());
    // }
  }


  handleStep1Submit(event) {
    event.preventDefault();
    const {tickets, step1Submit} = this.props;
    step1Submit(tickets.eventId, tickets.data);
  }


  render() {

    const banner = require('./banner.jpg');
    const {tickets, editItemNumber} = this.props;
    const bannerStyle = {
      'textAlign': 'center'
    };

    return (

      <div className="container">

        <div style={bannerStyle}>
          <img src={banner}/>
        </div>
        <h3>貢寮海洋音樂祭</h3>

        {/* 外面至少要有一個html元件不然會壞掉.. */}
        {tickets.error &&
        <div className="alert alert-danger alert-dismissible">
          {tickets.error.errorCode}
        </div>}

        <table className="table">
          <thead>
            <tr className="active">
              <th>票種</th>
              <th>票價</th>
              <th>總價</th>
              <th>數量</th>
            </tr>
          </thead>
          <tbody>
            {tickets && tickets.data.map((ticket) =>
                <TicketItem key={ticket.id} data={ticket} editItemNumber={(value) => editItemNumber(ticket.id, value)}/>
            )}
          </tbody>
        </table>

        <button className="btn btn-primary btn-lg" onClick={::this.handleStep1Submit}>下一步</button>

      </div>
    );
  }
}
