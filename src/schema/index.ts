const { gql } = require('apollo-server');

export const typeDefs = gql`
    type User {
      id: String
      username: String
      email: String
      password: String
      scope: String
    }

    type Event {
      id: Int
      title: String
      description: String
      price: Int
      capacity: Int
    }
  
    type Query {
      users: [User]
      events: [Event]
    }

    type Mutation {
    login(username: String!, password: String!): String
  }
  `;