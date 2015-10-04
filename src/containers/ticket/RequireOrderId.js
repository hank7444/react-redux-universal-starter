import {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

@connect(state => ({orderId: state.tickets.orderId}))

export default class RequireOrder extends Component {

  static propTypes = {
    orderId: PropTypes.string,
    history: PropTypes.object.isRequired
  }

  componentWillMount() {
    const {history, orderId} = this.props;
    if (!orderId) {
      console.log('GO BACK TICKET!');
      setTimeout(() => {
        history.replaceState(null, '/ticket');
      });
    }
  }

  render() {
    return this.props.children;
  }
}

