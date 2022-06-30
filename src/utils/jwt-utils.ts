import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken'
import * as fs from 'fs'
import * as path from 'path'
import dotenv from 'dotenv'
dotenv.config()

export function generateToken(
  email: string,
  id: string,
  profileId: number | null,
) {
  const payload = { email, id, profileId }
  const privateKey: { key: any; passphrase: any } = {
    key: fs.readFileSync(path.join(__dirname, '../../private.key'), 'utf8'),
    passphrase: process.env.JWT_KEY,
  }
  const signInOptions: SignOptions = { algorithm: 'RS256', expiresIn: '1h' }

  return sign(payload, privateKey, signInOptions)
}

/**
 * checks if JWT token is valid
 * @param token the expected token payload
 */
export function validateToken(token: string): any {
  const publicKey = fs.readFileSync(path.join(__dirname, '../../public.key'))

  const verifyOptions: VerifyOptions = { algorithms: ['RS256'] }
  try {
    return verify(token, publicKey, verifyOptions)
  } catch (err) {
    return { error: true, msg: 'Session expired' }
  }
}
