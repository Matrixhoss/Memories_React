import { AUTH ,LOGOUT , AUTH_ERROR , CLEAR_ERROR} from "../actions/auth";

const auth  = (state = {} , action) =>{
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile' ,JSON.stringify({...action?.data}))
           return {...state , authData : action?.data , authError : null}
        case LOGOUT:
        case CLEAR_ERROR :
            localStorage.clear()
           return {...state , authData : null , authError : null}
        case AUTH_ERROR:
           return {...state , authData : null , authError : action.data}
        default:
            return state;
    }
} 

export default auth