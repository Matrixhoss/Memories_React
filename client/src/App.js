import React  from 'react'
import {Container } from '@material-ui/core'
import { BrowserRouter as Router , Route , Switch} from 'react-router-dom'
import Appbar from './components/Appbar/Appbar'
import  Home from './screens/Home/Home';
import  Auth from './screens/Auth/Auth';

export default function App() {
    return (
        <Router>
            <Container maxWidth="lg"> 
                <Appbar/>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/auth'  component={Auth} />
                </Switch>
            </Container>
        </Router>
    )
}
