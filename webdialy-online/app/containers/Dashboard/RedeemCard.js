import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Button, Grid } from '@material-ui/core';
import DialogRedeemCode from './DialogRedeemCode';

const useStyles = makeStyles(theme => ({
  root: {},
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  options: {
    textDecoration: 'none',
    listStyle: 'none',
  },
  buttonFooter: {
    background: '#478bf3',
    color: 'white',
    width: '80%',
    marginBottom: '10px',
    '&:hover': {
      background: '#123456',
    },
  },
  freeTemplate: {
    background: '#bde39e',
  },
  notFree: {
    background: '#ffe9d2',
  },
}));

export default function RedeemCard(props) {
  const classes = useStyles();
  const { options } = props;
  const [showDialog, setShowDialog] = useState(false);
  const loc = window.location.href.split('/');
  const apiServiceHost = `${loc[0]}//${loc[2]}`.replace('3000', '5000');

  const showRedeemCode = () => {
    setShowDialog(true);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={options.label}
        subheader={options.expiredPro}
      />
      <CardMedia
        className={classes.media}
        image={`${apiServiceHost}${props.img}`}
        title="Paella dish"
        style={{ backgroundSize: 'contain' }}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="span">
          <div align="center">
            <u className={classes.options}>
              <li>{options.name}</li>
              <li>{options.pointUse}</li>
              {props.free ? (
                <li className={classes.freeTemplate}>{options.status}</li>
              ) : (
                <li className={classes.notFree}>{options.status}</li>
              )}
            </u>
          </div>
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container justify="center">
          {options.inStock > 0 ? (
            <Button
              variant="contained"
              className={classes.buttonFooter}
              onClick={() => showRedeemCode()}
            >
              กดรับสิทธิ์
            </Button>
          ) : (
            <Button
              variant="contained"
              className={classes.buttonFooter}
              disabled
            >
              ขออภัย สิทธิ์เต็มแล้ว
            </Button>
          )}
        </Grid>
      </CardActions>
      {showDialog && (
        <DialogRedeemCode
          {...props}
          code={options.code}
          handleClose={() => setShowDialog(false)}
        />
      )}
    </Card>
  );
}

RedeemCard.propTypes = {
  options: PropTypes.object,
  img: PropTypes.string,
  free: PropTypes.bool,
};
