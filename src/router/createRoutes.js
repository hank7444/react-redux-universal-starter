import React from 'react';
import {Route} from 'react-router';
import App from '../pages/App';
import Home from '../pages/Home';
import Widgets from '../pages/Widgets';
import About from '../pages/About';
import Login from '../pages/Login';
import RequireLogin from '../pages/RequireLogin';
import LoginSuccess from '../pages/LoginSuccess';
import Survey from '../pages/Survey';
import NotFound from '../pages/NotFound';

import Ticket from '../pages/ticket/Ticket';
import TicketStep2 from '../pages/ticket/TicketStep2';
import TicketStep3 from '../pages/ticket/TicketStep3';
import RequireOrderId from '../pages/ticket/RequireOrderId';
import RequireGoStep3 from '../pages/ticket/RequireGoStep3';



// NotFound要記得放到最後面，這邊會照順序一路往下找對應的router
export default function(store) {
  return (
    <Route component={App}>
      <Route path="/" component={Home}/>
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
