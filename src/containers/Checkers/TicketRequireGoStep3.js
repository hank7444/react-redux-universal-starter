import {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

@connect(state => ({goStep3: state.tickets.goStep3}))

export default class TicketRequireGoStep3 extends Component {

  static propTypes = {
    goStep3: PropTypes.bool,
    history: PropTypes.object.isRequired
  }

  componentWillMount() {
    const {history, goStep3} = this.props;
    if (!goStep3) {
      console.log('GO BACK TICKET! STEP3');
      setTimeout(() => {
        history.replaceState(null, '/ticket');
      });
    }
  }

  render() {
    return this.props.children;
  }
}
