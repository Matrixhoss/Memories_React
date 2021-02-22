import * as api from '../api'
import {startLoading ,stopLoading} from './loading'

export const FETCH_ALL = "FETCH_ALL"
export const CREATE_POST = "CREATE_POST"
export const UPDATE_POST = "UPDATE_POST"
export const DELETE_POST = "DELETE_POST"
export const LIKE_POST = "LIKE_POST"

const getPosts = (data) => {
    return {
        type : FETCH_ALL,
        data
    }
}

const createPost = (post) =>{
    return {
        type : CREATE_POST ,
        post
    }
}
const updatePost = (post) =>{
    return {
        type : UPDATE_POST ,
        post
    }
}
const deletePost = (id) =>{
    return {
        type : DELETE_POST ,
        id
    }
}
const likePost = (id , data) => {
    return {
        type : LIKE_POST ,
        payload : {id , data}
    }
}

export const handleGetData = () => async (dispatch) => {
    try {
        const {data} = await api.fetchPosts()
      
        dispatch (getPosts(data))
        
    } catch (error) {
        console.log(error)
    }
}

export const handleCreatePost = (post) => async (dispatch) => {
    try {
        dispatch(startLoading())
        const {data} = await api.createPost(post)
        dispatch(createPost(data))
        dispatch(stopLoading())
        
    } catch (error) {
        dispatch(stopLoading())
        console.log(error)
    }

   
}
export const handleUpdatePost = (id , post) => async (dispatch) => {
    try {
        dispatch(startLoading())
        const {data} = await api.updatePost(id , post)
        dispatch(updatePost(data))
        dispatch(stopLoading())
        
    } catch (error) {
        dispatch(stopLoading())
        console.log(error.response.data.message)
    }

}
export const handleDeletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)
        dispatch(deletePost(id))
        
    } catch (error) {
        console.log(error)
    }
}
export const handleLikePost = (id) => async (dispatch) => {
   
    try {
        const {data} = await api.likePost(id)
        dispatch(likePost( id , data))
        
    } catch (error) {
        console.log(error.messsage)
    }
}