import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Helmet } from 'react-helmet';

import * as appConstants from 'containers/App/constants';
import ButtonLink from 'components/ButtonLink';
import ListProduct from './ListProduct';
import ShippingForm from './ShippingForm';
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
}));

const steps = ['สินค้า', 'ที่อยู่', 'รับชำระ', 'ยืนยันคำสั่งซื้อ'];
export default function CheckoutContent(props) {
  const [validItem, setValidItem] = useState(true);
  const [validShipping, setValidShipping] = useState(true);
  const classes = useStyles();
  const { activeStep, setActiveStep } = props;

  const handleNext = () => {
    setValidItem(true);
    setValidShipping(true);
    if (props.cartList && props.cartList.carts_detail.length === 0) {
      setValidItem(false);
      return;
    }
    if (activeStep + 1 === 4) {
      // if last step or finish step
      setActiveStep(activeStep + 1);
      props.onUpdateShoppingStep();
    }
    if (activeStep + 1 === 2) {
      if (props.shipping && props.shipping.province === null) {
        setValidShipping(false);
        return;
      }
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
        return <ListProduct {...props} />;
      case 1:
        return <ShippingForm {...props} />;
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
      <Helmet>
        <title>Checkout Order</title>
      </Helmet>
      <>
        <Typography variant="h4" align="center">
          ขั้นตอนการสั่ง
        </Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <>
          {activeStep === steps.length ? (
            <FinishOrder {...props} />
          ) : (
            <>
              {getStepContent(activeStep)}
              <Divider className={classes.separateLine} />
              {!validItem && (
                <div style={{ color: 'red', paddingTop: '10px', fontWeight: 'bold' }}>
                  ไม่พบรายการสินค้า
                </div>
              )}
              {!validShipping && (
                <div style={{ color: 'red', paddingTop: '10px', fontWeight: 'bold' }}>
                  ไม่พบข้อมูลจัดส่งสินค้า
                </div>
              )}
              <div className={classes.buttons}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} className={classes.button}>
                    ย้อนกลับ
                  </Button>
                )}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'ดำเนินการเสร็จสิ้น' : 'ถัดไป'}
                </Button>
              </div>
              <ButtonLink to={`${appConstants.publicPath}/home/shopping/${props.currentCartNo}`}>
                <Button variant="outlined" style={{ color: 'green' }}>
                  เลือกสินค้าเพิ่ม
                </Button>
              </ButtonLink>
            </>
          )}
        </>
      </>
    </main>
  );
}

CheckoutContent.propTypes = {
  activeStep: PropTypes.number,
  setActiveStep: PropTypes.func,
  onUpdateShoppingStep: PropTypes.func,
  shipping: PropTypes.any,
  currentCartNo: PropTypes.string,
  cartList: PropTypes.object,
};
