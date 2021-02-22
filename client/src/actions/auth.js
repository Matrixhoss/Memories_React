
import { signIn , signUp } from "../api/index";
import {startLoading , stopLoading} from './loading'
export const AUTH = "AUTH"
export const LOGOUT = "LOGOUT"
export const AUTH_ERROR = "AUTH_ERROR"
export const CLEAR_ERROR = "CLEAR_ERROR"


export const auth  = (data) => {
    return {
        type : AUTH ,
        data
    }
} 

export const logout = () => {
    return {
        type : LOGOUT
    }
}
export const authError = (data) => {
    return {
        type : AUTH_ERROR,
        data
    }
}
export const clearError = () => {
    return {
        type : CLEAR_ERROR,
        
    }
}

export const handleSignin = (formData ,history) => async(dispatch) => {
    try {
        dispatch(startLoading())
        const { data } = await signIn(formData)
        dispatch(auth(data))
        history.push('/')
        dispatch(stopLoading())

    } catch (error) {
        
        dispatch(authError(error.response.data.message))
        dispatch(stopLoading())
    }
}
export const handleSignup = (formData ,history) => async(dispatch) => {
    try {
       dispatch(startLoading())
        const { data } = await signUp(formData)
        dispatch(auth(data))
        history.push('/')
        dispatch(stopLoading())
        
    } catch (error) {
        dispatch(authError(error.response.data.message))
        dispatch(stopLoading())
    }
}


