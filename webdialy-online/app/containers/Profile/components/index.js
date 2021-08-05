import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import styled from 'styled-components';
import * as appConstants from 'containers/App/constants';
import ButtonLink from 'components/ButtonLink';
import messages from './messages';

const Label = styled.span`
  border: 0px solid;
  padding: 5px;
  color: black;
  width: 150px;
  float: left;
`;
const LabelContent = styled.span`
  border: 0px solid;
  padding: 5px;
  color: black;
  float: left;
`;

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: '5px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  item: {
    background: '#eee',
    border: '0px solid',
  },
  loading: {
    padding: '20px',
  },
  buttonAddLine: {
    background: 'green',
    color: 'white',
    border: '0',
  },
  cardAction: {
    marginBottom: '50px',
  },
});

export default function ProfileContent(props) {
  const { company, profile } = props;
  const classes = useStyles();

  ProfileContent.propTypes = {
    profile: PropTypes.object,
    company: PropTypes.object,
  };

  if (!profile.code) {
    return <h3 className={classes.loading}>Loading...</h3>;
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            <Typography variant="h5" component="h2">
              {`${profile.prefix}${profile.first_name} ${profile.last_name}`}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.item}>
            <FormattedMessage {...messages.memberTopic} />
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <Label>
                <FormattedMessage {...messages.code} />
              </Label>
              <LabelContent>{profile.code}</LabelContent>
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.item}>
            <FormattedMessage {...messages.contactsTopic} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>
              <Label>
                <FormattedMessage {...messages.email} />
              </Label>{' '}
              <LabelContent>{profile.email}</LabelContent>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>
              <Label>
                <FormattedMessage {...messages.mobile} />
              </Label>{' '}
              <LabelContent>{profile.mobile}</LabelContent>
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.item}>
            <FormattedMessage {...messages.personalTopic} />
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <Label>
                <FormattedMessage {...messages.birthDay} />
              </Label>
              <LabelContent>{moment(profile.birthday).format('DD/MM/YYYY')}</LabelContent>
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.item}>
            <FormattedMessage {...messages.pointTopic} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>
              <Label>
                <FormattedMessage {...messages.pointBalance} />
              </Label>
              <LabelContent>
                <NumberFormat value={profile.total_score} displayType="text" thousandSeparator />
              </LabelContent>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>
              <Label>
                <FormattedMessage {...messages.pointRedemption} />
              </Label>
              <LabelContent>
                <NumberFormat value={profile.total_purchase} displayType="text" thousandSeparator />
              </LabelContent>
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.item}>
            <FormattedMessage {...messages.loginTopic} />
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <Label>
                <FormattedMessage {...messages.username} />
              </Label>{' '}
              <LabelContent>{profile.email}</LabelContent>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <Label>
                <FormattedMessage {...messages.lineId} />
              </Label>{' '}
              <LabelContent>{profile.line_id}</LabelContent>
            </Typography>
          </Grid>
          {company && (
            <Grid item xs={12}>
              <Typography>
                <Label>
                  <FormattedMessage {...messages.lineOfficial} />
                </Label>{' '}
                <LabelContent>
                  <a
                    href={`http://line.me/ti/p/${company.line_official_id}`}
                    target="_blank"
                    style={{ textDecoration: 'none' }}
                  >
                    <Button variant="outlined" className={classes.buttonAddLine}>
                      Add Line
                    </Button>
                  </a>
                </LabelContent>
              </Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
      <CardActions className={classes.cardAction}>
        <ButtonLink to={`${appConstants.publicPath}/profile-change-pwd`}>
          <Button variant="contained" color="secondary" size="small">
            <FormattedMessage {...messages.btnChangePassword} />
          </Button>
        </ButtonLink>
        <ButtonLink to={`${appConstants.publicPath}/profile-edit`}>
          <Button variant="contained" color="primary" size="small">
            <FormattedMessage {...messages.btnEditProfile} />
          </Button>
        </ButtonLink>
        <ButtonLink to={`${appConstants.publicPath}/profile-shipping`}>
          <Button variant="contained" size="small">
            <FormattedMessage {...messages.headerEditShipping} />
          </Button>
        </ButtonLink>
      </CardActions>
    </Card>
  );
}
