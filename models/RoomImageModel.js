import mongoose from "mongoose";

const RoomImageSchema =new mongoose.Schema({
    roomId:{ type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    images:[{
        fileId:String,
        name:String
    }]
})

const RoomImageModel = mongoose.models?.RoomImage || mongoose.model('RoomImage',RoomImageSchema);
export default RoomImageModel;