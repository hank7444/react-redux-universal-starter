import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';


/*
@connect(
  state => ({
    ticket: state.ticket
  })
)
*/

export default class TicketItem extends Component {
  static propTypes = {
    //time: PropTypes.number
  }

  handleChange(e) {
    var value = e.target.value;
    //console.log('value: ', value);
    this.props.editItemNumber(value)
  }


  render() {

    const {id, name, unitPrice, quantity} = this.props.data;

    if (this.props.editItemNumber) {
      return (
        <tr>
          <td>{name}</td>
          <td>{unitPrice}</td>
          <td>{(quantity || 0) * unitPrice}</td>
          <td>
            <input type="text" style={{width: 50}} className="form-control" value={quantity || 0} 
                   id={id} onChange={this.handleChange.bind(this)}/>
          </td>
        </tr>
      );
    } else {

      const {currency} = this.props.amount;

      return (
         <tr>
          <td>{name}</td>
          <td>{currency} {unitPrice}</td>
          <td>{quantity || 0}</td>
          <td>{currency} {(quantity || 0) * unitPrice}</td>
        </tr>
      )

    }
  }
}
