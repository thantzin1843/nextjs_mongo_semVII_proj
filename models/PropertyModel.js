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
    }
  },
  { timestamps: true }
);

const PropertyModel = mongoose.models?.Property || mongoose.model("Property",PropertySchema);
export default PropertyModel;

// {
//   property_name: formData.propertyName,
//   property_category: formData.propertyCategory,
//   location: {
//     address: formData.address,
//     city: formData.city,
//     country: formData.country,
//     apartment: formData.apartment,
//     zipcode: formData.zipcode,
//     mapLink: formData.mapLink
//   },
//   checkin: {
//     from: formData.checkinFrom,
//     until: formData.checkinUntil
//   },
//   checkout: {
//     from: formData.checkoutFrom,
//     until: formData.checkoutUntil
//   },
//   house_rules: {
//     age_restriction: formData.ageRestriction,
//     children_allowed: formData.children,
//     pet_allowed: formData.petAllowed,
//     smoking_allowed: formData.smoking,
//     party_allowed: formData.party
//   },
//   star_rating: formData.starRating,
//   food_and_dining: {
//     serve_breakfast: formData.serveBreakfast,
//     free_breakfast: formData.freeBreakfast,
//     selected_foods: formData.propertyName
//   },
//   facilities: formData.facilities,
//   fun_things_todo: formData.selectedFunThings,
//   property_accessibility: formData.accessibility,
//   bathroom_info: {
//     private: formData.privateBathroom,
//     items:formData.selectedBathroomItems
//   },
//   payments: formData.payments,
//   from_city: {
//     distance: formData.distance,
//     unit: formData.unit
//   }
// },
// {"propertyCategory":"hotel","address":"Ryder Leblanc","apartment":"Barclay Riddle",
// "country":"Kylie Benjamin","city":"Justine Oneil","zipcode":"Hector Byrd",
// "mapLink":"Elmo Carrillo","propertyName":"Gary Holt","starRating":4,
// "facilities":["Restaurant","Room service","Non-smoking rooms"],
// "selectedFoods":["American","Vegan","French"],"serveBreakfast":true,"freeBreakfast":true,
// "checkinFrom":"05:43","checkoutFrom":"05:46","checkinUntil":"05:43","checkoutUntil":"05:48",
// "petAllowed":true,"children":true,"smoking":true,"ageRestriction":"7","party":true,
// "selectedFunThings":["Swimming pool access","Spa and wellness treatments","Gym and fitness center"],
// "privateBathroom":true,"selectedBathroomItems":["Conditioner","Shampoo"],"accessibility":["Wheelchair-accessible rooms","Elevator access to all floors"],
// "payments":["Debit","KBZpay"],"distance":"8","unit":"mile"}