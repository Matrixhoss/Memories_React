import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper ,CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import {handleCreatePost ,handleUpdatePost} from '../../actions/posts'
import useStyles from './styles'

 const Form = ({currentId, setCurrentId}) => {

    const classes = useStyles();

    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
    const dispatch = useDispatch()
    const post = useSelector((state) => currentId ? state.posts.find((post) => post._id === currentId) : null)
    const loading = useSelector((state) => state.loading)
    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(() => {
        if(post) setPostData(post)
    } ,[post])

    const clear = () => {
        setCurrentId(null)
        setPostData({title: '', message: '', tags: '', selectedFile: '' })
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault()

        if(post) {
            dispatch(handleUpdatePost(currentId , {...postData , name : user?.result?.name}))
        }
        else {
            dispatch(handleCreatePost({...postData , name : user?.result?.name}))
        }
        clear()
      };

      if (!user){
          return (
              <Paper className={classes.paper}>
                  <Typography variant='h6' align='center'>
                      Please Sign In to create your memories and like other's memories
                  </Typography>
              </Paper>
          )
      }
    return (
        <Paper className={classes.paper}>

            {loading && 
            <div className = {classes.laoding}>
                <CircularProgress  className={classes.loadingcircle} />
            </div>
            }
 
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? "Updating a Memory" : "Creating a Memory"}</Typography>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} disabled={loading} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} disabled={loading} inputProps={{ maxLength: 200 }} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} disabled={loading} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}><FileBase type="file" multiple={false} 
                onDone={({ base64 }) => {
                    console.log(base64) 
                    setPostData({ ...postData, selectedFile: base64 })
                    }} />
                </div>
                <Button disabled={loading} className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button disabled={loading} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}


export default Form 