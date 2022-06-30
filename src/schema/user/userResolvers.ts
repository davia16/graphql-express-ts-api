import userRepo = require('../../db/repo/user-repo')
import * as bcrypt from 'bcrypt'
import { generateToken } from '../../utils/jwt-utils'

export const resolvers = {
  Query: {
    login(_parent: any, { input }: any, context: any) {
      const { email, password } = input
      const user = userRepo(context).getUserByEmail(email)

      if (!user) throw Error('User does not exist')

      const verifyToken = bcrypt.compareSync(password, user.password)
      if (!verifyToken) throw Error('Invalid email or password.')
      return generateToken(user.email, user.id, user.profileId)
    },
    users(_parent: any, args: any, context: any) {
      return userRepo(context).getUsers()
    },
    user(_parent: any, args: { id: string }, context: any) {
      return userRepo(context, 'user').getUser(args.id)
    },
  },
  Mutation: {
    createUser(root: any, { input }: any, context: any) {
      return userRepo(context).createUser(input)
    },
    updateUser(root: any, { input }: any, context: any) {
      return userRepo(context).updateUser(input)
    },
    deleteUser(root: any, { id }: any, context: any) {
      return userRepo(context).deleteUser(id)
    },
  },
}
