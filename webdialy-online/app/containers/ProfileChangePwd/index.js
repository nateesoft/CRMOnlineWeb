/**
 *
 * ProfileChangePwd
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mainSelectors from 'containers/MainLayoutApp/selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import MainComponents from './components';
import * as selectors from './selectors';

export function ProfileChangePwd(props) {
  useInjectReducer({ key: 'profileChangePwd', reducer });
  useInjectSaga({ key: 'profileChangePwd', saga });

  return <MainComponents {...props} />;
}

ProfileChangePwd.propTypes = {
  dispatch: PropTypes.func,
  clearData: PropTypes.func,
  initLoad: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  updateStatus: selectors.makeUpdateStatus(),
  errorUpdate: selectors.makeErrorUpdate(),
  initialValues: mainSelectors.makeSelectProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    onEditMember: member => dispatch(actions.updatePassword(member)),
    intLoadProfile: member => dispatch(actions.updatePassword(member)),
    clearData: () => dispatch(actions.initState()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProfileChangePwd);
