/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel/polyfill';
import React from 'react';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import Location from 'react-router/lib/Location';
import queryString from 'query-string';
import configureStore from './store/configureStore';
import ApiClient from './helpers/ApiClient';
import universalRouter from './helpers/universalRouter';

// 如果是這樣引入, 在webpack的js未載入時，會沒有bootstrap style
// global webpack引入style請放在這裡

import './style/sass/global.scss';
//import './style/css/test.css'; // css import會有問題...

const history = new BrowserHistory();
const client = new ApiClient();

const dest = document.getElementById('content');
const store = configureStore(client, window.__data);
const search = document.location.search;
const query = search && queryString.parse(search);
const location = new Location(document.location.pathname, query);

universalRouter(location, history, store)
  .then(({component}) => {

    // __DEVTOOLS__ 這些webpack的設定只有在client端有效啊!!!
    if (__DEVTOOLS__) {
      const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
      console.info('You will see a "Warning: React attempted to reuse markup in a container but the checksum was' +
        ' invalid." message. That\'s because the redux-devtools are enabled.');
      React.render(<div>
        {component}
        <DebugPanel top right bottom key="debugPanel">
          <DevTools store={store} monitor={LogMonitor}/>
        </DebugPanel>
      </div>, dest);
    } else {
      React.render(component, dest);
    }
  }, (error) => {
    console.error(error);
  });


if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
  const reactRoot = window.document.getElementById('content');

  if (!reactRoot || !reactRoot.firstChild || !reactRoot.firstChild.attributes || !reactRoot.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}
