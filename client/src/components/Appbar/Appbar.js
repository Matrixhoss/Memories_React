import React  ,{useState , useEffect}from 'react'
import memories from '../../images/memories.png'
import {AppBar , Avatar, Button, Toolbar, Typography , Grid } from '@material-ui/core'
import {Link , useHistory , useLocation} from 'react-router-dom'
import { logout } from "../../actions/auth";
import {useDispatch} from 'react-redux'
import decode from 'jwt-decode'
import useStyles from './styles'

const Appbar = () => {
    const classes = useStyles()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))) 
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
   
    useEffect(() => {
        const token  = user?.token
            if(token){
                const decodedToken = decode(token)
                if (decodedToken.exp * 1000 < new Date().getTime()) {
                    handleLogout()
                }
            }
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])

    const handleLogout = () => {
        dispatch(logout())
        history.push('/')
        setUser(null)
    }

    return (
        <AppBar className ={classes.appBar} position='static' color="inherit">
            <Grid container alignItems='center'>
            <Grid item xs={12} md={8}>
                <div className={classes.brandContainer}>
                    <Typography className={classes.heading} component={Link} to='/' variant="h2" align="center"> Memories</Typography>
                    <img className={classes.image} src={memories} alt="Memories" height="60"/>
                </div>
            </Grid>
          
            {
                user ? (
                    <Grid item xs={12} md={4} className  = {classes.profile} >
                        <Avatar 
                        className={classes.purple} 
                        alt={user.result.name} 
                        src={user.result.imageUrl}>
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                        <Button variant='contained' color='secondary' onClick={handleLogout}>Logout</Button>
                    
                    </Grid>
                ) : (
                    <Grid item xs={12} md={4} className  = {classes.profile} >
                        <Button component={Link} to='/auth' color='primary' variant='contained'>Login</Button>
                    </Grid>
                )
            }
            </Grid>
           
        </AppBar>
    )
}

export default Appbar
