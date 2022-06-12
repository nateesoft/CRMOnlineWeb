import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { v4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  formInput: {
    width: '100%',
  },
}));

export default function SearchBar(props) {
  const classes = useStyles();
  const { items } = props;
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const handleChange = e => {
    setKey(e.target.value);
  };

  const onSearchData = () => {
    if (value.trim() !== '') {
      props.onSearch(key || 'code', value);
    }
  };

  SearchBar.propTypes = {
    onSearch: PropTypes.func,
    items: PropTypes.array,
  };

  return (
    <div
      style={{
        padding: '10px',
        marginTop: '10px',
        marginBottom: '10px',
        background: 'snow',
        border: '1px solid #eeeeee',
      }}
    >
      <Grid container spacing={1} justifyContent="flex-end">
        <Grid item>
          <Select onChange={handleChange} className={classes.formInput} fullWidth>
            {items &&
              items.map(value1 => (
                <MenuItem key={v4()} value={value1.key}>
                  {value1.value}
                </MenuItem>
              ))}
          </Select>
        </Grid>
        <Grid item>
          <TextField
            value={value}
            onChange={e => setValue(e.target.value)}
            className={classes.formInput}
          />
        </Grid>
        <Grid item>
          <Button variant="text" color="primary" onClick={() => onSearchData()}>
            Search
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
