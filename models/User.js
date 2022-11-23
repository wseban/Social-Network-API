const { Schema, model } = require('mongoose');
const thoughtsSchema = require('./Thoughts');

const userSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
     
      },
      email: {
        type: String,
        required: true,
        max_length: 50,
      },
     
      thoughts: [thoughtsSchema],
      friends: [userSchema]
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );
  
  const User = model('user', userSchema);
  
  module.exports = User;