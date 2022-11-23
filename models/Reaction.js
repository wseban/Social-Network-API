const { Schema, Types } = require('mongoose');
const reactionSchema = require('./Thought');

const reactionSchema = new Schema(
    {
      reactionId: {
        type: ObjectId,
        default: new ObjectId(),
     
      },
      reactionBody: {
        type: String,
        required: true,
        max_length: 280,
      },
     username: {
        type: String,
        required: true,
     },
     createdAt: {
        type: Date,
        default: Date.now,
     },
      friends: [userSchema]
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );
  
  const Reaction = model('reaction', reactionSchema);
  
  module.exports = Reaction;