 import mongoose, { Schema } from "mongoose"

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
    },
},{timestamps:true})

const UserModel = mongoose.models?.User || mongoose.model("User",UserSchema);
export default UserModel;