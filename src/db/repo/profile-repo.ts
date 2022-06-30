import { PROFILES } from '../data/index'
import { Profile } from '../data/Profile'

let profiles: [Profile] = PROFILES

export = (context: any) => {
  const hasAdminProfile = context.user && context.user.profileId === 1

  return {
    profiles: () => {
      console.log('1 call to db for Profile')
      return profiles
    },

    profile: (id: number) => {
      console.log('1 call to db for user by id')
      const profile = profiles.find((u) => u.id === id)

      if (profile) {
        return profile
      }
      return new Error('Profile not found.')
    },

    createProfile: (profile: Profile) => {
      if (!hasAdminProfile)
        return new Error(`Access denied to createProfile field.`)
      const newProfile = new Profile(profile.id, profile.name)
      const profileIndex = profiles.findIndex(
        (profile: Profile) => profile.name === newProfile.name,
      )
      if (profileIndex >= 0) {
        return new Error(`Profile ${profile.name} already exists`)
      }
      profiles.push(newProfile)
      return newProfile
    },

    updateProfile: (profile: any) => {
      if (!hasAdminProfile)
        return new Error(`Access denied to updateProfile field.`)

      console.log('1 call to db for profile update')
      const profileIndex = profiles.findIndex(
        (u: Profile) => u.id === profile.id,
      )
      if (profileIndex < 0) {
        return new Error('Profile not found.')
      }
      profiles[profileIndex] = { ...profiles[profileIndex], ...profile }
      return profiles[profileIndex]
    },

    deleteProfile: (id: number) => {
      if (!hasAdminProfile)
        return new Error(`Access denied to deleteProfile field.`)

      console.log('1 call to db for profile deletion')
      const profileIndex = profiles.findIndex((u) => u.id === id)
      if (profileIndex < 0) {
        return new Error('Profile not found.')
      }
      const removedProfile = profiles[profileIndex]
      profiles.splice(profileIndex, 1)
      return removedProfile
    },
  }
}
