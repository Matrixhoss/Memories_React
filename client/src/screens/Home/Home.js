import React  ,{useState ,useEffect}from 'react'
import {Container , Grow ,Grid} from '@material-ui/core'
import {useDispatch } from 'react-redux'
import {handleGetData} from '../../actions/posts'
import useStyles from './styles'

import Posts from '../../components/Posts/Posts'
import Form from '../../components/Form/Form'
const Home = () => {
    const classes = useStyles();
    
    const [currentId , setCurrentId ] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(handleGetData())
    } ,[currentId ,dispatch])

    return (
        <Grow in>
                <Container>
                    <Grid className={classes.mainContainer} container justify='space-between' alignItems='stretch' spacing={3}>
                        <Grid item xs={12} md={7}>
                            <Posts setCurrentId = {setCurrentId} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Form setCurrentId = {setCurrentId} currentId = {currentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
    )
}

export default Home
