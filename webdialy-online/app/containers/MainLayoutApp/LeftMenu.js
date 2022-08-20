import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PeopleIcon from '@material-ui/icons/People';
import LockIcon from '@material-ui/icons/Lock';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ButtonLink from 'components/ButtonLink';

const useStyles = makeStyles(() => ({
  container: {
    background: '#fbf9f8',
  },
  itemActiveItem: {
    background: '#f1e6e2',
  },
  listSubItem: {
    marginLeft: '55px',
  },
}));

export default function LeftMenu(props) {
  const classes = useStyles();
  const { leftMenu = [], appConstants, scope, location } = props;
  const [open, setOpen] = useState(false);

  const leftMenuMaster = leftMenu.filter(
    item => item.menu_id === 'Master' || item.menu_id === 'Settings',
  );
  const leftMenuOther = leftMenu.filter(
    item => item.menu_id !== 'Master' && item.menu_id !== 'Settings',
  );

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List className={classes.container}>
      {leftMenuOther.map(({ id, icon, to_path: to }) => (
        <ButtonLink
          to={appConstants.publicPath + to.replace('shopping', 'shopping/new')}
          key={`menu${id}`}
        >
          <ListItem
            key={id}
            button
            className={clsx(location.pathname.includes(to) && classes.itemActiveItem)}
          >
            <FormattedMessage id={`${scope}.menu${id}`}>
              {tt => (
                <ListItemIcon title={tt}>
                  {icon === 'DnsRoundedIcon' && <DnsRoundedIcon />}
                  {icon === 'CardGiftcardIcon' && <CardGiftcardIcon />}
                  {icon === 'LocalMallIcon' && <LocalMallIcon />}
                  {icon === 'PeopleIcon' && <PeopleIcon />}
                  {icon === 'LockIcon' && <LockIcon />}
                  {icon === 'RecentActorsIcon' && <RecentActorsIcon />}
                </ListItemIcon>
              )}
            </FormattedMessage>
            <ListItemText>
              <FormattedMessage id={`${scope}.menu${id}`} />
            </ListItemText>
          </ListItem>
        </ButtonLink>
      ))}
      {leftMenuMaster.length > 0 && (
        <>
          <Divider />
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <DnsRoundedIcon />
            </ListItemIcon>
            <ListItemText id="menuSystem" primary="ข้อมูลระบบ" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" className={classes.listSubItem}>
              {leftMenuMaster.map(({ id, to_path: to }) => (
                <ButtonLink to={`${appConstants.publicPath}${to}`} key={`menu${id}`}>
                  <ListItem
                    key={id}
                    button
                    className={clsx(location.pathname.includes(to) && classes.itemActiveItem)}
                  >
                    <ListItemText>
                      <FormattedMessage id={`${scope}.menu${id}`} />
                    </ListItemText>
                  </ListItem>
                </ButtonLink>
              ))}
            </List>
          </Collapse>
          <Divider />
        </>
      )}
    </List>
  );
}

LeftMenu.propTypes = {
  leftMenu: PropTypes.array,
  appConstants: PropTypes.object,
  scope: PropTypes.string,
  location: PropTypes.object,
};
