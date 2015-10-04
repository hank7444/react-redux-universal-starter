import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as ticketActions from 'redux/modules/tickets';
import { TicketItem } from 'components';



/*
  看一次提醒自己一次，this.props要跟reducer的state做關聯才能在react中使用, 
  在這邊也可以整理自己要用的資料，把不必要的資料隱藏，避免誤用
*/
@connect(
  state => ({
    goStep2: state.tickets.goStep2,
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

export default class TicketStep2 extends Component {


  static fetchData(store, params, query) {
    return store.dispatch(ticketActions.getOrderById(params.orderId));
  }

  handleStep2Submit(e) {
    e.preventDefault();

    const orderId = this.props.orderId;
    let name = React.findDOMNode(this.refs.name).value.trim();
    let email = React.findDOMNode(this.refs.email).value.trim();
    let phone = React.findDOMNode(this.refs.phone).value.trim();
    let params = {
      name,
      phone,
      email
    };
    this.props.step2Submit(orderId, params);
  }

  render() {

    
    const {goStep2, orderData, error} = this.props;

    // 有沒有比較好的方法可以驗證物件屬性是否存在呢?
    let currency = 0;
    let total = 0;

    console.log('error', error);

    if (goStep2 && !error) {
      currency = orderData.amount.currency;
      total = orderData.amount.total;
    }



    //console.log('TicketStep2###:', orderData);

    return (goStep2 && 

      <div className="container">

        <h3>購票清單</h3>


        {error && 
        <div className="alert alert-danger alert-dismissible">
          {error}
        </div>}

        <table className="table">
          <thead>
            <tr className="active">
              <th>票種</th>
              <th>單價</th>
              <th>數量</th>
              <th>金額</th>
            </tr>
          </thead>
          <tbody>
            { orderData &&
              orderData.lineItems.map((ticket) => 
                <TicketItem key={ticket.id} data={ticket} amount={orderData.amount} />
              )
            }

            <tr className="warning">
              <td>總金額</td>
              <td></td>
              <td></td>
              <td>{currency} {total}</td>
            </tr>
          </tbody>
        </table>

        <h3>填寫個人資料</h3>

        <form>
          <div className="form-group">
            <label for="exampleInputEmail1">* 姓名</label>
            <input type="text" className="form-control" ref="name" placeholder=""/>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">* Email</label>
            <input type="email" className="form-control" ref="email" placeholder=""/>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">* 手機</label>
            <input type="text" className="form-control" ref="phone" placeholder=""/>
          </div>

          <button className="btn btn-primary btn-lg" onClick={::this.handleStep2Submit}>確認表單資料</button>
        </form>

      </div>
    );
  }





}