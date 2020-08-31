import React from 'react';
import PropTypes from 'prop-types';
import {
  createMuiTheme,
  ThemeProvider,
  withStyles,
} from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import Login from 'containers/Login/Loadable';
import Logout from 'containers/Logout/Loadable';
import Dashboard from 'containers/Dashboard/Loadable';
import Register from 'containers/Register/Loadable';
import ForgotPassword from 'containers/ForgotPassword/Loadable';
import RecoverPassword from 'containers/RecoverPassword/Loadable';
import Profile from 'containers/Profile/Loadable';
import Members from 'containers/Members/Loadable';
import Shopping from 'containers/Shopping/Loadable';
import CheckoutOrder from 'containers/CheckoutOrder/Loadable';
import MasterUI from 'containers/MasterUI/Loadable';
import * as path from '../../constants';

import Navigator from './Navigator';
import Header from './Header';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        webdaily-online.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#18202c',
      },
    },
    MuiButton: {
      label: {
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};

const drawerWidth = 256;

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: theme.spacing(1),
    background: '#eaeff1',
  },
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1',
  },
};

function Paperbase(props) {
  const { classes, loggedIn, profile } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        {loggedIn && (
          <nav className={classes.drawer}>
            <Hidden smUp implementation="js">
              <Navigator
                username={profile.username}
                PaperProps={{ style: { width: drawerWidth } }}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
              />
            </Hidden>
            <Hidden xsDown implementation="css">
              <Navigator
                username={profile.username}
                PaperProps={{ style: { width: drawerWidth } }}
              />
            </Hidden>
          </nav>
        )}
        <div className={classes.app}>
          <Header
            loggedIn={loggedIn}
            profile={profile}
            onDrawerToggle={handleDrawerToggle}
          />
          <main className={classes.main}>
            <Switch>
              <Route exact path={`${path.publicPath}/`} component={HomePage} />
              <Route path={path.PATH_LOGIN} component={Login} />
              <Route path={path.PATH_LOGOUT} component={Logout} />
              <Route path={path.PATH_DASHBOARD} component={Dashboard} />
              <Route path={path.PATH_REGISTER} component={Register} />
              <Route path={path.PATH_FORGOT_PWD} component={ForgotPassword} />
              <Route path={path.PATH_RECOVER_PWD} component={RecoverPassword} />
              <Route path={path.PATH_PROFILE} component={Profile} />
              <Route path={path.PATH_MEMBER} component={Members} />
              <Route path={path.PATH_SHOPPING} component={Shopping} />
              <Route path={path.PATH_CHECKOUT_ORDER} component={CheckoutOrder} />
              <Route path={path.PATH_MASTER_UI} component={MasterUI} />
              <Route component={NotFoundPage} />
            </Switch>
          </main>
          <footer className={classes.footer}>
            <Copyright />
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

Paperbase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Paperbase);
