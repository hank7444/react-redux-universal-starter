import superagent from 'superagent';
import config from '../config';

// 外部API位置Hash
var apiRootHash = config.debug ? {} : {
  //'apiTicket': 'http://192.168.1.177:5001'
  'apiTicket': 'http://rocket-win.cloudapp.net:5001'
};

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

            const matcher = path.split('?')[0].split('/').slice(1);
            const request = superagent[method](this.formatUrl(path, matcher[0]));

            if (options && options.params) {
              request.query(options.params);
            }
            request.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.b0dWTEZvSTgxQk5xcnQ1N2RobGFyM2dYQitnMTFjbEYwUW9FVGVKRTJ5Z1Bxb0Q2UU95ZUx2ZTYvM0Y1YXcrZGZYY2NIWUNwMS9xdGc1U2tqK3JtQUdIcGh0VnRPd21kM1RhejEwdjVYYWhCWTJaVWdITzIxTjY1T0ZzOUdNZmQ5N09SejhBc2x3ZXRoWURxbW10M1JrNmlZK1JTZG91ZEVJaFgyYUdqUXArTzJZWVhZVEFuWVlyL0JIRTFlNTl3ME11ZzhtZ0JLaEZhMTYzSFc4K0VoK2dERnlySGU2c3NvTWE3dkhjcFY0ND0.Ce0Z4mlAJ8ofd0ZOtA3QnzSPFyqXRnZ77B0EA98CWsM');

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
  formatUrl(path, apiRoot) {

    const domain = apiRootHash[apiRoot];
    let adjustedPath = path[0] !== '/' ? '/' + path : path;
    const defaultDomain = 'http://localhost:' + config.port;
    const adjustedDomain = domain || defaultDomain;


    if (domain) {
      adjustedPath = adjustedPath.replace('/' + apiRoot, '');
    }

    console.log('path', path);
    console.log('adjustedPath', adjustedPath);


    if (adjustedDomain !== defaultDomain || __SERVER__) {
      return adjustedDomain + adjustedPath;
    }
    return adjustedPath;
  }
}
const ApiClient = ApiClient_;

export default ApiClient;
