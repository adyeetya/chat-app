import User from '../models/user.model.js'
export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id
    //this is all users except logged in user
    // $ne stands for "not equal" and it is used in mongoDB to find documents where the value of a field is not equal to the specified value
    // Here, it is used to find all users except the logged in user
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select('-password')
    // select all fields of user except password
    res.status(200).json(filteredUsers)
  } catch (error) {
    console.log('Error in the getUserForSidebar controller: ', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}
