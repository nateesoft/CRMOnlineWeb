import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Paper } from '@material-ui/core';
import SweetAlert from 'sweetalert2-react';
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
}));

const NewItem = props => {
  const classes = useStyles();
  const { handleSubmit, pristine, reset, submitting, response } = props;

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

  return (
    <Container component={Paper} maxWidth="lg">
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
      <Typography variant="h5" className={classes.topic}>
        <FormattedMessage {...messages.newItemHeader} />
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(onValidated)}>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Field
              name="code"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.col1} />}
              required
              autoFocus
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
              type="number"
              margin="normal"
              label={<FormattedMessage {...messages.col13} />}
              required
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={4} lg={3}>
            <Button
              id="btnSave"
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
              id="btnReset"
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
              id="btnBack"
              fullWidth
              variant="contained"
              onClick={() => props.onChangePage('LIST')}
            >
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

export default reduxForm({
  form: 'newForm',
  validate,
})(NewItem);
