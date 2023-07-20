const { Schema, model } = require('mongoose');



//const bookSchema = require('./Book');

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    
    description: {
        type: String,
        
        
      },

      cost: {
        type: Number,
        min: 0,
      },

      location: {
        type: String,
        
        
      },
      date: {
        type: Date,
        
      },

      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },

      attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],

      comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }],
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
eventSchema.virtual('attendeesCount').get(function () {
  return this.attendees.length;
});

const Event = model('Event', eventSchema);

module.exports = Event;