import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    background: '#F9E5DE',
    border: '2px solid orange',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    background: 'none',
    padding: '10px',
    paddingBottom: '20px',
    margin: '10px',
    marginBottom: '20px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loginFooter: {
    marginTop: theme.spacing(1),
  },
  loginTopic: {
    marginTop: theme.spacing(1),
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    padding: '10px',
    background: 'chocolate',
    boxShadow: '5px 5px #bbb',
    fontWeight: 'bold',
    color: 'white',
    textShadow: '2px 2px #ff0000',
    marginTop: '0px',
    position: 'absolute',
  },
}));
