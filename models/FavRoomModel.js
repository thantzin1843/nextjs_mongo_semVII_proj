import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who saved the property
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true }, // Property being saved
  fav: { type: Boolean, default: true }, // Is the property saved?
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

const Favorite = mongoose.models.Favorite || mongoose.model('Favorite', favoriteSchema);

export default Favorite;