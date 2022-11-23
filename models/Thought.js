const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        unique: true,
     
      },
      createdAt: {
          type: Date,
          default: Date.now,
      },
    //   username: [thoughtsSchema],
    reactions: [reactionSchema]
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );
  
  const Thought = model('thoughts', thoughtSchema);
  
  module.exports = Thought;