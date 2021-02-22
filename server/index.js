import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors';

import postRoutes from './routes/posts.js'
import userRoutes from './routes/user.js'

const app = express();
dotenv.config()

app.use(bodyParser.json({limit : "30mb" , extended : true}));
app.use(bodyParser.urlencoded({limit : "30mb" , extended : true}));
app.use(cors())

app.use('/post' , postRoutes)
app.use('/user' , userRoutes)

app.get('/' ,(req , res) => {
        res.send("Hello to yourMemores API")
})



const PORT = process.env.PORT || 5000 ;

mongoose.connect(process.env.CONNECTION_URL , {useNewUrlParser : true , useUnifiedTopology :true})
        .then(() => app.listen(PORT , () => console.log(`Server is runnig on port : ${PORT}`)))
        .catch((error) => console.log(error));

mongoose.set('useFindAndModify' ,false)

    