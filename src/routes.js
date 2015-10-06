import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Home,
    Widgets,
    About,
    Login,
    LoginSuccess,
    Survey,
    NotFound,
    Ticket,
    TicketStep2,
    TicketStep3,

    RedirectToDefaultLocale,
    TicketRequireOrderId,
    TicketRequireGoStep3
  } from 'containers';


// NotFound要記得放到最後面，這邊會照順序一路往下找對應的router
export default (store) => {


  const requireLogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replaceState(null, '/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  return (
    <Router>
      {/* Redirect有bug, / -> /en 在client side會出錯 */}
      <Route path="/" component={RedirectToDefaultLocale} />
      <Route path="/:locale" component={App}>
        <IndexRoute component={Home} />

          <Route path="widgets" component={Widgets}/>
          <Route path="about" component={About}/>
          <Route path="login" component={Login}/>
          <Route path="ticket" component={Ticket}/>

          <Route component={TicketRequireOrderId}>
            <Route path="ticketStep2" component={TicketStep2}/>
            <Route path="ticketStep2/:orderId" component={TicketStep2}/>
          </Route>

          <Route component={TicketRequireGoStep3}>
            <Route path="ticketStep3" component={TicketStep3}/>
          </Route>

          {/* 登入後才能進去的頁面寫在這裡 */}
          <Route onEnter={requireLogin}>
            <Route path="loginSuccess" component={LoginSuccess}/>
          </Route>
          <Route path="survey" component={Survey}/>

        <Route path="*" component={NotFound} statis={404}/>
      </Route>
    </Router>

  );
};
