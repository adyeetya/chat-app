// controllers are just functions used for different routes

import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import generateTokenAndSetCookie from '../utils/generateToken.js'

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" })
    }
    const user = await User.findOne({ username })
    if (user) {
      return res.status(400).json({ error: 'Username already exists' })
    }

    //   HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // default profile pic from https://avatar-placeholder.iran.liara.run/

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === 'Male' ? boyProfilePic : girlProfilePic,
    })

    if (newUser) {
      // generate jwt token
      generateTokenAndSetCookie(newUser._id, res)
      await newUser.save()

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        gender: newUser.gender,
        profilePic: newUser.profilePic,
      })
    } else {
      res.status(400).json({ error: 'Invalid user data' })
    }
  } catch (error) {
    console.log('Error in the signup controller: ', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body
    // console.log(username, password)
    const user = await User.findOne({ username })
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ''
    )
    // console.log(user.username, isPasswordCorrect)

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    generateTokenAndSetCookie(user._id, res)

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      gender: user.gender,
      profilePic: user.profilePic,
    })
  } catch (error) {
    console.log('Error in the login controller: ', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const logout = (req, res) => {
 try {
    res.cookie("jwt", "", {maxAge:0})
    res.status(200).json({message: "Successfully logged out"})
 } catch (error) {
    console.log('Error in the logout controller: ', error.message)
    res.status(500).json({ error: 'Internal server error' })
 }
}
