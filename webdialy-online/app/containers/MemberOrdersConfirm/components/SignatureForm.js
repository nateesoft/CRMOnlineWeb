import React, { useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import SignatureCanvas from 'react-signature-canvas';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  rootSigCanvas: {
    border: '1px solid #eee',
  },
  rootButtonAction: {
    padding: '5px',
  },
  btnConfirm: {
    background: 'green',
    color: 'white',
  },
  btnSave: {
    color: 'blue',
    padding: '10px',
  },
}));

const SignatureForm = props => {
  const classes = useStyles();
  const [showLabel, setShowLabel] = useState(false);
  const sigPad = useRef({});

  const clear = () => {
    sigPad.current.clear();
  };

  const trim = () => {
    props.onExit(sigPad.current.getTrimmedCanvas().toDataURL('image/png'));
  };

  return (
    <Grid container>
      <Grid item className={classes.rootSigCanvas}>
        <SignatureCanvas
          canvasProps={{
            className: 'sigCanvas',
            width: '250px',
            height: '200px',
          }}
          ref={sigPad}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container className={classes.rootButtonAction}>
          <Grid item>
            <Button onClick={() => clear()}>Clear</Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              className={classes.btnConfirm}
              onClick={() => {
                trim();
                setShowLabel(true);
              }}
            >
              Confirm Signature
            </Button>
          </Grid>
          <Grid item xs={12}>
            {showLabel && <div className={classes.btnSave}>บันทึกข้อมูลลายเซ็นต์แล้ว</div>}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignatureForm;

SignatureForm.propTypes = {
  onExit: PropTypes.func,
};
