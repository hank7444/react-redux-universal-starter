import superagent from 'superagent';
import config from './config';

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class ApiClient_ {
  constructor(req) {
    ['get', 'post', 'put', 'patch', 'del'].
      forEach((method) => {
        this[method] = (path, options) => {
          return new Promise((resolve, reject) => {
            const request = superagent[method](this.formatUrl(path));
            if (options && options.params) {
              request.query(options.params);
            }
            if (__SERVER__) {
              if (req.get('cookie')) {
                request.set('cookie', req.get('cookie'));
              }
            }
            if (options && options.data) {
              request.send(options.data);
            }
            request.end((err, res) => {

              if (err) {
                reject(res.body || err);
              } else {

                //console.log(res.body);
                resolve(res.body);
              }
            });
          });
        };
      });
  }

  /* This was originally a standalone function outside of this class, but babel kept breaking, and this fixes it  */
  formatUrl(path) {

    const adjustedPath = path[0] !== '/' ? '/' + path : path;


    // 如果是server render, 呼叫這個位置, 媽的搞好久...作者幹嘛直接連到3030!!
    if (__SERVER__) {

      //console.log('http://localhost:' + config.port + adjustedPath);
      // Prepend host and port of the API server to the path.
      return 'http://localhost:' + config.port + adjustedPath;
    }
    // Prepend `/api` to relative URL, to proxy to API server.
    return adjustedPath;

  }
}
const ApiClient = ApiClient_;

export default ApiClient;
