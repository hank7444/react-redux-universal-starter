import React, { Component, PropTypes } from 'react';

export default class TicketItem extends Component {

  static propTypes = {
    editItemNumber: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    amount: PropTypes.object.isRequired
  }

  handleChange(event) {
    const value = event.target.value;
    this.props.editItemNumber(value);
  }

  render() {

    const {id, name, unitPrice, quantity} = this.props.data;
    const {editItemNumber} = this.props;

    console.log('this.props', this.props);

    if (editItemNumber) {

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
    }

    const {currency} = this.props.amount;

    return (
       <tr>
        <td>{name}</td>
        <td>{currency} {unitPrice}</td>
        <td>{quantity || 0}</td>
        <td>{currency} {(quantity || 0) * unitPrice}</td>
      </tr>
    );
  }
}
