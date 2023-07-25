import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query Users {
    users {
      id
      username
      email
      events {
        _id
        title
        cost
        description
        location
      }
    }
  }
`;

export const GET_ONE_USER = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      id
      username
      email
      events {
        _id
        title
        description
        cost
        location
        date
      }
    }
  }
`;

export const GET_ALL_EVENTS = gql`
  query Events {
    events {
      _id
      title
      description
      cost
      location
      date
    }
  }
`;

export const GET_ONE_EVENT = gql`
  query Query($eventId: ID!) {
    event(id: $eventId) {
      _id
      title
      description
      cost
      location
      user {
        id
        username
      }
      date
    }
  }
`;

export const GET_MY_EVENTS =gql`
query Events {
me {
    _id
    username
    email
    createdEvents {
      _id
      title

    }
    events {
        _id
        title
        
      }
  }}
`
