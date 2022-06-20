import React, { memo, useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DoubleArrow from '@material-ui/icons/DoubleArrow';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { Button } from '@material-ui/core';
import { Switch } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { useIdleTimer } from 'react-idle-timer';
import SweetAlert from 'sweetalert2-react';

import PrivateRoute from 'containers/Authentication';
import Dashboard from 'containers/Dashboard/Loadable';
import LineLogin from 'containers/LineLogin/Loadable';
import Profile from 'containers/Profile/Loadable';
import ProfileEdit from 'containers/ProfileEdit/Loadable';
import ProfileShipping from 'containers/ProfileShipping/Loadable';
import ProfileChangePwd from 'containers/ProfileChangePwd/Loadable';
import Members from 'containers/Members/Loadable';
import MsCompany from 'containers/MsCompany/Loadable';
import MsBranch from 'containers/MsBranch/Loadable';
import MsProduct from 'containers/MsProduct/Loadable';
import MsProductGroup from 'containers/MsProductGroup/Loadable';
import MsStock from 'containers/MsStock/Loadable';
import MsPromotion from 'containers/MsPromotion/Loadable';
import MsRole from 'containers/MsRole/Loadable';
import Shopping from 'containers/Shopping/Loadable';
import CheckoutOrder from 'containers/CheckoutOrder/Loadable';
import MemberTracking from 'containers/MemberTracking/Loadable';
import CheckCarts from 'containers/CheckCarts/Loadable';
import DatabaseConfig from 'containers/DatabaseConfig/Loadable';
import UsePromotion from 'containers/UsePromotion/Loadable';

import * as path from 'containers/App/constants';
import LocaleToggle from 'containers/LocaleToggle';

import ButtonLink from 'components/ButtonLink';

import * as appSelectors from 'containers/App/selectors';
import * as appActions from 'containers/App/actions';
import * as loginSelectors from 'containers/Login/selectors';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { setCookie } from 'react-use-cookie';
import SubMenu from '../../components/SubMenu';

import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';

import { scope } from './messages';
import LeftMenu from './LeftMenu';
import { useStyles } from './styles';

const MainLayout = props => {
  useInjectReducer({ key: 'mainLayoutApp', reducer });
  useInjectSaga({ key: 'mainLayoutApp', saga });

  const classes = useStyles();
  const { leftMenu, profile } = props;
  const [open, setOpen] = useState(window.innerWidth > 500);
  const [showIdle, setShowIdle] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    props.onLoadProfile();
    props.onLoadMenu();
  }, []);

  const notMemberRole = profile && profile.member_role !== 'member';

  const onIdle = () => {
    setShowIdle(true);
  };

  const onActive = event => {
    // console.log('onActive', event);
  };

  useIdleTimer({
    onIdle,
    onActive,
    timeout: 1000 * 60 * 5,
  });

  const logout = () => {
    setCookie('token', '');
    props.history.push(`${path.publicPath}/login`);
  };

  return (
    <div className={classes.root}>
      <SweetAlert
        show={showIdle}
        title="Session Timeout"
        type="warning"
        text="Logout and login again"
        onConfirm={() => logout()}
      />
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && notMemberRole && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          {notMemberRole && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography component="span" color="inherit" noWrap className={classes.title}>
            {props.title}
          </Typography>
          <LocaleToggle />
          <ButtonLink id="btnLogout" onClick={() => logout()}>
            <ExitToApp />
          </ButtonLink>
        </Toolbar>
      </AppBar>
      {notMemberRole && (
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <Typography
              component="span"
              color="inherit"
              style={{ fontSize: '22px', fontWeight: 'bold', textShadow: '2px 2px black' }}
            >
              CRM Online
            </Typography>
          </div>
          <Divider />
          <LeftMenu leftMenu={leftMenu} appConstants={path} scope={scope} {...props} />
          <Button onClick={open ? handleDrawerClose : handleDrawerOpen}>
            {open ? (
              <span>
                <ChevronLeftIcon />
                ซ่อนเมนู
              </span>
            ) : (
              <DoubleArrow color="disabled" />
            )}
          </Button>
        </Drawer>
      )}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <SubMenu {...props} />
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <PrivateRoute path={path.PATH_DASHBOARD} component={() => <Dashboard {...props} />} />
            <PrivateRoute path={path.PATH_PROFILE} component={() => <Profile {...props} />} />
            <PrivateRoute
              path={path.PATH_PROFILE_CHANGE_PWD}
              component={() => <ProfileChangePwd {...props} />}
            />
            <PrivateRoute
              path={path.PATH_PROFILE_EDIT}
              component={() => <ProfileEdit {...props} />}
            />
            <PrivateRoute
              path={path.PATH_PROFILE_SHIPPING}
              component={() => <ProfileShipping {...props} />}
            />
            <PrivateRoute path={path.PATH_MEMBER} component={() => <Members {...props} />} />
            <PrivateRoute path={path.PATH_SHOPPING} component={() => <Shopping {...props} />} />
            <PrivateRoute
              path={path.PATH_CHECKOUT_ORDER}
              component={() => <CheckoutOrder {...props} />}
            />
            <PrivateRoute path={path.PATH_LINE_LOGIN} component={() => <LineLogin {...props} />} />
            <PrivateRoute path={path.PATH_MS_COMPANY} component={() => <MsCompany {...props} />} />
            <PrivateRoute path={path.PATH_MS_BRANCH} component={() => <MsBranch {...props} />} />
            <PrivateRoute path={path.PATH_MS_PRODUCT} component={() => <MsProduct {...props} />} />
            <PrivateRoute
              path={path.PATH_MS_PRODUCT_GROUP}
              component={() => <MsProductGroup {...props} />}
            />
            <PrivateRoute path={path.PATH_MS_STOCK} component={() => <MsStock {...props} />} />
            <PrivateRoute path={path.PATH_MS_ROLE} component={() => <MsRole {...props} />} />
            <PrivateRoute
              path={path.PATH_MS_PROMOTION}
              component={() => <MsPromotion {...props} />}
            />
            <PrivateRoute
              path={path.PATH_ORDERS_TRACKING}
              component={() => <MemberTracking {...props} />}
            />
            <PrivateRoute
              path={path.PATH_CHECK_CARTS}
              component={() => <CheckCarts {...props} />}
            />
            <PrivateRoute
              path={path.PATH_DATABASE}
              component={() => <DatabaseConfig {...props} />}
            />
            <PrivateRoute
              path={path.PATH_USE_PROMOTION}
              component={() => <UsePromotion {...props} />}
            />
          </Switch>
        </Container>
      </main>
    </div>
  );
};

MainLayout.propTypes = {
  leftMenu: PropTypes.array,
  profile: PropTypes.object,
  title: PropTypes.string,
  onLoadProfile: PropTypes.func,
  loadAuthMenu: PropTypes.func,
  children: PropTypes.object,
  onLoadRedeem: PropTypes.func,
  onLoadMenu: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  login: loginSelectors.makeSelectLogin(),
  mainLayoutApp: selectors.makeSelectMainLayoutApp(),
  profile: selectors.makeSelectProfile(),
  leftMenu: appSelectors.makeSelectLeftMenu(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadProfile: () => {
      dispatch(actions.loadProfile());
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

export default compose(
  withConnect,
  memo,
)(MainLayout);
