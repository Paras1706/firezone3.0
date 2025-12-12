import mongoose from 'mongoose';

const MatchDetailsSchema = new mongoose.Schema({
  map: {
    type: String,
    default: 'Nuketown Island'
  },
  mode: {
    type: String,
    default: 'Team Deathmatch'
  },
  time: {
    type: String,
    default: '7:00 PM'
  },
  date: {
    type: String,
    default: ''
  },
  roomId: {
    type: String,
    default: ''
  },
  roomPassword: {
    type: String,
    default: ''
  },
  prizePool: {
    type: String,
    default: '₹5000'
  },
  entryFee: {
    type: String,
    default: '₹50'
  },
  isRoomVisible: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export const MatchDetails = mongoose.model('MatchDetails', MatchDetailsSchema);
