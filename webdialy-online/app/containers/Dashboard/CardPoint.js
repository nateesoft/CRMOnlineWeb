import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { FormattedMessage } from 'react-intl';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import messages from './messages';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardContent: {
    background: `${bg}`,
    color: 'white',
  },
  cardAction: {
    background: `${fbg}`, color: 'white',
  },
  buttomWhite: {
    color: 'white',
  },
});

export default function CardPoint(props) {
  const classes = useStyles();
  const { label, point, bg, fbg } = props;

  CardPoint.propTypes = {
    label: PropTypes.object,
    point: PropTypes.number,
    bg: PropTypes.string,
    fbg: PropTypes.string,
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h6" gutterBottom>
          {label}
        </Typography>
        <Typography variant="h4">
          <NumberFormat value={point} displayType="text" thousandSeparator />
        </Typography>
      </CardContent>
      <CardActions className={classes.cardAction}>
        <Button endIcon={<ArrowRight />} className={classes.buttomWhite}>
          <FormattedMessage {...messages.moreInfo} />
        </Button>
      </CardActions>
    </Card>
  );
}
