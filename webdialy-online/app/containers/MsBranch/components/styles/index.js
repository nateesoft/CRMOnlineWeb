import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
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
  divLatLng: {
    marginBottom: '25px',
  },
  divRedeem: {
    width: '100%',
    paddingTop: '16px',
  },
}));
