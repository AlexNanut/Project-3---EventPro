const { Schema, model } = require('mongoose');



//const bookSchema = require('./Book');

const commentSchema = new Schema(
  {
    commentText: {
      type: String,
      required: true,
      unique: true,
    },
    
    
      date: {
        type: Date,
        default: Date.now
      },

      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },

      event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
      },

    // set savedBooks to be an array of data that adheres to the bookSchema
    //savedBooks: [bookSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password


// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have


const Comment = model('Comment', commentSchema);

module.exports = Comment;