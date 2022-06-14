/**
 *
 * ProfileShipping
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import * as appConstants from 'containers/App/constants';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectLogin } from 'containers/Login/selectors';
import * as mainSelectors from 'containers/MainLayoutApp/selectors';
import * as appSelectors from 'containers/App/selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import MainComponents from './components';
import * as selectors from './selectors';

export function ProfileShipping(props) {
  useInjectReducer({ key: 'profileShipping', reducer });
  useInjectSaga({ key: 'profileShipping', saga });

  const [backPage, setBackPage] = useState('');

  useEffect(() => {
    const { search } = props.location;
    const page = new URLSearchParams(search).get('backPage');
    if (page) {
      setBackPage(`${appConstants.publicPath}${page}`);
    } else {
      setBackPage(`${appConstants.publicPath}/home/profile`);
    }

    props.initLoad(props.profile.member_code);
  }, []);

  return <MainComponents {...props} backPage={backPage} />;
}

ProfileShipping.propTypes = {
  dispatch: PropTypes.func,
  clearData: PropTypes.func,
  initLoad: PropTypes.func,
  login: PropTypes.object,
  profile: PropTypes.object,
  backPage: PropTypes.string,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
  profile: mainSelectors.makeSelectProfile(),
  shipping: selectors.makeSelectProfileShipping(),
  updateStatus: selectors.makeUpdateStatus(),
  errorUpdate: selectors.makeErrorUpdate(),
  leftMenu: appSelectors.makeSelectLeftMenu(),
});

function mapDispatchToProps(dispatch) {
  return {
    initLoad: memberCode => dispatch(actions.initLoad(memberCode)),
    onEditShipping: address => dispatch(actions.editShipping(address)),
    clearData: () => dispatch(actions.initState()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProfileShipping);
