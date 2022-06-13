/**
 * AccessDeniedPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import ButtonLink from 'components/ButtonLink';
import { publicPath } from 'containers/App/constants';
import messages from './messages';

const useStyles = makeStyles(() => ({
  messageDetail: {
    border: '1px solid #bbb',
    padding: '10px',
    background: 'orange',
    width: '400px',
  },
}));

export default function AccessDeniedPage() {
  const classes = useStyles();

  return (
    <div align="center">
      <h1>
        <FormattedMessage {...messages.status} />
      </h1>
      <h3>
        <FormattedMessage {...messages.header} />
      </h3>
      <h4 className={classes.messageDetail}>
        <FormattedMessage {...messages.detail} />
      </h4>
      <ButtonLink to={`${publicPath}`}>
        <Button variant="outlined" color="primary">
          <FormattedMessage {...messages.buttonHome} />
        </Button>
      </ButtonLink>
    </div>
  );
}
