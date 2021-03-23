/**
 *
 * Dashboard
 *
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { getCookie } from 'react-use-cookie';
import { Redirect } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as appConstants from 'containers/App/constants';
import * as loginSelectors from 'containers/Login/selectors';
import * as appActions from 'containers/App/actions';
import SubMenu from 'components/SubMenu';
import * as appSelectors from 'containers/App/selectors';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import DashboardContent from './DashboardContent';

export function Dashboard(props) {
  useInjectReducer({ key: 'dashboard', reducer });
  useInjectSaga({ key: 'dashboard', saga });

  const token = getCookie('token') || '';
  if (!token) {
    return <Redirect to={`${appConstants.publicPath}/`} />
  }
  
  useEffect(() => {
    if (token !== '') {
      props.onRefresh(JSON.parse(token));
      props.onLoadRedeem();
      props.onLoadMenu();

      const loc = window.location.href.split('/');
      const apiServiceEndpoint = `${loc[0]}//${loc[2]}`.replace('3000', '5000');
      const socket = socketIOClient(apiServiceEndpoint, {
        transports: ['websocket'],
      });
      socket.on('update_redeem', data => {
        props.onRefresh(JSON.parse(token));
        props.onLoadRedeem();
      });
      socket.on('update_member', data => {
        props.onRefresh(JSON.parse(token));
        props.onLoadRedeem();
      });
    }
  }, []);


  return (
    props.login && (
      <React.Fragment>
        <SubMenu {...props} />
        <DashboardContent {...props} />;
      </React.Fragment>
    )
  );
}

Dashboard.propTypes = {};

const mapStateToProps = createStructuredSelector({
  login: loginSelectors.makeSelectLogin(),
  profile: selectors.makeSelectProfile(),
  listRedeem: selectors.makeSelectRedeem(),
  redeemPoint: selectors.makeSelectRedeemPoint(),
  leftMenu: appSelectors.makeSelectLeftMenu(),
});

function mapDispatchToProps(dispatch) {
  return {
    onRefresh: email => {
      dispatch(actions.initLoad(email));
    },
    onLoadRedeem: () => {
      dispatch(actions.loadRedeem());
    },
    onCreateRedeem: code => {
      dispatch(actions.createRedeem(code));
    },
    onLoadMenu: () => {
      dispatch(appActions.initLoad());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Dashboard);
