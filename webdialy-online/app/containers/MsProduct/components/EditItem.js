import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';
import SweetAlert from 'sweetalert2-react';
import { makeStyles } from '@material-ui/core/styles';

import * as appConstants from 'containers/App/constants';
import RenderField from 'components/RenderField';
import messages from './messages';
import * as selectors from '../selectors';

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
  loginTopic: {
    marginTop: theme.spacing(1),
  },
  paddingImg: {
    margin: '10px',
    background: '#aaa',
  },
  formControl: {
    minWidth: '100%',
  },
}));

const EditItem = props => {
  const classes = useStyles();
  const { handleSubmit, pristine, reset, submitting, response, groupList, stockList } = props;
  const [file, setFile] = useState(null);
  const { img_path: imgPath, product_group_code, stock_code } = props.initialValues;

  const [productGroupCode, setProductGroupCode] = useState(product_group_code);
  const [stockCode, setStockCode] = useState(stock_code);

  const apiServiceEndpoint = appConstants.serviceApiPath;

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

  const onChangeHandler = event => {
    setFile(event.target.files[0]);
  };

  const onUploadImageFile = () => {
    props.onUploadImage(file);
  };

  const handleProductGroup = group => {
    change('product_group_code:', group);
    setProductGroupCode(group);
  };

  const handleStockCode = code => {
    change('stock_code:', code);
    setStockCode(code);
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
          <Grid item xs={6} md={3}>
            <Field
              name="code"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.code} />}
              required
              disabled
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
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel htmlFor="product_group_code">
                <FormattedMessage {...messages.groupCode} />
              </InputLabel>
              <Select
                id="product_group_code"
                value={productGroupCode}
                onChange={e => handleProductGroup(e.target.value)}
              >
                <MenuItem value="">
                  <em>--- เลือกรายการ ---</em>
                </MenuItem>
                {groupList &&
                  groupList.map((item, index) => (
                    <MenuItem value={item.code}>{item.name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
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
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel htmlFor="stock_code">
                <FormattedMessage {...messages.stkCode} />
              </InputLabel>
              <Select
                id="stock_code"
                value={stockCode}
                onChange={e => handleStockCode(e.target.value)}
              >
                <MenuItem value="">
                  <em>--- เลือกรายการ ---</em>
                </MenuItem>
                {stockList &&
                  stockList.map((item, index) => (
                    <MenuItem value={item.code}>{item.name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
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
          <Grid item xs={12}>
            <Field
              name="img_path"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.imagePath} />}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <input type="file" name="file" onChange={onChangeHandler} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" color="primary" onClick={() => onUploadImageFile()}>
              Upload
            </Button>
          </Grid>
          {imgPath && (
            <Grid item xs={12}>
              <Paper elevation={3} className={classes.paddingImg}>
                <img src={`${apiServiceEndpoint}${imgPath}`} width="250" alt="" />
              </Paper>
            </Grid>
          )}
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
  onUploadImage: PropTypes.func,
  groupList: PropTypes.array,
  stockList: PropTypes.array,
};

const validate = formValues => {
  const errors = {};
  if (!formValues.code) {
    errors.code = <FormattedMessage {...messages.col1ShouldNotEmpty} />;
  }
  if (!formValues.name) {
    errors.name = <FormattedMessage {...messages.col2ShouldNotEmpty} />;
  }
  if (!formValues.unit_code_sale) {
    errors.unit_code_sale = <FormattedMessage {...messages.col3ShouldNotEmpty} />;
  }
  if (!formValues.product_group_code) {
    errors.product_group_code = <FormattedMessage {...messages.col4ShouldNotEmpty} />;
  }
  if (!formValues.point || formValues.point < 0) {
    errors.point = <FormattedMessage {...messages.col5ShouldNotEmpty} />;
  }
  if (!formValues.stock_code) {
    errors.stock_code = <FormattedMessage {...messages.col6ShouldNotEmpty} />;
  }
  if (!formValues.price_e || formValues.price_e < 0) {
    errors.price_e = <FormattedMessage {...messages.col7ShouldNotEmpty} />;
  }
  if (!formValues.price_t || formValues.price_t < 0) {
    errors.price_t = <FormattedMessage {...messages.col8ShouldNotEmpty} />;
  }
  if (!formValues.price_d || formValues.price_d < 0) {
    errors.price_d = <FormattedMessage {...messages.col9ShouldNotEmpty} />;
  }
  if (!formValues.max_stock || formValues.max_stock < 0) {
    errors.max_stock = <FormattedMessage {...messages.col10ShouldNotEmpty} />;
  }
  if (!formValues.min_stock || formValues.min_stock < 0) {
    errors.min_stock = <FormattedMessage {...messages.col11ShouldNotEmpty} />;
  }
  if (!formValues.unit_code_stock) {
    errors.unit_code_stock = <FormattedMessage {...messages.col12ShouldNotEmpty} />;
  }
  if (!formValues.img_path) {
    errors.img_path = <FormattedMessage {...messages.col13ShouldNotEmpty} />;
  }
  if (!formValues.qty_over_stock) {
    errors.qty_over_stock = <FormattedMessage {...messages.col13ShouldNotEmpty} />;
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
