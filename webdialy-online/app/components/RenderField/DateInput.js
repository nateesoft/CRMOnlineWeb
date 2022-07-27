/**
 *
 * RenderField
 *
 */

import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// import DatePicker from 'react-multi-date-picker';

// import thai from './thai';
// import thaiTH from './thai_th';

const useStyles = makeStyles(() => ({
  errorLabel: {
    color: 'red',
  },
}));

function DateInput({ input, label, required, meta: { touched, error } }) {
  const classes = useStyles();
  // return <DatePicker calendar={thai} locale={thaiTH} format="DD/MM/YYYY" />;
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

DateInput.propTypes = {
  input: PropTypes.any,
  label: PropTypes.object,
  required: PropTypes.bool,
  meta: PropTypes.object,
};

export default DateInput;
