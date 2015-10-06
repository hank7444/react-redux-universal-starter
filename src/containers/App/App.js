import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';

import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { FormattedMessage, FormattedHTMLMessage} from 'react-intl';


import { locales } from 'config';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { LocalLink, InfoBar, LocaleSwitcher } from 'components';

import intlUtils from 'utils/intl';
import mataData from 'utils/meta';

import 'style/sass/global.scss';


// 舊版-es6寫法
/*
@connect(
  state => ({user: state.auth.user}),
  dispatch => bindActionCreators({logout}, dispatch))
*/


// 舊版-es5寫法
/*
@connect(
  function (state, ownProps) {
    return {
      intl: state.intl,
      user: state.auth.user,
      tickets: state.tickets
    };
  },
  function (dispatch) {
    return bindActionCreators({
      logout: logout,
      pushState: pushState,
      loadIntl: loadIntl
    }, dispatch)
  }
)
*/


// 新版寫法-更簡略，action連bindActionCreators都不宣告了..
@connect(
  state => ({
    user: state.auth.user,
    tickets: state.tickets
  }),
  {logout, pushState}
)

export default class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    tickets: PropTypes.object,
    params: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  static childContextTypes = {
    locales: PropTypes.array.isRequired,
    currentLocale: PropTypes.string.isRequired
  };


  constructor(props, context) {
    super(props, context);
    this.state = {
      currentLocale: intlUtils.getCurrentLocale()
    };
  }

  getChildContext() {

    const {currentLocale} = this.state;

    return {
      locales: locales,
      currentLocale: currentLocale
    };
  }

  componentWillMount() {

    const {params, history, location} = this.props;
    intlUtils.initializer(params, history, location);
  }

  componentWillReceiveProps(nextProps) {

    const {currentLocale} = this.state;

    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState(null, `/${currentLocale}/loginSuccess`);
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState(null, `/${currentLocale}`);
    } else if (!this.props.tickets.orderId && nextProps.tickets.orderId) {
      this.props.history.pushState(null, `/${currentLocale}/ticketStep2/${nextProps.tickets.orderId}`);
    } else if (!this.props.tickets.goStep3 && nextProps.tickets.goStep3) {
      this.props.history.pushState(null, `/${currentLocale}/ticketStep3`);
    }

  }

  static fetchData(getState, dispatch) {
    const promises = [];
    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
  }

  render() {

    const {user} = this.props;
    const styles = require('./App.scss');

    return (

      <div className={styles.app}>

        <DocumentMeta {...mataData}/>

        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <LocalLink to="/" className="navbar-brand">
              <div className={styles.brand}/>
            </LocalLink>

            <ul className="nav navbar-nav">

              <li><LocalLink to="/widgets"><FormattedMessage id="app.nav.widget" /></LocalLink></li>
              <li><LocalLink to="/survey"><FormattedMessage id="app.nav.survey" /></LocalLink></li>
              <li><LocalLink to="/about"><FormattedMessage id="app.nav.about" /></LocalLink></li>
              <li><LocalLink to="/ticket"><FormattedMessage id="app.nav.ticket" /></LocalLink></li>
              {!user && <li><LocalLink to={'/login'}><FormattedMessage id="app.nav.login" /></LocalLink></li>}
              {user && <li className="logout-link"><LocalLink to="/logout" onClick={::this.handleLogout}><FormattedMessage id="app.nav.logout" /></LocalLink></li>}
            </ul>
            {user &&
            <p className={styles.loggedInMessage + ' navbar-text'}><FormattedHTMLMessage id="app.nav.loginMsg" values={{'name': user.name}} /></p>}
            <ul className="nav navbar-nav navbar-right">
              <LocaleSwitcher/>
              <li>
                <a href="https://github.com/erikras/react-redux-universal-hot-example"
                   target="_blank" title="View on Github"><i className="fa fa-github"/></a>
              </li>
            </ul>
          </div>
        </nav>

        <div className={styles.appContent}>
          {this.props.children}
        </div>
        <InfoBar/>

        <div className="well text-center">
          Have questions? Ask for help <a
          href="https://github.com/erikras/react-redux-universal-hot-example/issues"
          target="_blank">on Github</a> or in the <a
          href="http://www.reactiflux.com/" target="_blank">#react-redux-universal</a> Slack channel.
        </div>
      </div>
    );
  }
}
