import {FETCH_ALL ,CREATE_POST ,UPDATE_POST ,DELETE_POST ,LIKE_POST} from '../actions/posts'
const posts = (state = [] , action) => {
    switch(action.type) {
        
        case FETCH_ALL : return action.data

        case CREATE_POST : return [...state , action.post]

        case DELETE_POST : return state.filter((post) => post._id !== action.id )

        case UPDATE_POST : return state.map((post) => post._id === action.post._id ? action.post : post)

        case LIKE_POST : return state.map((post) => post._id === action.payload.id ? {...post , likes : action.payload.data} : post)

        default : return state
    }
}


export default posts