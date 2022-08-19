import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';

import ButtonLink from 'components/ButtonLink';
import * as appConstants from 'containers/App/constants';
import RenderField from 'components/RenderField';
import InputSelectOptions from 'components/InputSelectOptions';
import * as selectors from '../selectors';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  separateStyle: {
    border: '1px solid #eee',
  },
  buttonRightSpace: {
    marginRight: '10px',
  },
  greenText: {
    color: 'green',
  },
  divButtom: {
    marginBottom: '25px',
  },
}));

const ShippingForm = props => {
  const classes = useStyles();
  const { handleSubmit, response, branchList, initialValues } = props;

  useEffect(() => {
    props.initLoadMemberShipping();
    props.initLoadBranchList();
  }, []);

  const onValidated = formValues => {
    props.onUpdateAddressForm({
      ...formValues,
      address_type: 'Shipping',
      member_prefix: '',
    });
  };

  const updateBranchShipping = e => {
    if (e.target.value) {
      props.onUpdateAddressForm({
        ...initialValues,
        branch_shipping: e.target.value,
        address_type: 'Shipping',
        member_prefix: '',
      });
    }
  };

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit(onValidated)}>
        <Typography variant="h6" gutterBottom>
          ที่อยู่ร้าน สำหรับจัดส่งสินค้า
        </Typography>
        <Grid container spacing={1} className={classes.divButtom}>
          <Grid item xs={12} sm={4}>
            <Field
              name="branch_shipping"
              component={InputSelectOptions}
              onChange={updateBranchShipping}
              margin="normal"
              required
            >
              <option value="">กรุณาเลือกข้อมูล</option>
              {branchList &&
                branchList.map(item => (
                  <option key={`${item.code}`} value={`${item.code}`}>
                    {item.name}
                  </option>
                ))}
            </Field>
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom>
          ที่อยู่ลูกค้า สำหรับจัดส่งสินค้า
          <ButtonLink
            to={`${appConstants.publicPath}/home/profile-shipping?backPage=/home/checkout-orders/${
              props.currentCartNo
            }`}
            style={{ color: 'blue', marginLeft: '10px' }}
          >
            อัพเดตข้อมูล!
          </ButtonLink>
        </Typography>
        <Divider className={classes.separateStyle} />
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <Field
              name="member_name"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.memberName} />}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Field
              name="member_lastname"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.memberLastname} />}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="address1"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.address1} />}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="address2"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.address2} />}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name="sub_district"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.subDistrict} />}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name="district"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.district} />}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name="province"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.province} />}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name="postcode"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.postcode} />}
              disabled
            />
          </Grid>
          {response && response.status === 'Success_Update_Address' && (
            <Grid item>
              <span className={classes.greenText}>{response.message}</span>
            </Grid>
          )}
        </Grid>
      </form>
    </>
  );
};

ShippingForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  dispatch: PropTypes.any,
  initialValues: PropTypes.object,
  response: PropTypes.any,
  initLoadMemberShipping: PropTypes.func,
  onUpdateAddressForm: PropTypes.func,
  branchList: PropTypes.array,
  currentCartNo: PropTypes.string,
  initLoadBranchList: PropTypes.func,
};

const validate = formValues => {
  const errors = {};
  if (!formValues.member_name) {
    errors.member_name = <FormattedMessage {...messages.nameShouldNotEmpty} />;
  }
  if (!formValues.member_lastname) {
    errors.member_lastname = <FormattedMessage {...messages.lastNameShouldNotEmpty} />;
  }
  if (!formValues.address1) {
    errors.address1 = <FormattedMessage {...messages.address1ShouldNotEmpty} />;
  }
  if (!formValues.sub_district) {
    errors.sub_district = <FormattedMessage {...messages.subDistrictShouldNotEmpty} />;
  }
  if (!formValues.district) {
    errors.district = <FormattedMessage {...messages.districtShouldNotEmpty} />;
  }
  if (!formValues.province) {
    errors.province = <FormattedMessage {...messages.provinceShouldNotEmpty} />;
  }
  if (!formValues.postcode) {
    errors.postcode = <FormattedMessage {...messages.postcodeShouldNotEmpty} />;
  }
  return errors;
};

const mapStateToProps = createStructuredSelector({
  initialValues: selectors.makeSelectMemberShipping(),
});

export default connect(mapStateToProps)(
  reduxForm({
    form: 'addressForm',
    validate,
    enableReinitialize: true,
    destroyOnUnmount: false,
  })(ShippingForm),
);
