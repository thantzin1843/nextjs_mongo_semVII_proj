

import mongoose from "mongoose"
export const connectToDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to Mongo");
    }catch(e){
        console.log(e)
    }
}