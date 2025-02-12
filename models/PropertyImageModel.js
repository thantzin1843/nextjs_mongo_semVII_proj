import mongoose from "mongoose";

const PropertyImageSchema =new mongoose.Schema({
    property_id:{ type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
    images:[{
        fileId:String,
        name:String
    }]
})

const PropertyImageModel = mongoose.models?.PropertyImage || mongoose.model('PropertyImage',PropertyImageSchema);
export default PropertyImageModel;