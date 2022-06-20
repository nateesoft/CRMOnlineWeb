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

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
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

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <MainComponents {...props} database={database} token={token} />
    </>
  );
};

Login.propTypes = {
  onSubmit: PropTypes.func,
  location: PropTypes.object,
  initDatabase: PropTypes.func,
  isLogin: PropTypes.bool,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  login: selectors.makeSelectLogin(),
  errorLogin: selectors.makeLoginError(),
  profile: selectors.makeSelectProfile(),
  company: selectors.makeCompanyProfile(),
  isLogin: selectors.makeSelectLoggedIn(),
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
