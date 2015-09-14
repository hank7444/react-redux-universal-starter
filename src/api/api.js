import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../config';
import * as actions from './routes/index';
import PrettyError from 'pretty-error';

const pretty = new PrettyError();
const app = express();
app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(bodyParser.json());

export default function api() {
  return new Promise((resolve) => {
    app.use((req, res) => {

      // 現在這種寫法只能抓一層更目錄啊...
      const matcher = req.url.split('?')[0].split('/').slice(1);

      // 將第一個沒用的空白清除
      //const action = matcher && actions[matcher[0]];
      let action = false;
      let params = null;
      let apiActions = actions
      let sliceIndex = 0; // 從哪個index開始當作參數


      // Array.forEach 沒有break可以用啊~~
      for (let actionName of matcher) {

        // 不知道這邊有沒有更簡潔的寫法 :(
        if (apiActions[actionName]) {
          action = apiActions[actionName];
        }

        if (typeof action === 'function') {
          params = matcher.slice(++sliceIndex);
          break;
        }
        apiActions = action;
        ++sliceIndex;
      }
      

      //console.log('action', action);
      //console.log('params', params);

      if (action && typeof action === 'function') {

        // /api/someapi/aaa/bbb, aaa,bbb會被當參數傳入action
        action(req, params)
          .then((result) => {

            //console.log(result);
            res.json(result);
          }, (reason) => {
            if (reason && reason.redirect) {
              res.redirect(reason.redirect);
            } else {
              console.error('API ERROR:', pretty.render(reason));
              res.status(reason.status || 500).json(reason);
            }
          });
      } else {
        res.status(404).end('NOT FOUND');
      }
    });
    app.listen(config.apiPort);
    resolve();
  });
}
