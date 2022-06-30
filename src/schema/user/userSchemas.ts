import { gql } from 'apollo-server-express'

export const typeDef = gql`
  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String!
    profileId: Int
  }

  type Query {
    login(input: UserLogin!): String
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(input: UserMutation): User
    updateUser(input: UserMutation): User
    deleteUser(id: ID!): User
  }

  input UserLogin {
    email: String!
    password: String!
  }

  input UserMutation {
    id: ID
    firstName: String!
    password: String
    profileId: Int
    lastName: String
    email: String!
  }
`
