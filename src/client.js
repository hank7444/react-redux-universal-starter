/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/lib/createBrowserHistory';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import {Provider} from 'react-redux';
import {reduxReactRouter, ReduxRouter} from 'redux-router';
import {addLocaleData, IntlProvider} from 'react-intl';

import getRoutes from './routes';
import makeRouteHooksSafe from './helpers/makeRouteHooksSafe';

// 如果是這樣引入, 在webpack的js未載入時，會沒有bootstrap style
// global webpack引入style請放在這裡

/*
不要在這邊將global css放進來，因為無論是sass, css, 都不會依照順序放置
應該用一個共用的global.sass, 將其他css與sass import進來
*/


// require('./style/css/test2.css');
// require('./style/css/test.css');

// import './style/sass/global2.scss';
// import './style/sass/global.scss';


// 噢喔噢 成功了, 改變webpack css-loader順序，在sass-loader下即可

// include node_module/的css
// import "bootstrap/dist/css/bootstrap.css";

import './style/css/test.css';
import './style/css/test2.css';


import './style/sass/globalIndex.scss';
import './style/sass/global3.scss';


const client = new ApiClient();
const dest = document.getElementById('content');
const store = createStore(reduxReactRouter, makeRouteHooksSafe(getRoutes), createHistory, client, window.__data.store);
const {locale, localeData, localeMessages} = window.__data;

const renderApp = () => {

  addLocaleData(localeData);

  const component = (
    <ReduxRouter routes={getRoutes(store)} />
  );

  ReactDOM.render(
    <Provider store={store} key="provider">
       <IntlProvider locale={locale} messages={localeMessages}>
        {component}
      </IntlProvider>
    </Provider>,
    dest
  );

  if (process.env.NODE_ENV !== 'production') {
    window.React = React; // enable debugger

    if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
      console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
    }
  }

  if (__DEVTOOLS__) {
    const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
    ReactDOM.render(<div>
      {component}
      <DebugPanel top right bottom key="debugPanel">
        <DevTools store={store} monitor={LogMonitor}/>
      </DebugPanel>
    </div>, dest);
  }
};

renderApp();
