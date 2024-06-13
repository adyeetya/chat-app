import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  })

  res.cookie('jwt', token, {
    httpOnly: true, //prevents access from frontend or XSS attacks, cross-site scripting attacks
    secure: process.env.NODE_ENV !== 'Development',
    sameSite: 'strict', //CSRF protection (protect against cross-site request forgery)
    maxAge: 15 * 24 * 60 * 60 * 1000, //ms
  })
}

export default generateTokenAndSetCookie
