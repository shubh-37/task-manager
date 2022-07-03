
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const port = process.env.PORT || 3000;
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
//middleware
app.use(express.static('./public'))
app.use(express.json())
app.use(notFound);
app.use(errorHandlerMiddleware);

//routes
app.use('/api/v1/tasks',tasks)

const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port,()=>{
            console.log(`Server running on port ${port}...`)
        });        
    } catch(err){
        console.log(err);
    }
}

start();
