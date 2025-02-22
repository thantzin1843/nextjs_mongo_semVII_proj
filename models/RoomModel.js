import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    property_id: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
    type:String,
    name:String,
    no_of_rooms:Number,
    width:Number,
    twin:Number,
    full:Number,
    queen:Number,
    king:Number,
    no_of_guests:Number,
    smoking:Boolean,
    outdoor_and_view:[String],
    food:[String],
    private_bathroom:Boolean,
    bathroom_items:[String],
    amenities:[String],
    description: String,
    price: Number,
    // images: [String]
},{ timestamps: true })

const RoomModel = mongoose.models?.Room || mongoose.model("Room",RoomSchema);
export default RoomModel;