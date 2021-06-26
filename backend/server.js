const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('API is Running');
});

// The port in which the app will run
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    // NODE_ENV can be development or in production mode
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold);
});