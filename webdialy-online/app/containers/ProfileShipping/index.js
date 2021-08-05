/**
 *
 * ProfileShipping
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectLogin } from 'containers/Login/selectors';
import MainLayoutApp from 'containers/MainLayoutApp';
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

  useEffect(() => {
    props.initLoad(props.profile.member_code);
  }, []);

  return (
    <MainLayoutApp title="Edit Shipping" {...props}>
      <MainComponents {...props} />
    </MainLayoutApp>
  );
}

ProfileShipping.propTypes = {
  dispatch: PropTypes.func,
  clearData: PropTypes.func,
  initLoad: PropTypes.func,
  login: PropTypes.object,
  profile: PropTypes.object,
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
