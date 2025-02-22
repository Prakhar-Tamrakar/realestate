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
        default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw2DLkFB2xh1R1VQBa4xh0cM&ust=1740337486827000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJCN0b_814sDFQAAAAAdAAAAABAE"
    },
} , {timestamps: true});

const User = mongoose.model('User' , userSchema);

export default User;  // this will be used in our routes to interact with the database.  // this file should be imported into the server.js file.  // This file should be created in the models folder.  // this file should be created in the models folder.  // this file should be created in the models folder.  // this file should be created in the models folder.  // this file should be created in the models folder.  // this file should

