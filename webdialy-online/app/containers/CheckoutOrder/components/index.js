import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import * as appConstants from 'containers/App/constants';
import ButtonLink from 'components/ButtonLink';
import Orders from './Orders';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import FinishOrder from './FinishOrder';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    marginTop: '5px',
  },
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  separateLine: {
    border: '1px solid #eee',
  },
  buttonAddItem: {
    background: 'green',
    color: 'white',
    '&:hover': {
      color: 'white',
      background: 'darkgreen',
    },
  },
}));

const steps = ['สินค้า', 'ที่อยู่', 'รับชำระ', 'ยืนยันคำสั่งซื้อ'];
export default function CheckoutContent(props) {
  const classes = useStyles();
  const { activeStep, setActiveStep } = props;

  const handleNext = () => {
    if (activeStep + 1 === 4) {
      // if last step or finish step
      setActiveStep(activeStep + 1);
      props.onUpdateShoppingStep();
    }
    if (activeStep + 1 === 2) {
      if (props.shipping) {
        setActiveStep(activeStep + 1);
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = step => {
    switch (step) {
      case 0:
        return <Orders {...props} />;
      case 1:
        return <AddressForm {...props} />;
      case 2:
        return <PaymentForm {...props} />;
      case 3:
        return <Review {...props} />;
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          ขั้นตอนการสั่ง
        </Typography>
        <Stepper activeStep={activeStep} className={classes.stepper} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {activeStep === steps.length ? (
            <FinishOrder {...props} />
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Divider className={classes.separateLine} />
              <div className={classes.buttons}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} className={classes.button}>
                    ย้อนกลับ
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'ดำเนินการเสร็จสิ้น' : 'ถัดไป'}
                </Button>
              </div>
              <ButtonLink to={`${appConstants.publicPath}/shopping/${props.currentCartNo}`}>
                <Button variant="contained" className={classes.buttonAddItem}>
                  เลือกสินค้าเพิ่ม
                </Button>
              </ButtonLink>
            </React.Fragment>
          )}
        </React.Fragment>
      </Paper>
    </main>
  );
}

CheckoutContent.propTypes = {
  activeStep: PropTypes.number,
  setActiveStep: PropTypes.func,
  onUpdateShoppingStep: PropTypes.func,
  shipping: PropTypes.any,
  currentCartNo: PropTypes.string,
};
