import axios from 'axios'

//const url = "https://your-memories-app.herokuapp.com/post"
//const url = "http://localhost:5000/post"

const API = axios.create({baseURL : 'http://localhost:5000'})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
})

export const fetchPosts = () => API.get('/post')
export const createPost = (newPost) => API.post("/post" , newPost)
export const updatePost = (id ,updatedPost) => API.patch(`/post/${id}` , updatedPost)
export const deletePost = (id) => API.delete(`/post/${id}`)
export const likePost = (id) => API.patch(`/post/${id}/like`)

export const signIn = (data) => API.post('/user/signin' , data)
export const signUp = (data) => API.post('/user/signup' , data)