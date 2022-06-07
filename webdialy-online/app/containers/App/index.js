import React, { useEffect } from 'react';
import 'fontsource-roboto';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import * as loginSelectors from 'containers/Login/selectors';
import Login from 'containers/Login/Loadable';
import Logout from 'containers/Logout/Loadable';
import Register from 'containers/Register/Loadable';
import ForgotPassword from 'containers/ForgotPassword/Loadable';
import RecoverPassword from 'containers/RecoverPassword/Loadable';
import GoogleMap from 'containers/GoogleMap/Loadable';
import MemberOrdersConfirm from 'containers/MemberOrdersConfirm/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import AccessDeniedPage from 'containers/AccessDeniedPage/Loadable';
import ClientRegister from 'containers/ClientRegister/Loadable';
import MainLayoutApp from 'containers/MainLayoutApp';

import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as path from './constants';

export function App(props) {
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    props.loadAuthMenu();
  }, []);

  return (
    <BrowserRouter {...props}>
      <Switch>
        <Route exact path={`${path.publicPath}/`} component={ClientRegister} />
        <Route path={path.PATH_LOGIN} component={Login} />
        <Route path={path.PATH_LOGOUT} component={Logout} />
        <Route path={path.PATH_REGISTER} component={Register} />
        <Route path={path.PATH_FORGOT_PWD} component={ForgotPassword} />
        <Route path={path.PATH_RECOVER_PWD} component={RecoverPassword} />
        <Route path={path.PATH_TEST_GOOGLE_MAP} component={GoogleMap} />
        <Route path={path.PATH_MEMBER_ORDERS_CONFIRM} component={MemberOrdersConfirm} />
        <Route path={path.PATH_HOME} component={MainLayoutApp} />
        <Route path={path.PATH_ACCESS_DENIED} component={AccessDeniedPage} />
        <Route path={path.PATH_CLIENT_REGISTER} component={() => <div>Client Register</div>} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = createStructuredSelector({
  login: loginSelectors.makeSelectLogin(),
  loggedIn: loginSelectors.makeSelectLoggedIn(),
  leftMenu: selectors.makeSelectLeftMenu(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadAuthMenu: () => {
      dispatch(actions.initLoad());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

App.propTypes = {
  loadAuthMenu: PropTypes.func,
};

export default compose(withConnect)(App);
