import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import ContentNotFound from 'components/ContentNotFound';
import RedeemCard from './RedeemCard';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  tagStyle: {
    padding: '10px',
    background: '#478bf3',
    color: 'white',
    borderRadius: '10px 0px 10px 0px',
    fontWeight: 'bold',
    border: '1px solid #ccc',
  },
}));

export default function RedeemPage(props) {
  const { listRedeem, profile } = props;
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={1}>
      <Grid item xs={12}>
        <div className={classes.tagStyle}>
          <FormattedMessage {...messages.topicRedeem} />
        </div>
      </Grid>
      <Grid item xs={12}>
        {listRedeem && listRedeem.length === 0 && (
          <ContentNotFound label={<FormattedMessage {...messages.notFoundPromotion} />} />
        )}
        <Grid container justifyContent="center" spacing={1}>
          {listRedeem &&
            listRedeem.map(item => (
              <Grid item xs={12} md={4} key={item.product_code}>
                <RedeemCard
                  options={{
                    code: item.product_code,
                    name: item.redeem_name,
                    label: item.product_name,
                    expiredPro: `หมดเขต: ${moment(item.finish_time).format('DD/MM/YYYY')}`,
                    pointUse: `ใช้คะแนน: ${item.point_to_redeem} คะแนน`,
                    inStock: item.qty_in_stock,
                    status:
                      profile.total_score >= item.point_to_redeem
                        ? `สถานะ: สามารถแลกได้`
                        : `ขาดอีก ${item.point_to_redeem - profile.total_score} คะแนน`,
                  }}
                  img={item.img_path}
                  free={profile.total_score >= item.point_to_redeem}
                  {...props}
                />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

RedeemPage.propTypes = {
  listRedeem: PropTypes.array,
  profile: PropTypes.object,
};
