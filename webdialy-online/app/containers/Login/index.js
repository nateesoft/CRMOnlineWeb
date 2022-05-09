/**
 *
 * Login
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import useCookie, { getCookie } from 'react-use-cookie';
import { Redirect } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as appConstants from 'containers/App/constants';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import MainComponents from './components';
import * as actions from './actions';

const Login = props => {
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });

  const [database, setDatabase] = useCookie('database', '');
  const token = getCookie('token') || '';

  useEffect(() => {
    if (database) {
      setDatabase(database);
      props.initDatabase(database);
    }
  }, []);

  if (token && database) {
    return <Redirect to={`${appConstants.publicPath}/dashboard`} />;
  }
  if (!database) {
    return <Redirect to={`${appConstants.publicPath}/`} />;
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <MainComponents {...props} />
    </React.Fragment>
  );
};

Login.propTypes = {
  onSubmit: PropTypes.func,
  location: PropTypes.object,
  initDatabase: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  login: selectors.makeSelectLogin(),
  errorLogin: selectors.makeLoginError(),
  profile: selectors.makeSelectProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    onValidateLogin: ({ username, password }) => {
      dispatch(actions.checkLogin({ username, password }));
    },
    clearData: () => {
      dispatch(actions.initState());
    },
    initDatabase: db => {
      dispatch(actions.initDatabase(db));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Login);
