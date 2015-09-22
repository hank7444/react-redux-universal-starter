import { Component } from 'react';

export default class RequireOrder extends Component {
  static onEnter(store) {
    return (nextState, transition) => {

      //console.log('store.getState()', store.getState());
      //console.log('transition', transition);

      const { tickets: { orderId }} = store.getState();


      const orderIdFromRouting = nextState.params.orderId;


      console.log('orderId', orderId);
      console.log('orderIdFromRouting', orderIdFromRouting);




      if (!orderId && !orderIdFromRouting) {
        // oops, not logged in, so can't be here!
        transition.to('/ticket');
      }
    };
  }

  render() {
    return this.props.children;
  }
}
