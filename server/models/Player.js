import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  uid: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  whatsapp: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  paymentRef: {
    type: String,
    required: true,
    trim: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export const Player = mongoose.model('Player', PlayerSchema);
