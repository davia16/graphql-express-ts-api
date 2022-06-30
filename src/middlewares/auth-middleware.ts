const jwt = require('jsonwebtoken')

export const authMiddleware = (req: any, res: any, next: any) => {
  const authHeader = req.get('Authorization')

  if (!authHeader) {
    req.error = 'No authentication header found.'
    req.isAuth = false
    return next()
  }

  let decoded

  try {
    const token = authHeader.split(' ')[1]
    decoded = jwt.verify(token, process.env.JWT_KEY)
  } catch ({ message }) {
    req.isAuth = false
    req.error = message
    return next()
  }

  if (!decoded) {
    req.isAuth = false
    req.error = 'Unable to decode jwt'
    return next()
  }

  req.isAuth = true
  req.user = decoded
  req.error = null
  next()
}
