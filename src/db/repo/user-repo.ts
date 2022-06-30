import { USERS } from '../data/index'
import { User } from '../data/User'

let users: [User] = USERS

export = (context: any) => {
  const hasAdminProfile = context.user && context.user.profileId === 1
  return {
    getUserByEmail: (email: string) => {
      console.log('1 call to db for user by email')
      return users.find((u) => u.email === email)
    },

    getUser: (userId: string) => {
      console.log('1 call to db for user by id')
      return users.find((u) => u.id === userId)
    },

    getUsers: () => {
      console.log('1 call to db for users')
      return users
    },

    createUser: (user: User) => {
      if (!hasAdminProfile)
        return new Error(`Access denied to "createUser" field.`)

      console.log('1 call to db for user insert')
      const newUser = new User(
        user.firstName,
        user.email,
        user.password,
        user.profileId || null,
        user.lastName || null,
      )
      const userIdex = users.findIndex(
        (user: User) => user.email === newUser.email,
      )
      if (userIdex >= 0) {
        return new Error(`Email ${newUser.email} already exists`)
      }
      users.push(newUser)
      return newUser
    },

    updateUser: (user: any) => {
      if (!hasAdminProfile)
        return new Error(`Access denied to "updateUser" field.`)

      console.log('1 call to db for user update')
      const userIndex = users.findIndex((u: User) => u.id === user.id)
      if (userIndex < 0) {
        return new Error('User not found.')
      }
      users[userIndex] = { ...users[userIndex], ...user }
      return users[userIndex]
    },

    deleteUser: (id: string) => {
      if (!hasAdminProfile)
        return new Error(`Access denied to "deleteUser" field.`)

      console.log('1 call to db for user deletion')
      const userIndex = users.findIndex((u) => u.id === id)
      if (userIndex < 0) {
        return new Error('User not found.')
      }
      const removedUser = users[userIndex]
      users.splice(userIndex, 1)
      return removedUser
    },
  }
}
