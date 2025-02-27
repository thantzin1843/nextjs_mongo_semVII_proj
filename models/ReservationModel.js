const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'], // Basic email validation
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{10}$/, 'Please enter a valid 9-digit phone number'], // Example: 10-digit phone number validation
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  numberOfGuests: {
    type: Number,
    required: true,
    min: 1, // At least 1 guest
  },
  status:String,
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room', // References the Room model
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References the User model
    required: true,
  },
  no_of_rooms_reserved:Number,
  totalPrice: {
    type: Number,
    required: true,
    min: 0, // Price cannot be negative
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the creation date
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically updates on changes
  },
});

// Update the `updatedAt` field before saving
reservationSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Reservation = mongoose.models?.reservations || mongoose.model("reservations",reservationSchema);
export default Reservation;