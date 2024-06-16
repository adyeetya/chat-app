import Conversation from '../models/conversation.model.js'
import Message from '../models/message.model.js'

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params
    const { message } = req.body
    const senderId = req.user._id

    // Find a conversation that has both the sender and receiver as participants
    // The $all operator ensures that both participants are present in the participants array
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    })
    // console.log(conversation)
    // Using the .create method creates a new document in the database
    // while new Message instance creates a new JavaScript object
    if (!conversation) {
      // Create a new conversation
      //   On the other hand, the .create method creates a new document in the database directly using the Conversation model. It automatically sets the timestamps (created at and updated at) fields and saves the document to the database.
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      })
    }
    // Create a new message
    // The new Message creates a new instance of the Message class with the specified properties (senderId, receiverId, message). This object can be used to manipulate the data before saving it to the database. Id has _id created by mongoose
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    })

    if (newMessage) {
      conversation.messages.push(newMessage._id)
    }

    // socket io functionality will go here

    // await conversation.save()
    // await newMessage.save()

    await Promise.all([conversation.save(), newMessage.save()]) //this will run in parallel

    res.status(201).json(newMessage)
  } catch (error) {
    console.log('Error in the send message controller: ', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params
    const senderId = req.user._id

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate('messages') // NOT REFERENCE BUT ACTUAL MESSAGES

    if (!conversation) return res.status(200).json([])

    const messages = conversation.messages

    res.status(200).json(messages)
  } catch (error) {
    console.log('Error in getMessages controller: ', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}
