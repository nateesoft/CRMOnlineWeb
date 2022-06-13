/**
 *
 * RenderField
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  errorLabel: {
    color: 'red',
  },
}));
function RenderField({
  input,
  label,
  type,
  required,
  autoFocus,
  disabled,
  meta: { touched, error },
}) {
  const classes = useStyles();

  return (
    <>
      <TextField
        {...input}
        variant="outlined"
        margin="normal"
        type={type}
        fullWidth
        label={label}
        required={required}
        autoFocus={autoFocus}
        disabled={disabled}
      />
      {touched && error && <span className={classes.errorLabel}>{error}</span>}
    </>
  );
}

RenderField.propTypes = {
  input: PropTypes.any,
  label: PropTypes.object,
  type: PropTypes.string,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  meta: PropTypes.object,
};

export default RenderField;
