import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    position : 'relative'
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  laoding: {
    position : 'absolute',
    top : 0,
    right : 0,
    width : '100%',
    height : '100%',
    backgroundColor : 'rgb(148,148,148,0.6)',
  },
  loadingcircle : {
    position : 'absolute',
    top : '37%',
    left : '42%',
  }
}));