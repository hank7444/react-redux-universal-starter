import qs from 'query-string';
import React from 'react';
import {match, RoutingContext} from 'react-router';
import createRoutes from '../routes';
import { Provider } from 'react-redux';

// 從Html.js 如果有包裹其他子元件，就一直往下找，return所有fetchData fucntion
// 只針對createRouters裡面有設定Route的component, 所以在該page下要初始化的內容要在page就在fet
const getFetchData = (component = {}) => {
  return component.WrappedComponent ?
    getFetchData(component.WrappedComponent) :
    component.fetchData;
};


const fetchDataForContainers = (containers, store, params, query) => {
  const promises = containers
    .filter((component) => getFetchData(component))         // only look at ones with a static fetchData()
    .map(getFetchData)                                      // pull out fetch data methods
    .map(fetchData => fetchData(store, params, query || {}));  // call fetch data methods and save promises

  return Promise.all(promises);
};


// 將route相關data丟到所有會碰到的component內的fetchData()內
export function createTransitionHook(store) {

  //console.log('####call transitionHook!', store);
  return (nextState, transition, callback) => {

    // nextState.location.query  url上get參數在這裡
    // nextState.location.params.splat  widgets/aaa, 如果有存在的route, 則params為空值

    const { params, location: { query } } = nextState;

    /*
    // es5 寫法
    var promises = {};
    promises = nextState.branch.map(function (route) {
          return route.component;
    }) // pull out individual route components
    .filter(function (component) {
          return getFetchData(component);
    }) // only look at ones with a static fetchData()
    .map(getFetchData) // pull out fetch data methods
    .map(function (fetchData) {
          return fetchData(store, params, query || {});
    });
    */
    const promises = nextState.branch
      .map(route => route.component)                          // pull out individual route components
      .filter((component) => getFetchData(component))         // only look at ones with a static fetchData()
      .map(getFetchData)                                      // pull out fetch data methods
      .map(fetchData => fetchData(store, params, query || {}));  // call fetch data methods and save promises

    // 所有的promise都成功才會到success, 不然一律到error
    Promise.all(promises)
      .then(() => {
        callback(); // can't just pass callback to then() because callback assumes first param is error
      }, (error) => {
        callback(error);
      });
  };
}

// export default function universalRouter(location, history, store) {

//   const routes = createRoutes(store);
//   return new Promise((resolve, reject) => {
//     Router.run(routes, location, [createTransitionHook(store)], (error, initialState, transition) => {

      
//       //initialState
      
//       branch: Array[2]
//       components: Array[2]
//       history: BrowserHistory
//       location: Location
//       params: Object
      

      
//       //store

//       client: ApiClient
//       dispatch: (action)
//       getState: getState()
//       replaceReducer: replaceReducer(nextReducer)
//       subscribe: subscribe(listener)
      

//       if (error) {
//         return reject(error);
//       }

//       if (transition && transition.redirectInfo) {
//         return resolve({
//           transition,
//           isRedirect: true
//         });
//       }

//       if (history) {  // only on client side
//         initialState.history = history;
//       }

//       const component = (
//         <Provider store={store} key="provider">
//           {() => <Router {...initialState} children={routes}/>}
//         </Provider>
//       );

//       return resolve({
//         component,
//         isRedirect: false
//       });
//     });
//   });
// }


export default function universalRouter(location, history, store, preload) {
  const routes = createRoutes(history);
  return new Promise((resolve, reject) => {
    match({routes, history, location}, (error, redirectLocation, renderProps) => {
      if (error) {
        return reject(error);
      }

      if (redirectLocation) {
        return resolve({
          redirectLocation
        });
      }

      function resolveWithComponent() {
        const component = (
          <Provider store={store} key="provider">
            <RoutingContext {...renderProps}/>
          </Provider>
        );

        resolve({
          component
        });
      }

      if (preload) {
        fetchDataForContainers(
          renderProps.components,
          store,
          renderProps.params,
          qs.parse(renderProps.location.search)
        ).then(() => resolveWithComponent(), err => reject(err));
      } else {
        resolveWithComponent();
      }
    });
  });
}