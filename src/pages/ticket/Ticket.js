import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {isLoaded, load as loadTickets} from '../../ducks/tickets';
import * as ticketActions from '../../ducks/tickets';
import TicketItem from '../../components/TicketItem';

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

  handleStep1Submit(e) {
    e.preventDefault();

    const {tickets, step1Submit} = this.props;
    this.props.step1Submit(tickets.eventId, tickets.data);
  }


  // 從this.porps來的記得要寫
  static propTypes = {
    tickets: PropTypes.object.isRequired,
    editItemNumber: PropTypes.func.isRequired,

    // 如果是component內自己的屬性就不用寫在這，因為也驗證不到
    // handleStep1Submit: PropTypes.func.isRequired
  };

  render() {

    //console.log('Tickets###:', this.props);

    const {tickets, editItemNumber} = this.props;

    return (

      <div className="container">
        <h3>測試活動</h3>


        {/* 外面至少要有一個html元件不然會壞掉.. */}
        {tickets.error && 
        <div className="alert alert-danger alert-dismissible">
          {tickets.error.ErrorCode}
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
            {tickets.data.map((ticket) => 
                <TicketItem key={ticket.id} data={ticket} editItemNumber={(value) => editItemNumber(ticket.id, value)}/>
              )
            }
          </tbody>
        </table>

        <button className="btn btn-primary btn-lg" onClick={::this.handleStep1Submit}>下一步</button>

      </div>
    );
  }


  static fetchData(store) {
    //if (!isLoaded(store.getState())) {
    return store.dispatch(loadTickets());
    //}
  }
}