import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Select, FormControl, InputLabel } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import SweetAlert from 'sweetalert2-react';
import FormHelperText from '@material-ui/core/FormHelperText';

import * as appConstants from 'containers/App/constants';
import RenderField from 'components/RenderField';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
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
  },
  formControl: {
    minWidth: '100%',
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

const renderSelectField = ({ id, input, label, meta: { touched, error }, children, ...custom }) => {
  renderSelectField.propTypes = {
    id: PropTypes.any,
    input: PropTypes.any,
    label: PropTypes.any,
    meta: PropTypes.any,
    children: PropTypes.any,
  };

  return (
    <FormControl variant="outlined" error={touched && error} style={{ width: '100%' }}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        native
        {...id}
        {...input}
        {...custom}
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
  const { handleSubmit, pristine, reset, submitting, response, groupList, stockList } = props;
  const [file, setFile] = useState(null);
  const [showImg, setShowImg] = useState(false);

  const apiServiceEndpoint = appConstants.serviceApiPath;

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
    onUploadImage: PropTypes.func,
    groupList: PropTypes.array,
    stockList: PropTypes.array,
  };

  const onChangeHandler = event => {
    setShowImg(false);
    setFile(event.target.files[0]);
  };

  const onUploadImageFile = () => {
    props.onUploadImage(file);
    setShowImg(true);
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
        <FormattedMessage {...messages.newItemHeader} />
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(onValidated)}>
        <Grid container spacing={1}>
          <Grid item xs={6} md={3}>
            <Field
              name="code"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.code} />}
              required
              autoFocus
            />
          </Grid>
          <Grid item xs={6} md={5}>
            <Field
              name="name"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.name} />}
              required
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <Field
              name="unit_code_sale"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.unitSale} />}
              required
            />
          </Grid>
          <Grid item xs={6} md={2} style={{ marginTop: 16 }}>
            <Field
              id="product_group_code"
              name="product_group_code"
              component={renderSelectField}
              label={<FormattedMessage {...messages.groupCode} />}
              required
            >
              <option value="" />
              {groupList &&
                groupList.map((item, index) => <option value={item.code}>{item.name}</option>)}
            </Field>
          </Grid>
          <Grid item xs={6} md={3}>
            <Field
              name="point"
              component={RenderField}
              type="number"
              margin="normal"
              label={<FormattedMessage {...messages.point} />}
              required
            />
          </Grid>
          <Grid item xs={6} md={3} style={{ marginTop: 16 }}>
            <Field
              id="stock_code"
              name="stock_code"
              component={renderSelectField}
              label={<FormattedMessage {...messages.stkCode} />}
              required
            >
              <option value="" />
              {stockList &&
                stockList.map((item, index) => <option value={item.code}>{item.name}</option>)}
            </Field>
          </Grid>
          <Grid item xs={6} md={2}>
            <Field
              name="price_e"
              component={RenderField}
              type="number"
              margin="normal"
              label={<FormattedMessage {...messages.eatIn} />}
              required
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <Field
              name="price_t"
              component={RenderField}
              type="number"
              margin="normal"
              label={<FormattedMessage {...messages.takeAway} />}
              required
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <Field
              name="price_d"
              component={RenderField}
              type="number"
              margin="normal"
              label={<FormattedMessage {...messages.delivery} />}
              required
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <Field
              name="max_stock"
              component={RenderField}
              type="number"
              margin="normal"
              label={<FormattedMessage {...messages.maxStock} />}
              required
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <Field
              name="min_stock"
              component={RenderField}
              type="number"
              margin="normal"
              label={<FormattedMessage {...messages.minStock} />}
              required
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <Field
              name="unit_code_stock"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.unitStock} />}
              required
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <Field
              name="qty_over_stock"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.qtyNoLimit} />}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <input type="file" name="file" onChange={onChangeHandler} />
          </Grid>
          <Grid item xs={12} md={6}>
            {file && file.name && (
              <Button variant="contained" color="primary" onClick={() => onUploadImageFile()}>
                อัพโหลดรูปภาพ
              </Button>
            )}
          </Grid>
          <Grid item xs={12}>
            {showImg && (
              <div className={classes.paddingImg}>
                <img src={`${apiServiceEndpoint}/images/${file.name}`} width="250" alt="" />
              </div>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item>
            <Button
              id="btnSave"
              type="submit"
              variant="outlined"
              color="primary"
              disabled={pristine || submitting}
            >
              <FormattedMessage {...messages.btnSave} />
            </Button>
          </Grid>
          <Grid item>
            <Button
              id="btnReset"
              variant="outlined"
              disabled={pristine || submitting}
              onClick={reset}
            >
              <FormattedMessage {...messages.btnReset} />
            </Button>
          </Grid>
          <Grid item>
            <Button id="btnBack" variant="outlined" onClick={() => props.onChangePage('LIST')}>
              <FormattedMessage {...messages.btnBack} />
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

const validate = formValues => {
  const errors = {};
  if (!formValues.code) {
    errors.code = <FormattedMessage {...messages.codeShouldNotEmpty} />;
  }
  if (!formValues.name) {
    errors.name = <FormattedMessage {...messages.nameShouldNotEmpty} />;
  }
  if (!formValues.unit_code_sale) {
    errors.unit_code_sale = <FormattedMessage {...messages.unitSaleShouldNotEmpty} />;
  }
  if (!formValues.product_group_code) {
    errors.product_group_code = <FormattedMessage {...messages.groupCodeShouldNotEmpty} />;
  }
  if (!formValues.point || formValues.point < 0) {
    errors.point = <FormattedMessage {...messages.pointShouldNotEmpty} />;
  }
  if (!formValues.stock_code) {
    errors.stock_code = <FormattedMessage {...messages.stkCodeShouldNotEmpty} />;
  }
  if (!formValues.price_e || formValues.price_e < 0) {
    errors.price_e = <FormattedMessage {...messages.eatInShouldNotEmpty} />;
  }
  if (!formValues.price_t || formValues.price_t < 0) {
    errors.price_t = <FormattedMessage {...messages.takeAwayShouldNotEmpty} />;
  }
  if (!formValues.price_d || formValues.price_d < 0) {
    errors.price_d = <FormattedMessage {...messages.deliveryShouldNotEmpty} />;
  }
  if (!formValues.max_stock || formValues.max_stock < 0) {
    errors.max_stock = <FormattedMessage {...messages.maxStockShouldNotEmpty} />;
  }
  if (!formValues.min_stock || formValues.min_stock < 0) {
    errors.min_stock = <FormattedMessage {...messages.minStockShouldNotEmpty} />;
  }
  if (!formValues.unit_code_stock) {
    errors.unit_code_stock = <FormattedMessage {...messages.unitStockShouldNotEmpty} />;
  }
  if (!formValues.img_path) {
    errors.img_path = <FormattedMessage {...messages.imagePathShouldNotEmpty} />;
  }
  if (!formValues.qty_over_stock) {
    errors.qty_over_stock = <FormattedMessage {...messages.checkQtyOrNotShouldNotEmpty} />;
  }
  return errors;
};

export default reduxForm({
  form: 'newForm',
  validate,
})(NewItem);
