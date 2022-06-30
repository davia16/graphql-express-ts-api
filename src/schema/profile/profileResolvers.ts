import profilesRepo = require('../../db/repo/profile-repo')

export const resolvers = {
  Query: {
    profiles(_parent: any, args: any, context: any) {
      return profilesRepo(context).profiles()
    },

    profile: (_: any, { id }: any, context: any) => {
      return profilesRepo(context).profile(id)
    },
  },
  Mutation: {
    createProfile: (root: any, { input }: any, context: any) => {
      return profilesRepo(context).createProfile(input)
    },
    updateProfile: (root: any, { input }: any, context: any) => {
      return profilesRepo(context).updateProfile(input)
    },
    deleteProfile(root: any, { id }: any, context: any) {
      return profilesRepo(context).deleteProfile(id)
    },
  },
}
