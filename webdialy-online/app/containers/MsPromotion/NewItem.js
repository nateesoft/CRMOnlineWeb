import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import SweetAlert from 'sweetalert2-react';
import { Paper } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import RenderField from 'components/RenderField';
import DateInput from 'components/RenderField/DateInput';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  topic: {
    marginTop: theme.spacing(1),
  },
  paddingImg: {
    margin: '10px',
    background: '#aaa',
  },
}));
const renderFromHelper = ({ touched, error }) => {
  renderFromHelper.propTypes = {
    touched: PropTypes.any,
    error: PropTypes.any,
  };
  if (!(touched && error)) {
    return <span />;
  }
  return <FormHelperText>{touched && error}</FormHelperText>;
};
const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => {
  renderSelectField.propTypes = {
    input: PropTypes.any,
    label: PropTypes.any,
    meta: PropTypes.any,
    children: PropTypes.any,
  };
  return (
    <FormControl
      variant="outlined"
      error={touched && error}
      style={{ width: '100%' }}
    >
      <InputLabel htmlFor={input.id}>{label}</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        native
        {...input}
        {...custom}
        inputProps={{
          name: 'age',
          id: input.id,
        }}
        label={label}
      >
        {children}
      </Select>
      {renderFromHelper({ touched, error })}
    </FormControl>
  );
};

const NewItem = props => {
  const classes = useStyles();
  const { handleSubmit, pristine, reset, submitting, response } = props;
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const onValidated = formValues => {
    saveData(formValues);
  };

  const clearData = () => {
    props.onInitLoad();
    props.onChangePage('LIST');
  };

  const saveData = data => {
    props.onCreateItem(data);
  };

  NewItem.propTypes = {
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    reset: PropTypes.func,
    submitting: PropTypes.bool,
    onRegister: PropTypes.func,
    response: PropTypes.object,
    onUpdateItem: PropTypes.func,
    onInitLoad: PropTypes.func,
    onChangePage: PropTypes.func,
    onCreateItem: PropTypes.func,
  };

  const onChangeHandler = event => {
    setFile(event.target.files[0]);
    setPreview(URL.createObjectURL(event.target.files[0]));
  };

  const onUploadImageFile = () => {
    props.onUploadImage(file);
  };

  return (
    <Container component="main" maxWidth="lg">
      <SweetAlert
        show={response.status === 'Upload_Success'}
        title="Success"
        type="success"
        text={response.message}
        onConfirm={() => console.log('Upload success')}
      />
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
      <div className={classes.paper}>
        <Typography variant="h5" className={classes.topic}>
          <FormattedMessage {...messages.newItemHeader} />
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onValidated)}>
          <Grid container spacing={1}>
            <Grid item xs={4} md={3}>
              <Field
                name="product_code"
                component={RenderField}
                type="text"
                margin="normal"
                label={<FormattedMessage {...messages.col1} />}
                required
              />
            </Grid>
            <Grid item xs={8} md={6}>
              <Field
                name="redeem_name"
                component={RenderField}
                type="text"
                margin="normal"
                label={<FormattedMessage {...messages.col2} />}
                required
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Field
                name="point_to_redeem"
                component={RenderField}
                type="number"
                margin="normal"
                label={<FormattedMessage {...messages.col3} />}
                required
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <Field
                name="start_time"
                component={DateInput}
                type="date"
                margin="normal"
                label={<FormattedMessage {...messages.col4} />}
                required
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <Field
                name="finish_time"
                component={DateInput}
                type="date"
                margin="normal"
                label={<FormattedMessage {...messages.col5} />}
                required
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <Field
                name="qty_in_stock"
                component={RenderField}
                type="number"
                margin="normal"
                label={<FormattedMessage {...messages.col6} />}
                required
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <div style={{ width: '100%', paddingTop: '15px' }}>
                <Field
                  name="redeem_or_free"
                  component={renderSelectField}
                  label={<FormattedMessage {...messages.col8} />}
                  required
                >
                  <option key="F" value="F">
                    Free
                  </option>
                  <option key="R" value="R">
                    Redeem
                  </option>
                </Field>
              </div>
            </Grid>
            <Grid item xs={6} md={3}>
              <Field
                name="discount_amt"
                component={RenderField}
                type="number"
                margin="normal"
                label={<FormattedMessage {...messages.col9} />}
                required
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <Field
                name="discount_percent"
                component={RenderField}
                type="number"
                margin="normal"
                label={<FormattedMessage {...messages.col10} />}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <input type="file" name="file" onChange={onChangeHandler} />
              <br />
            </Grid>
            <Grid item xs={12}>
              {preview && <img src={preview} width={200} height={200} />}
            </Grid>
            <Grid item xs={6}>
              {file && file.name && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onUploadImageFile()}
                >
                  Please press upload button
                </Button>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={4} lg={3}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={pristine || submitting}
              >
                <FormattedMessage {...messages.btnSave} />
              </Button>
            </Grid>
            <Grid item xs={4} lg={3}>
              <Button
                fullWidth
                variant="contained"
                disabled={pristine || submitting}
                onClick={reset}
              >
                <FormattedMessage {...messages.btnReset} />
              </Button>
            </Grid>
            <Grid item xs={4} lg={3}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => props.onChangePage('LIST')}
              >
                <FormattedMessage {...messages.btnBack} />
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const validate = formValues => {
  const errors = {};
  if (!formValues.product_code) {
    errors.product_code = <FormattedMessage {...messages.col1ShouldNotEmpty} />;
  }
  if (!formValues.product_name) {
    errors.product_name = <FormattedMessage {...messages.col2ShouldNotEmpty} />;
  }
  if (!formValues.point_to_redeem && formValues.point_to_redeem < 0) {
    errors.point_to_redeem = (
      <FormattedMessage {...messages.col3ShouldNotEmpty} />
    );
  }
  if (!formValues.start_time) {
    errors.start_time = <FormattedMessage {...messages.col4ShouldNotEmpty} />;
  }
  if (!formValues.finish_time) {
    errors.finish_time = <FormattedMessage {...messages.col5ShouldNotEmpty} />;
  }
  if (!formValues.qty_in_stock && formValues.qty_in_stock < 0) {
    errors.qty_in_stock = <FormattedMessage {...messages.col6ShouldNotEmpty} />;
  }
  if (formValues.discount_amt > 0 && formValues.discount_percent > 0) {
    errors.discount_amt = (
      <FormattedMessage {...messages.discountAmtOrPercentOnly} />
    );
    errors.discount_percent = (
      <FormattedMessage {...messages.discountAmtOrPercentOnly} />
    );
  }
  return errors;
};

export default reduxForm({
  form: 'newForm',
  validate,
})(NewItem);
