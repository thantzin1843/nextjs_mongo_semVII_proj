import mongoose from "mongoose";

const HotelReviewSchema =new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    property_id: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    message:String,
})

const HotelReviewModel = mongoose.models?.HotelReview || mongoose.model('HotelReview',HotelReviewSchema);
export default HotelReviewModel;