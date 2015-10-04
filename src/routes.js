import React from 'react';
import {Redirect, Route} from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Widgets from './containers/Widgets';
import About from './containers/About';
import Login from './containers/Login';
import RequireLogin from './containers/RequireLogin';
import LoginSuccess from './containers/LoginSuccess';
import Survey from './containers/Survey';
import NotFound from './containers/NotFound';

import Ticket from './containers/ticket/Ticket';
import TicketStep2 from './containers/ticket/TicketStep2';
import TicketStep3 from './containers/ticket/TicketStep3';
import RequireOrderId from './containers/ticket/RequireOrderId';
import RequireGoStep3 from './containers/ticket/RequireGoStep3';


// NotFound要記得放到最後面，這邊會照順序一路往下找對應的router
export default function(store) {

  //console.log(IndexRoute);
  return (


    <Route path="/" component={App}>

      
      <Route path="/widgets" component={Widgets}/>
      <Route path="/about" component={About}/>
      <Route path="/login" component={Login}/>
      <Route path="/ticket" component={Ticket}/>

      <Route component={RequireOrderId} onEnter={RequireOrderId.onEnter(store)}>
        <Route path="/ticketStep2" component={TicketStep2}/>
        <Route path="/ticketStep2/:orderId" component={TicketStep2}/>
      </Route>

      <Route component={RequireGoStep3} onEnter={RequireGoStep3.onEnter(store)}>
        <Route path="/ticketStep3" component={TicketStep3}/>
      </Route>

      {/* 登入後才能進去的頁面寫在這裡 */}
      <Route component={RequireLogin} onEnter={RequireLogin.onEnter(store)}>
        <Route path="/loginSuccess" component={LoginSuccess}/>
      </Route>
      <Route path="/survey" component={Survey}/>
      <Route path="*" component={NotFound}/>
    </Route>

  
     
  );
}
