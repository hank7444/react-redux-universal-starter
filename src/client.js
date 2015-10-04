/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
//import BrowserHistory from 'react-router/lib/BrowserHistory';
//import Location from 'react-router/lib/Location';

import createHistory from 'history/lib/createBrowserHistory';
import createLocation from 'history/lib/createLocation';
//import queryString from 'query-string';
import configureStore from './redux/configureStore';
import ApiClient from './helpers/ApiClient';
import universalRouter from './helpers/universalRouter';

// 如果是這樣引入, 在webpack的js未載入時，會沒有bootstrap style
// global webpack引入style請放在這裡

/*
不要在這邊將global css放進來，因為無論是sass, css, 都不會依照順序放置
應該用一個共用的global.sass, 將其他css與sass import進來
*/


//require('./style/css/test2.css');
//require('./style/css/test.css');

//import './style/sass/global2.scss';
//import './style/sass/global.scss';




// 噢喔噢 成功了, 改變webpack css-loader順序，在sass-loader下即可

// include node_module/的css
import "bootstrap/dist/css/bootstrap.css";

import './style/css/test.css';
import './style/css/test2.css';


import './style/sass/globalIndex.scss';
import './style/sass/global3.scss';




const history = createHistory();
const client = new ApiClient();

const dest = document.getElementById('content');
const store = configureStore(client, window.__data);
const location = createLocation(document.location.pathname, document.location.search);

const render = (loc, hist, str, preload) => {
  return universalRouter(loc, hist, str, preload)
    .then(({component}) => {

      ReactDOM.render(component, dest);

      // __DEVTOOLS__ 這些webpack的設定只有在client端有效啊!!!
      if (__DEVTOOLS__) {
        const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
        console.info('You will see a "Warning: React attempted to reuse markup in a container but the checksum was' +
          ' invalid." message. That\'s because the redux-devtools are enabled.');
        ReactDOM.render(<div>
          {component}
          <DebugPanel top right bottom key="debugPanel">
            <DevTools store={store} monitor={LogMonitor}/>
          </DebugPanel>
        </div>, dest);
      }
    }, (error) => {
      console.error(error);
    });
};

history.listen(() => {});

history.listenBefore((loc, callback) => {
  render(loc, history, store, true)
    .then((callback));
});

render(location, history, store);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
  const reactRoot = window.document.getElementById('content');

  if (!reactRoot || !reactRoot.firstChild || !reactRoot.firstChild.attributes || !reactRoot.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}
