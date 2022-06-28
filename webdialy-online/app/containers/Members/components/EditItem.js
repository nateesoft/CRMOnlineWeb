import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import Select from '@material-ui/core/Select';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import SweetAlert from 'sweetalert2-react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import { v4 } from 'uuid';
import RenderField from 'components/RenderField';
import { Typography } from '@material-ui/core';
import messages from './messages';
import * as selectors from '../selectors';

const useStyles = makeStyles(theme => ({
  formControl: {
    width: '100%',
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
  divRole: {
    width: '100%',
    paddingTop: '14px',
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

const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => {
  renderSelectField.propTypes = {
    input: PropTypes.any,
    label: PropTypes.any,
    meta: PropTypes.any,
    children: PropTypes.any,
  };

  return (
    <FormControl variant="outlined" error={touched && error} style={{ width: '100%' }}>
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

const EditItem = props => {
  const classes = useStyles();
  const { handleSubmit, pristine, reset, submitting, response, rolesList } = props;

  const onValidated = formValues => {
    props.onUpdateItem(formValues);
  };

  const clearData = () => {
    props.onInitLoad({ page: 1, limit: 20 });
    props.onChangePage('LIST');
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
          <Grid item xs={4}>
            <Field
              name="code"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.memberCode} />}
              required
              disabled
            />
          </Grid>
          <Grid item xs={4}>
            <div className={classes.divRole}>
              <Field
                id="member_role"
                name="member_role"
                component={renderSelectField}
                label={<FormattedMessage {...messages.role} />}
                required
              >
                {rolesList &&
                  rolesList.map(item => (
                    <option key={v4()} value={item.code}>
                      {item.name}
                    </option>
                  ))}
              </Field>
            </div>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={4}>
            <Field
              name="email"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.email} />}
              disabled
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="first_name"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.name} />}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="last_name"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.lastName} />}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="total_score"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.totalScore} />}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="total_purchase"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.totalPurchase} />}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="mobile"
              component={RenderField}
              type="text"
              margin="normal"
              label={<FormattedMessage {...messages.mobile} />}
              required
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
  rolesList: PropTypes.array,
};

const validate = formValues => {
  const errors = {};

  if (!formValues.first_name) {
    errors.first_name = <FormattedMessage {...messages.firstNameSouldNotEmpty} />;
  }
  if (!formValues.last_name) {
    errors.last_name = <FormattedMessage {...messages.lastNameShouldNotEmpty} />;
  }
  if (!formValues.member_role) {
    errors.member_role = <FormattedMessage {...messages.roleShouldNotEmpty} />;
  }
  if (!formValues.mobile) {
    errors.mobile = <FormattedMessage {...messages.mobileShouldNotEmpty} />;
  }
  if (!formValues.total_score || formValues.total_score < 0) {
    errors.total_score = <FormattedMessage {...messages.totalScoreShouldNotEmpty} />;
  }
  if (!formValues.total_purchase || formValues.total_purchase < 0) {
    errors.total_purchase = <FormattedMessage {...messages.totalPurchaseShouldNotEmpty} />;
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
