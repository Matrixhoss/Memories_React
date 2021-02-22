import  React from 'react'
import {Card , CardActions ,CardContent , CardMedia ,Button ,Typography ,Grow} from '@material-ui/core';
import {useDispatch} from 'react-redux'
import {
    ThumbUpAlt as ThumbUpAltIcom,
    ThumbUpAltOutlined ,
    Delete as DeleteIcon ,
    MoreHoriz as MoreHorizIcon
} from '@material-ui/icons'
import moment from 'moment'
import memories from '../../../images/memories.png'
import {handleDeletePost ,handleLikePost} from '../../../actions/posts'
import useStyles from './styles'


 const Post = ({post ,setCurrentId}) => {
    const classes = useStyles();
    const dispatch = useDispatch()

    const user = JSON.parse(localStorage.getItem('profile'))
    return (
        <Grow in>
            <Card className={classes.card}>
                <CardMedia className={classes.media} image={post.selectedFile ? post.selectedFile : memories} title={post.title}/>
                <div className={classes.overlay}>
                    <Typography variant='h6'>{post.name}</Typography>
                    <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
                </div>
                <div className ={classes.overlay2}>
                    { (user?.result?._id === post.creator ||  user?.result?.googleId === post.creator)  && 
                    <Button style={{color : 'white'}} size='small' onClick={() =>{setCurrentId(post._id)}} >
                        <MoreHorizIcon fontSize='default' />
                    </Button>}
                </div>
                <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                    <Typography className={classes.title} variant='h6' gutterBottom >{post.title}</Typography>
                <CardContent>
                    <Typography  variant='body2' color='textSecondary' gutterBottom >{post.message}</Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button size='small' color='primary'  disabled={!user} onClick={()=>{dispatch(handleLikePost(post._id))}}>
                        {
                           post.likes.find((l) => ((user?.result?._id === l || user?.result?.googleId === l))) ? <ThumbUpAltIcom/> : <ThumbUpAltOutlined/>
                        }
                        &nbsp; Like &nbsp;
                        {post.likes.length}
                    </Button>
                   { (user?.result?._id === post.creator ||  user?.result?.googleId === post.creator)   && 
                   <Button size='small' color='primary' onClick={()=>{dispatch(handleDeletePost(post._id))}}>
                        <DeleteIcon/>
                        Delete
                    </Button>}
                </CardActions>
            </Card>
        </Grow>
    )
}


export default Post 