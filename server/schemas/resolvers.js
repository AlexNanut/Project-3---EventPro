const { User, Event } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
const { events } = require("../models/User");

const resolvers = {
  //queries (GET route equivalent)
  Query: {
    users: async () => {
      return await User.find().populate("events comments createdEvents");
    },
    user: async (parent, { id }) => {
      return await User.findById(id).populate("events comments createdEvents");
    },
    events: async () => {
      return await Event.find().populate("user comments");
    },
    event: async (parent, { id }) => {
      return await Event.findById(id).populate("user comments");
    },
    me:async(parent,{id},context)=>{
      return await User.findById(context.user._id).populate("events comments createdEvents");
    }
  },

  //mutations (POST, PUT, DELETE route equivalent)
  Mutation: {
    //create a new user
    createUser: async (parent, args) => {
      const user = await User.create(args);

      if (!user) {
        throw new Error("Something is wrong!");
      }

      const token = signToken(user);
      return { token, user };
    },

    //validate email and password on login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },

    createEvent: async (parent, args, context) => {
      if (!context.user) {
      throw new AuthenticationError("User not logged in!");
      }
      let user_id = context.user._id
      console.log(args);
      const event = new Event({...args,user:user_id});
      await event.save();

      const userId = event.user;
      const eventId = event._id;

      await User.updateOne({ _id: userId }, { $push: { createdEvents: eventId, events:eventId} });
      console.log(User)
      return event;
    },
    updateEvent: async (parent, { id, ...rest }) => {
      return await Event.findByIdAndUpdate(id, rest, { new: true }).populate(
        "user"
      );
    },
    deleteEvent: async (parent, { id }) => {
      await Event.findByIdAndRemove(id);
      return true;
    },
  },
};

module.exports = resolvers;