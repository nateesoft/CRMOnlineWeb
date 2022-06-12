import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';
import SweetAlert from 'sweetalert2-react';
import RenderField from 'components/RenderField';
import MapMarker from 'containers/GoogleMap/components/MapMarker';
import InputSelectOptions from 'components/InputSelectOptions';
import { Typography } from '@material-ui/core';
import messages from './messages';
import * as selectors from '../selectors';
import { useStyles } from './styles';

const EditItem = props => {
  const classes = useStyles();
  const { handleSubmit, pristine, reset, submitting, response, dispatch } = props;
  const { map_latitude: mapLatitude, map_longitude: mapLongitude } = props.initialValues;

  const onValidated = formValues => {
    updateData(formValues);
  };

  const updateData = data => {
    props.onUpdateItem(data);
  };

  const clearData = () => {
    props.onInitLoad();
    props.onChangePage('LIST');
  };

  const handlePlace = (latitude, longitude) => {
    dispatch(change('editItem', 'map_latitude', latitude));
    dispatch(change('editItem', 'map_longitude', longitude));
  };

  return (
    <Container maxWidth="lg">
      <SweetAlert
        show={response.status === 'Success'}
        title="Success"
        type="success"
        text={response.message}
        onConfirm={clearData}
      />
      <SweetAlert
        show={response.status === 'Error'}
        title="Error"
        type="error"
        text={response.message}
      />
      <Typography variant="h6">
        <FormattedMessage {...messages.headerEditItem} />
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(onValidated)}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Field
              name="code"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.branchCode} />}
              required
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <Field
              name="name"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.branchName} />}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <Field
              name="map_latitude"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.mapLatitude} />}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <Field
              name="map_longitude"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.mapLongitude} />}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <div align="center" className={classes.divLatLng}>
              <MapMarker
                lat={parseFloat(mapLatitude)}
                lng={parseFloat(mapLongitude)}
                onExit={handlePlace}
              />
            </div>
          </Grid>
        </Grid>
        {/* directiom #1 */}
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Field
              name="mapping_direction_length1"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.mapDirectionLength} />}
            />
          </Grid>
          <Grid item xs={5}>
            <div className={classes.divRedeem}>
              <Field
                name="mapping_type1"
                component={InputSelectOptions}
                type="text"
                margin="normal"
                label={<FormattedMessage {...messages.mappingType} />}
              >
                <option key="A" value="A">
                  คิดราคาตามช่วงกิโลเมตร
                </option>
                <option key="B" value="B">
                  คิดเป็นกิโลเมตร กิโลเมตรละ
                </option>
              </Field>
            </div>
          </Grid>
          <Grid item xs={4}>
            <Field
              name="mapping_baht1"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.mappingBaht} />}
            />
          </Grid>
        </Grid>
        {/* directiom #2 */}
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Field
              name="mapping_direction_length2"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.mapDirectionLength} />}
            />
          </Grid>
          <Grid item xs={5}>
            <div className={classes.divRedeem}>
              <Field
                name="mapping_type2"
                component={InputSelectOptions}
                type="text"
                margin="normal"
                label={<FormattedMessage {...messages.mappingType} />}
              >
                <option key="A" value="A">
                  คิดราคาตามช่วงกิโลเมตร
                </option>
                <option key="B" value="B">
                  คิดเป็นกิโลเมตร กิโลเมตรละ
                </option>
              </Field>
            </div>
          </Grid>
          <Grid item xs={4}>
            <Field
              name="mapping_baht2"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.mappingBaht} />}
            />
          </Grid>
        </Grid>
        {/* directiom #3 */}
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Field
              name="mapping_direction_length3"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.mapDirectionLength} />}
            />
          </Grid>
          <Grid item xs={5}>
            <div className={classes.divRedeem}>
              <Field
                name="mapping_type3"
                component={InputSelectOptions}
                type="text"
                margin="normal"
                label={<FormattedMessage {...messages.mappingType} />}
              >
                <option key="A" value="A">
                  คิดราคาตามช่วงกิโลเมตร
                </option>
                <option key="B" value="B">
                  คิดเป็นกิโลเมตร กิโลเมตรละ
                </option>
              </Field>
            </div>
          </Grid>
          <Grid item xs={4}>
            <Field
              name="mapping_baht3"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.mappingBaht} />}
            />
          </Grid>
        </Grid>
        {/* directiom #4 */}
        <Grid container spacing={1} className={classes.greenPaper}>
          <Grid item xs={3}>
            <Field
              name="mapping_bill_amt1"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.billTotalAmount} />}
            />
          </Grid>
          <Grid item xs={5}>
            <div className={classes.divRedeem}>
              <Field
                name="bill_type1"
                component={InputSelectOptions}
                type="text"
                margin="normal"
                label={<FormattedMessage {...messages.mappingType} />}
              >
                <option key="A" value="A">
                  ฟรีค่าส่งสินค้า
                </option>
                <option key="B" value="B">
                  คิดค่าส่งสินค้าเพิ่ม
                </option>
              </Field>
            </div>
          </Grid>
          <Grid item xs={4}>
            <Field
              name="add_money1"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.mappingBaht} />}
            />
          </Grid>
        </Grid>
        {/* directiom #5 */}
        <Grid container spacing={1} className={classes.greenPaper}>
          <Grid item xs={3}>
            <Field
              name="mapping_bill_amt2"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.billTotalAmount} />}
            />
          </Grid>
          <Grid item xs={5}>
            <div className={classes.divRedeem}>
              <Field
                name="bill_type2"
                component={InputSelectOptions}
                type="text"
                margin="normal"
                label={<FormattedMessage {...messages.mappingType} />}
              >
                <option key="A" value="A">
                  ฟรีค่าส่งสินค้า
                </option>
                <option key="B" value="B">
                  คิดค่าส่งสินค้าเพิ่ม
                </option>
              </Field>
            </div>
          </Grid>
          <Grid item xs={4}>
            <Field
              name="add_money2"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.mappingBaht} />}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              disabled={pristine || submitting}
            >
              <FormattedMessage {...messages.btnSave} />
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" disabled={pristine || submitting} onClick={reset}>
              <FormattedMessage {...messages.btnReset} />
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={() => props.onChangePage('LIST')}>
              <FormattedMessage {...messages.btnBack} />
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

EditItem.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  onRegister: PropTypes.func,
  initialValues: PropTypes.object,
  response: PropTypes.object,
  onUpdateItem: PropTypes.func,
  onInitLoad: PropTypes.func,
  onChangePage: PropTypes.func,
  onCreateItem: PropTypes.func,
  dispatch: PropTypes.any,
};

const validate = formValues => {
  const errors = {};
  if (!formValues.code) {
    errors.code = <FormattedMessage {...messages.codeShouldNotEmpty} />;
  }
  if (!formValues.name) {
    errors.name = <FormattedMessage {...messages.nameShouldNotEmpty} />;
  }
  if (!formValues.map_latitude) {
    errors.map_latitude = <FormattedMessage {...messages.mapLatitudeShouldNotEmpty} />;
  }
  if (!formValues.map_longitude) {
    errors.map_longitude = <FormattedMessage {...messages.mapLongitudeShouldNotEmpty} />;
  }
  return errors;
};

const mapStateToProps = createStructuredSelector({
  initialValues: selectors.makeSelectForm(),
});

export default connect(mapStateToProps)(
  reduxForm({
    form: 'editItem',
    validate,
    enableReinitialize: true,
    destroyOnUnmount: false,
  })(EditItem),
);
