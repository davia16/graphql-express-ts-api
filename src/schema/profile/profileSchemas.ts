import { gql } from 'apollo-server-express'
export const typeDef = gql`
  type Profile {
    id: Int
    name: String
  }

  type Query {
    profiles: [Profile]
    profile(id: Int): Profile
  }

  type Mutation {
    createProfile(input: ProfileMutation): Profile
    updateProfile(input: ProfileMutation): Profile
    deleteProfile(id: Int): Profile
  }

  input ProfileMutation {
    id: Int
    name: String!
  }
`
