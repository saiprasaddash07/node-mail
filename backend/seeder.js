const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const users = require('./data/user');
const User = require('./models/userModel');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try{
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    }catch (e) {
        console.error(`${e}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try{
        await User.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    }catch (e) {
        console.error(`${e}`.red.inverse);
        process.exit(1);
    }
};

if(process.argv[2] === '-d'){
    destroyData();
}else{
    importData();
}