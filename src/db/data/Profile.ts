export class Profile {
  private _id: number
  constructor(id: number, public name: string) {
    this._id = id
  }
  get id() {
    return this._id
  }
}
