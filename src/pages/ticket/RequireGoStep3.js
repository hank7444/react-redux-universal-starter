import {Component} from 'react';

export default class RequireGoStep3 extends Component {
  static onEnter(store) {
    return (nextState, transition) => {
       const { tickets: { goStep3 }} = store.getState();

      if (!goStep3) {
        // oops, not logged in, so can't be here!
        transition.to('/ticket');
      }
    };
  }

  render() {
    return this.props.children;
  }
}
