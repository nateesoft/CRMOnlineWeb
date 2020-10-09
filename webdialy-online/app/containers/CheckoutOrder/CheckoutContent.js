import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ButtonLink from 'components/ButtonLink';
import Orders from './Orders';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import FinishOrder from './FinishOrder';
import * as constants from './constants';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
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
}));

const steps = ['สินค้าที่สั่ง', 'ที่อยู่จัดส่ง', 'ข้อมูลชำระ', 'รีวิว'];

export default function CheckoutContent(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if(activeStep + 1 === 2){
      if(props.shipping){
        setActiveStep(activeStep + 1);
      }else{
        alert("กรุณาระบุข้อมูลที่อยู่ให้ครบถ้วน")
      }
    }else{
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    console.log('next:', activeStep-1);
    console.log(props);
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
  }

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            ขั้นตอนการสั่งซื้อสินค้า
          </Typography>
          <Stepper
            activeStep={activeStep}
            className={classes.stepper}
            alternativeLabel
          >
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
                <Divider style={{ border: '1px solid #eee' }} />
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
                <ButtonLink to={`${constants.publicPath}/shopping`}>
                  <Button variant="contained">
                    กลับหน้าสั่งสินค้า
                  </Button>
                </ButtonLink>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
