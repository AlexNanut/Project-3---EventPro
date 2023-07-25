const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    createdEvents: [Event] 
    events: [Event]
    comments: [Comment]
  }

  type Event {
    _id: ID!
    title: String!
    description: String!
    cost: Float!
    location: String!
    user: User
    date: String
    attendees: [User]
    comments: [Comment]
  }
type Comment {
  _id: ID
    commentText: String
    date: String
    user: User
    event: Event
}

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(id: ID!): User
    events: [Event]!
    event(id: ID!): Event
    me: User 
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    createEvent(
      title: String!
      description: String!
      cost: Float!
      location: String!
      date: String!
    ): Event
    updateEvent(
      id: ID!
      title: String
      description: String
      cost: Float
      location: String
      date: String
    ): Event
    deleteEvent(id: ID!): Boolean
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = typeDefs;