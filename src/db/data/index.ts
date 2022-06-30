import { User } from './User'
import { Profile } from './Profile'

let profile: Profile = new Profile(1, 'Admin')
const PROFILES: [Profile] = [profile]
profile = new Profile(2, 'Member')
PROFILES.push(profile)

let user: User = new User(
  'Camey',
  'cmounce0@sfgate.com',
  '807-82-4757',
  1,
  'Mounce',
)
const USERS: [User] = [user]
user = new User('Cara', 'ckemmey1@harvard.edu', '498-97-9862', 2, 'Kemmey')
USERS.push(user)
user = new User('Ronna', 'rhowship2@ox.ac.uk', '490-08-8567', 2, 'Howship')
USERS.push(user)
user = new User('Nelle', 'nmegson4@sitemeter.com', '513-81-3920', 2, 'Megson')
USERS.push(user)
user = new User(
  'Clive',
  'ccyson7@acquirethisname.com',
  '644-37-3068',
  null,
  'Cyson',
)
USERS.push(user)

export { USERS, PROFILES }
