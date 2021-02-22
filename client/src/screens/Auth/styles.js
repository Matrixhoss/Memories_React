import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    marginBottom: theme.spacing(2),
  },
  loadingcircle : {
    position : 'absolute',
    top : '49%',
    left : '49%',
  },
  laoding: {
    position : 'absolute',
    top : 0,
    right : 0,
    width : '100%',
    height : '100%',
    backgroundColor : 'rgb(148,148,148,0.6)',
    zIndex : '100'
  },
  error: {
    width: '100%' ,
    color : 'red',
    textAlign : 'center',
    fontWeight : 700
  }
}));