import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    property_name: String,
    property_category: String,
    location: {
      address: String,
      city: String,
      country: String,
      apartment: String,
      zipcode: String,
      mapLink: String
    },
    checkin: {
      from: String,
      until: String
    },
    checkout: {
      from: String,
      until: String
    },
    house_rules: {
      age_restriction: Number,
      children_allowed: Boolean,
      pet_allowed: Boolean,
      smoking_allowed: Boolean,
      party_allowed: Boolean
    },
    star_rating: Number,
    food_and_dining: {
      serve_breakfast: Boolean,
      free_breakfast: Boolean,
      selected_foods: [String]
    },
    facilities: [String],
    fun_things_todo: [String],
    property_accessibility: [String],
    bathroom_info: {
      private: Boolean,
      items: [String]
    },
    payments: [String],
    from_city: {
      distance: Number,
      unit: String
    },
    
  },
  { timestamps: true }
);

const PropertyModel = mongoose.models?.Property|| mongoose.model("Property",PropertySchema);
export default PropertyModel;

