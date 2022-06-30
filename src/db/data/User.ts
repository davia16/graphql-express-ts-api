const { v4: uuidV4 } = require('uuid')
import * as bcrypt from 'bcrypt'

const salt = bcrypt.genSaltSync(10)

export class User {
  private _id: string = uuidV4()
  password: string
  constructor(
    public firstName: string,
    public email: string,
    password: string,
    public profileId: number | null,
    public lastName?: string | null,
  ) {
    this.password = bcrypt.hashSync(password, salt)
  }
  get id() {
    return this._id
  }
}
