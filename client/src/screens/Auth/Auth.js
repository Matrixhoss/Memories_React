import React , {useState , useEffect} from 'react'
import { Button ,Avatar ,Typography , Grid , Paper , Container  , CircularProgress , Grow} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import Icon from './Icon'
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import useStyles from './styles'
import Input from './Input'
import {useHistory} from 'react-router-dom'
import { useDispatch  ,useSelector} from "react-redux";
import {auth ,handleSignin , handleSignup , clearError} from '../../actions/auth'

const Auth = () => {

    const data = {
        firstname : '',
        lastname : '',
        email :'',
        password :'',
        confirmpassword : '',
    }
    const [showPassword , setShowPassword] = useState(false)
    const [formData , setFormData] = useState(data)
    const [isSignUp , setIsSignUp] = useState(false)
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.loading)
    const error = useSelector((state) => state.auth.authError)



    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('profile'))
        user && history.push('/')
    } ,[history])
    const handleSubmit = (e) => {
        e.preventDefault()
       isSignUp ? dispatch(handleSignup(formData , history)) : dispatch(handleSignin(formData ,history))
        
    }
    const handleChange = (e) => {
        if (e.target.name === 'email'){
        setFormData(prev => ({...prev , [e.target.name] : e.target.value.toLowerCase()}))
        }else{
            setFormData(prev => ({...prev , [e.target.name] : e.target.value}))
        }
    }
    const switchMode = () => {
        setIsSignUp((prev) =>(!prev) )
        setShowPassword(false)
        dispatch(clearError())
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const googleFailuer = () => {
        console.log('Google Login Error')
    }
    const googleSuccess = async (res) => {
       
        const result = res?.profileObj
        const token = res?.tokenId

        dispatch(auth({result , token}))
        history.push('/')
    }
    
    return (
    <Grow in>
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
            {loading && 
            <div className = {classes.laoding}>
                <CircularProgress  className={classes.loadingcircle} />
            </div>
            }
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp  && 
                            <>
                                <Input name='firstname' label='First Name' onChange = {handleChange} autoFocus half  disabled={loading}/>
                                <Input name='lastname' label='Last Name' onChange = {handleChange}  half disabled={loading}/>

                            </>
                        }
                        <Input name='email' label='Email Address' onChange = {handleChange} type='email'  disabled={loading}/>
                        <Input name='password' label='Password' onChange = {handleChange} type={showPassword ? 'text':'password'} handleShowPassword = {handleShowPassword}  disabled={loading}/>
                        {
                            isSignUp &&
                            <Input name='confirmpassword' label='Confirm Password' onChange = {handleChange} type='password' disabled={loading} />

                        }
                        {error && 
                            
                            <Typography className = {classes.error}>{error}</Typography>
                            
                        }
                    </Grid>

                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit} disabled={loading}>
                        {
                            isSignUp ? 'Sign up' : 'Sign In'
                        }
                    </Button>
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_ID}
                        render = {(renderProps) =>( 
                            <Button  className = {classes.googleButton} color = 'primary' fullWidth onClick = {renderProps.onClick} disabled = {renderProps.disabled || loading} startIcon ={<Icon />} variant='contained' >
                                    Google Sign In
                            </Button>
                        )}
                        onSuccess = {googleSuccess}
                        onFailure = {googleFailuer}
                        cookiePolicy = 'single_host_origin'
                    />
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Button onClick ={switchMode} disabled={loading}>
                                {
                                    isSignUp ? 'Already have an account ? Sign In' : 'Don\'n have an account ? Sign Up'
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    </Grow>
    )
}

export default Auth
