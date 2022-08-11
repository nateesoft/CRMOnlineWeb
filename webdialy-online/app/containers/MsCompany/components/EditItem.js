import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Grid, Paper, Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
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
}));

const EditItem = props => {
  const classes = useStyles();
  const { handleSubmit, pristine, reset, submitting, response } = props;
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const { img_path: imgPath } = props.initialValues;

  const apiServiceHost = appConstants.apiUploadServiceHost;

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
    setPreview(URL.createObjectURL(event.target.files[0]));
  };

  const onUploadImageFile = () => {
    props.onUploadImage(file);
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
        <FormattedMessage {...messages.updateItemHeader} />
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(onValidated)}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Field
              name="code"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.col1} />}
              required
              disabled
            />
          </Grid>
          <Grid item xs={9}>
            <Field
              name="name"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.col2} />}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="line_official_id"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.col3} />}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="prefix_running"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.col5} />}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="member_running"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.col4} />}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="size_running"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.col6} />}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="order_prefix"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.col8} />}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="order_running"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.col7} />}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="order_size_running"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.col9} />}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="cart_prefix"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.col11} />}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="cart_running"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.col10} />}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="cart_size_running"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.col12} />}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="member_register_point"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.col13} />}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Field
              name="img_path"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.col14} />}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <input type="file" name="file" onChange={onChangeHandler} />
            <br />
          </Grid>
          <Grid item xs={12}>
            {preview && <img src={preview} width={200} height={200} alt="" />}
          </Grid>
          <Grid item xs={6}>
            {file && file.name && (
              <Button variant="contained" color="primary" onClick={() => onUploadImageFile()}>
                Please press upload button
              </Button>
            )}
          </Grid>
          {imgPath && (
            <Grid item xs={12}>
              <Paper elevation={3} className={classes.paddingImg}>
                <img src={`${apiServiceHost}${imgPath}`} width="250" alt="" />
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
};

const validate = formValues => {
  const errors = {};
  if (!formValues.code) {
    errors.code = <FormattedMessage {...messages.col1ShouldNotEmpty} />;
  }
  if (!formValues.name) {
    errors.name = <FormattedMessage {...messages.col2ShouldNotEmpty} />;
  }
  if (!formValues.line_official_id) {
    errors.line_official_id = <FormattedMessage {...messages.col3ShouldNotEmpty} />;
  }
  if (!formValues.member_running) {
    errors.member_running = <FormattedMessage {...messages.col4ShouldNotEmpty} />;
  }
  if (!formValues.prefix_running) {
    errors.prefix_running = <FormattedMessage {...messages.col5ShouldNotEmpty} />;
  }
  if (!formValues.size_running) {
    errors.size_running = <FormattedMessage {...messages.col6ShouldNotEmpty} />;
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
