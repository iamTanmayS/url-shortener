const mongoose = require('mongoose');

const  SignUpSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        // minlength:8,
        // maxlength:20,
        // match:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    },


},{timestamps:true});

const signUpSchemamodel = mongoose.model('signUpSchema',SignUpSchema);

module.exports = signUpSchemamodel;