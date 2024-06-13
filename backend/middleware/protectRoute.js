import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const protectRoute = async(req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized - No Token' })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) {
            return res.status(401).json({ error: 'Unauthorized - Invalid Token' })
        }
       
        const user = await User.findById(decoded.userId)
        if(!user) {
            return res.status(401).json({ error: 'Unauthorized - Invalid User' })
        }
        req.user = user

        next()
    } catch (error) {
        console.log('Error in the protect route middleware: ', error.message)
        res.status(500).json({ error: 'Internal server error' })
    }
}
 