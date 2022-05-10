import React, { memo, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
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
import { Helmet } from 'react-helmet';
import { Button } from '@material-ui/core';
import SubMenu from 'components/SubMenu';
import * as appConstants from 'containers/App/constants';
import LocaleToggle from 'containers/LocaleToggle';
import ButtonLink from 'components/ButtonLink';
import { scope } from './messages';
import LeftMenu from './LeftMenu';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    background: '#BE6C4E',
    color: 'white',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: 'chocolate',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    height: '100vh',
    width: '100vw',
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  itemActiveItem: {
    background: '#f1e6e2',
  },
  iconTextWhite: {
    color: 'white',
  },
}));

const MainLayout = props => {
  const classes = useStyles();
  const { leftMenu } = props;
  const { profile } = props;
  const [open, setOpen] = useState(window.innerWidth > 500);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const notMemberRole = profile && profile.member_role !== 'member';

  return (
    <div className={classes.root}>
      <Helmet>
        <title>{props.title}</title>
      </Helmet>
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
          <ButtonLink id="btnLogout" to={`${appConstants.publicPath}/logout`}>
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
            <Typography component="span" color="inherit">
              CRM Online
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon className={classes.iconTextWhite} />
            </IconButton>
          </div>
          <Divider />
          <LeftMenu
            leftMenu={leftMenu}
            appConstants={appConstants}
            scope={scope}
            title={props.title}
          />
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
          {props.children}
        </Container>
      </main>
    </div>
  );
};

MainLayout.propTypes = {
  leftMenu: PropTypes.array,
  profile: PropTypes.object,
  title: PropTypes.string,
  children: PropTypes.any,
};

export default memo(MainLayout);
