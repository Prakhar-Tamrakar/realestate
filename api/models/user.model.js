import mongoose from "mongoose";

const userSchema =new  mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    Email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : password,
        required : true,
    }
} , {timestamps: true});

const User = mongoose.model('User' , userSchema);

export default User;  // this will be used in our routes to interact with the database.  // this file should be imported into the server.js file.  // This file should be created in the models folder.  // this file should be created in the models folder.  // this file should be created in the models folder.  // this file should be created in the models folder.  // this file should be created in the models folder.  // this file should

