import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import ContentNotFound from 'components/ContentNotFound';
import ProductTopic from './ProductTopic';
import messages from '../messages';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '1px',
  },
  divProduct: {
    marginBottom: '4px',
  },
  imageProduct: {
    height: 118,
    width: '150px',
    marginBottom: '8px',
  },
  productName: {
    color: '#756a67',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  productPrice: {
    color: 'green',
    fontSize: '18px',
    marginRight: '2px',
  },
  productPoint: {
    color: 'white',
    padding: '5px 20px 3px 20px',
    fontSize: '12px',
    marginRight: '2px',
    background: 'green',
  },
  balance: {
    color: 'green',
    fontSize: '12px',
    marginRight: '2px',
  },
}));

export default function ProductList(props) {
  const { data, topic, handleClickOpen } = props;
  const loc = window.location.href.split('/');
  const apiServiceHost = `${loc[0]}//${loc[2]}`.replace('3000', '5000');
  const classes = useStyles();

  ProductList.propTypes = {
    data: PropTypes.array,
    topic: PropTypes.object,
    handleClickOpen: PropTypes.func,
  };

  return (
    <Grid container spacing={1} className={classes.root}>
      <Grid item xs={12}>
        <ProductTopic label={topic} bgColor="#009cdb" textColor="white" />
      </Grid>
      <Grid item xs={12}>
        {data && data.length === 0 && (
          <ContentNotFound label={<FormattedMessage {...messages.notfoundProduct} />} />
        )}
      </Grid>
      {data &&
        data.map(item => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={item.code}>
            <div align="center" className={classes.divProduct}>
              <Paper elevation={3}>
                <Box key={item.code} onClick={() => handleClickOpen(item)}>
                  <img
                    className={classes.imageProduct}
                    alt={item.name}
                    src={`${apiServiceHost}${item.img_path}`}
                  />
                  <Box pr={2}>
                    <Typography gutterBottom variant="body2" className={classes.productName}>
                      {item.name}
                    </Typography>
                    <Typography
                      display="block"
                      variant="caption"
                      color="textSecondary"
                      align="center"
                    >
                      <span className={classes.productPrice}>ราคา {item.price_d} บาท</span>
                    </Typography>
                    <Typography
                      display="block"
                      variant="caption"
                      color="textSecondary"
                      align="center"
                    >
                      <span className={classes.productPoint}>ได้ {item.point} คะแนน</span>
                    </Typography>
                    <Typography
                      display="block"
                      variant="caption"
                      color="textSecondary"
                      align="center"
                    >
                      <span className={classes.balance}>
                        คงเหลือ ({`${item.in_stock || 0}/${item.max_stock}`})
                      </span>
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </div>
          </Grid>
        ))}
    </Grid>
  );
}
