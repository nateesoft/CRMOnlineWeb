/**
 *
 * RenderField
 *
 */

import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  errorLabel: {
    color: 'red',
  },
}));
function DateTimeInput({ input, label, required, meta: { touched, error } }) {
  const classes = useStyles();

  return (
    <>
      <TextField
        {...input}
        variant="outlined"
        margin="normal"
        type="date"
        fullWidth
        label={label}
        required={required}
        InputLabelProps={{
          shrink: true,
        }}
      />
      {touched && error && <span className={classes.errorLabel}>{error}</span>}
    </>
  );
}

DateTimeInput.propTypes = {
  input: PropTypes.any,
  label: PropTypes.object,
  required: PropTypes.bool,
  meta: PropTypes.object,
};

export default DateTimeInput;
