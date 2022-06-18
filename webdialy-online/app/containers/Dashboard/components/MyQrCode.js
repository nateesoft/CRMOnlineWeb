import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Cake, Phone, MoneyOff, Star, AssignmentInd } from '@material-ui/icons';
import { Grid } from '@material-ui/core';
import QRCode from 'qrcode.react';
import messages from './messages';
import defaultBoy from './images/default_boy.png';
import defaultGirl from './images/default_girl.png';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  paper1: {
    padding: '5px',
    margin: '5px',
    background: '#239FE7',
    color: 'white',
  },
  paper2: {
    padding: '5px',
    margin: '5px',
    background: '#53AB67',
    color: 'white',
  },
  paper3: {
    padding: '5px',
    margin: '5px',
    background: '#FFC36C',
  },
}));

const BoxPanel = styled(Box)`
  padding: 5px;
  display: flex;
  justify-content: center;
`;

export default function MyQrCode(props) {
  const classes = useStyles();
  const {
    code,
    prefix,
    first_name: firstName,
    last_name: lastName,
    gender,
    mobile,
    birthday,
    total_score: totalScore,
    total_purchase: totalPurchase,
    member_role: memberRole,
  } = props.profile;
  if (!code) {
    return (
      <>
        <FormattedMessage {...messages.loadQrCode} />
      </>
    );
  }
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <BoxPanel>
            <Avatar className={classes.large} src={gender === 'M' ? defaultBoy : defaultGirl} />
          </BoxPanel>
          <BoxPanel>
            {prefix}
            {firstName} {lastName}
          </BoxPanel>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={classes.paper1}>
            <BoxPanel>
              <Cake />
              วันเกิด: {birthday}
            </BoxPanel>
            <BoxPanel>
              <Phone />
              เบอร์ติดต่อ: {mobile}
            </BoxPanel>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={classes.paper2}>
            <BoxPanel>
              <Star />
              คะแนนสะสมทั้งหมด: {totalScore}
            </BoxPanel>
            <BoxPanel>
              <MoneyOff />
              ยอดซื้อสินค้า: {totalPurchase}
            </BoxPanel>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.paper3}>
            <BoxPanel>
              <AssignmentInd />
              สถานะ: {memberRole}
            </BoxPanel>
          </div>
        </Grid>
        <Grid item xs={12}>
          <BoxPanel>
            <QRCode value={code} />
          </BoxPanel>
          <BoxPanel>
            <FormattedMessage {...messages.myQrCode} />
          </BoxPanel>
        </Grid>
      </Grid>
    </>
  );
}

MyQrCode.propTypes = {
  profile: PropTypes.object,
};
