import { merge } from 'lodash'

import { typeDef as UserSchema } from './user/userSchemas'
import { typeDef as ProfileSchema } from './profile/profileSchemas'
import { resolvers as userResolvers } from './user/userResolvers'
import { resolvers as profileResolvers } from './profile/profileResolvers'

export const typeDefs = [UserSchema, ProfileSchema]
export const resolvers = merge(userResolvers, profileResolvers)
