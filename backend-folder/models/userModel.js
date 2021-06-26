const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name:
        {
            type:String,
            required:true
        },
    email:
        {
            type:String,
            required:true,
            unique:true
        },
    password:
        {
            type:String,
            required:true
        }
},{
    timestamps:true
});

// Compare the password entered and the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.pre('save',async function (next) {
    if(!this.isModified('password')){
        next();
    }

    // generate salt and hash the password before saving a user to the database
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

const User = mongoose.model('User',userSchema);

module.exports = User;