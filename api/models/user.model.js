import mongoose from "mongoose";

const userSchema = new  mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    avatar : {
        type : String,
        default : "https://ik.imagekit.io/prakhar3091/ProfileImages/1753449856775_user_9684549_CEq_sGkzj.png"
    },
} , {timestamps: true});

const User = mongoose.model('User' , userSchema);

export default User;  // this will be used in our routes to interact with the database.  // this file should be imported into the server.js file.  // This file should be created in the models folder.  // this file should be created in the models folder.  // this file should be created in the models folder.  // this file should be created in the models folder.  // this file should be created in the models folder.  // this file should

