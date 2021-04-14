import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import history from 'utils/history';
import * as path from 'containers/App/constants';
import { scope } from 'containers/App/messages';

const useStyles = makeStyles({
  root: {
    width: '100%',
    bottom: 5,
    zIndex: 999,
    boxShadow: '1px 2px #aaa',
    borderRadius: '5px 5px 5px 5px',
    position: 'fixed',
  },
  bottom: {
    borderRadius: '10px 10px 5px 5px',
    background: 'none',
    margin: '1px',
  },
});

const SubMenu = props => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleClick = p => history.push(p);

  const { profile } = props;

  if (profile && profile.member_role) {
    if (profile.member_role !== 'member') {
      return null;
    }
  }
  if (profile && Object.keys(profile).length === 0) {
    return null;
  }

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
      style={{ position: props.title === 'Shopping' ? 'relative' : 'fixed' }}
    >
      {props.leftMenu &&
        props.leftMenu.map(item => {
          let icon = null;
          if (item.icon === 'CardGiftcardIcon') {
            icon = <CardGiftcardIcon />;
          } else if (item.icon === 'LocalMallIcon') {
            icon = <LocalMallIcon />;
          } else if (item.icon === 'RecentActorsIcon') {
            icon = <RecentActorsIcon />;
          }
          return (
            <BottomNavigationAction
              key={item.id}
              icon={icon}
              label={<FormattedMessage id={`${scope}.menu${item.id}`} />}
              className={classes.bottom}
              onClick={() => handleClick(path.publicPath + item.to_path)}
            />
          );
        })}
    </BottomNavigation>
  );
};

SubMenu.propTypes = {
  profile: PropTypes.object,
  title: PropTypes.string,
  leftMenu: PropTypes.array,
};

export default SubMenu;
