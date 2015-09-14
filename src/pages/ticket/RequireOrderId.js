import {Component} from 'react';

export default class RequireOrder extends Component {
  static onEnter(store) {
    return (nextState, transition) => {
      const { tickets: { orderId }} = store.getState();


      if (!orderId) {
        // oops, not logged in, so can't be here!
        transition.to('/ticket');
      }
    };
  }

  render() {
    return this.props.children;
  }
}
