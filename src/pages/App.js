import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import {isLoaded as isInfoLoaded, load as loadInfo} from '../ducks/info';
import {isLoaded as isAuthLoaded, load as loadAuth, logout} from '../ducks/auth';
import InfoBar from '../components/InfoBar';
import {createTransitionHook} from '../helpers/universalRouter';
import mataData from './utilities/meta';

import '../style/sass/global.scss';
import {Button} from 'react-bootstrap';
import styles from '../style/sass/pages/App.scss';


/*
ES6寫法
@connect(
  state => ({user: state.auth.user}),
  dispatch => bindActionCreators({logout}, dispatch))
*/

@connect(
  function (state, ownProps) {
    return {
      user: state.auth.user,
      tickets: state.tickets
    };
  },
  // 下面兩種寫法都可以
  /*
  function (dispatch) {
    return {
      logout: bindActionCreators(logout, dispatch)
    } 
  }*/
  function (dispatch) {
    return bindActionCreators({
      logout: logout
    }, dispatch)
  }
)


export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  componentWillMount() {
    const {router, store} = this.context;
    this.transitionHook = createTransitionHook(store);
    router.addTransitionHook(this.transitionHook);
  }

  componentWillReceiveProps(nextProps) {
    /*
    console.log('this.props: ', this.props);
    console.log('nextProps: ', nextProps);

    console.log('this.props.user: ', this.props.user);
    console.log('nextProps.user: ', nextProps.user);
    */

    //console.log('this.props.tickets.goStep3:', this.props.tickets.goStep3);
    //console.log('nextProps.tickets.goStep3:', nextProps.tickets.goStep3);

    // 導頁統一在這裡管理
    if (!this.props.user && nextProps.user) {
      // login
      this.context.router.transitionTo('/loginSuccess');
    } 
    else if (this.props.user && !nextProps.user) {
      //console.log('GOGOGOGO!!!! logOut');
      // logout
      this.context.router.transitionTo('/');
    }
    else if (!this.props.tickets.orderId && nextProps.tickets.orderId) {
       //console.log('GOGOGOGO!!!!');
       this.context.router.transitionTo('/TicketStep2/' + nextProps.tickets.orderId);
    }
    else if (!this.props.tickets.goStep3 && nextProps.tickets.goStep3) {
      //console.log('GOGOGOGO STEP3!!!!');
      this.context.router.transitionTo('/TicketStep3');
    }

  }

  componentWillUnmount() {
    const {router} = this.context;
    router.removeTransitionHook(this.transitionHook);
  }

  render() {
    const {user} = this.props;
    //const styles = require('./App.scss');
    return (

      <div className={styles.app}>

        <DocumentMeta {...mataData}/>
      
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <Link to="/" className="navbar-brand">
              <div className={styles.brand}/>
              React-Rocket 大量搶票模組
            </Link>

           {/* nav */}
            <ul className="nav navbar-nav">
              <li><Link to="/widgets">Widgets</Link></li>
              <li><Link to="/survey">Survey</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/ticket">購買流程</Link></li>
              {!user && <li><Link to="/login">Login</Link></li>}


              {user && <li className="logout-link"><a href="/logout" onClick={::this.handleLogout}>Logout</a></li>}
            </ul>

            {user && <p className={styles.loggedInMessage + ' navbar-text'}>Logged in as <strong>{user.name}</strong>.</p>}
            
            <ul className="nav navbar-nav navbar-right">
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

  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
  }

  // 測試顯示一進到頁面，server sider render 初始化使用
  static fetchData(store) {
    const promises = [];

    if (!isInfoLoaded(store.getState())) {
      promises.push(store.dispatch(loadInfo()));
    }
    if (!isAuthLoaded(store.getState())) {
      promises.push(store.dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }
  
}

